import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { loadConfig } from "./config.js";
import { TokenStore } from "./auth/tokenStore.js";
import { TidAuthService } from "./auth/tidAuth.js";
import { PfClient } from "./client/pfClient.js";
import { createPfMcpServer } from "./serverFactory.js";

async function main(): Promise<void> {
  const config = loadConfig();
  const tokenStore = new TokenStore(config.tidTokenFile);
  const auth = new TidAuthService(config, tokenStore);
  await auth.initialize();
  const client = new PfClient(config, auth);
  const server = createPfMcpServer(config, auth, client);

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
