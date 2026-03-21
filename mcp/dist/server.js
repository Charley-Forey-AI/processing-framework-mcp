import cors from "cors";
import express from "express";
import { randomUUID } from "node:crypto";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { loadConfig } from "./config.js";
import { TokenStore } from "./auth/tokenStore.js";
import { TidAuthService } from "./auth/tidAuth.js";
import { PfClient } from "./client/pfClient.js";
import { createPfMcpServer } from "./serverFactory.js";
import { sanitizeForLogs } from "./utils/sanitize.js";
export async function startPfMcpServer() {
    const config = loadConfig();
    const tokenStore = new TokenStore(config.tidTokenFile);
    const auth = new TidAuthService(config, tokenStore);
    await auth.initialize();
    const client = new PfClient(config, auth);
    const app = express();
    const transports = {};
    const sessionLastSeen = {};
    app.use(express.json());
    const corsOrigins = config.mcpCorsOrigins;
    app.use(cors({
        origin: corsOrigins.includes("*") ? true : corsOrigins,
        exposedHeaders: ["Mcp-Session-Id"],
    }));
    app.use((req, res, next) => {
        if (!config.mcpApiKey) {
            next();
            return;
        }
        const apiKey = req.header("x-mcp-api-key");
        if (!apiKey || apiKey !== config.mcpApiKey) {
            res.status(401).json({
                error: "Unauthorized: missing or invalid x-mcp-api-key header",
            });
            return;
        }
        next();
    });
    app.get("/health", (_req, res) => {
        res.status(200).json({ ok: true });
    });
    app.get("/ready", (_req, res) => {
        res.status(200).json({ ready: true });
    });
    const handlePost = async (req, res) => {
        const sessionId = req.headers["mcp-session-id"];
        let transport;
        if (sessionId && transports[sessionId]) {
            transport = transports[sessionId];
            sessionLastSeen[sessionId] = Date.now();
        }
        else if (!sessionId && isInitializeRequest(req.body)) {
            transport = new StreamableHTTPServerTransport({
                sessionIdGenerator: () => randomUUID(),
                onsessioninitialized: (newSessionId) => {
                    transports[newSessionId] = transport;
                    sessionLastSeen[newSessionId] = Date.now();
                },
            });
            transport.onclose = () => {
                if (transport.sessionId) {
                    delete transports[transport.sessionId];
                    delete sessionLastSeen[transport.sessionId];
                }
            };
            const server = createPfMcpServer(config, auth, client);
            await server.connect(transport);
        }
        else {
            res.status(400).json({
                jsonrpc: "2.0",
                error: {
                    code: -32000,
                    message: "Bad Request: No valid session ID provided",
                },
                id: null,
            });
            return;
        }
        await transport.handleRequest(req, res, req.body);
    };
    const handleSessionRequest = async (req, res) => {
        const sessionId = req.headers["mcp-session-id"];
        if (!sessionId || !transports[sessionId]) {
            res.status(400).send("Invalid or missing session ID");
            return;
        }
        sessionLastSeen[sessionId] = Date.now();
        await transports[sessionId].handleRequest(req, res);
    };
    app.post(config.mcpPath, handlePost);
    app.get(config.mcpPath, handleSessionRequest);
    app.delete(config.mcpPath, handleSessionRequest);
    setInterval(() => {
        const cutoff = Date.now() - config.mcpSessionTtlMs;
        for (const [sessionId, lastSeen] of Object.entries(sessionLastSeen)) {
            if (lastSeen < cutoff) {
                delete sessionLastSeen[sessionId];
                delete transports[sessionId];
            }
        }
    }, 30_000).unref();
    const endpoint = `http://${config.mcpHost}:${config.mcpPort}${config.mcpPath}`;
    const listener = app.listen(config.mcpPort, config.mcpHost, () => {
        console.error(`PF MCP Streamable HTTP server listening on ${endpoint}`);
    });
    return {
        close: async () => await new Promise((resolve, reject) => {
            listener.close((error) => (error ? reject(error) : resolve()));
        }),
    };
}
function isDirectRun() {
    return process.argv[1]?.endsWith("server.ts") ?? false;
}
if (isDirectRun()) {
    main().catch((error) => {
        console.error(JSON.stringify(sanitizeForLogs(error), null, 2));
        process.exit(1);
    });
}
export async function main() {
    await startPfMcpServer();
}
