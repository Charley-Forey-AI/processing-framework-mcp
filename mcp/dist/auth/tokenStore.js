import { promises as fs } from "node:fs";
export class TokenStore {
    tokenFile;
    snapshot;
    constructor(tokenFile) {
        this.tokenFile = tokenFile;
    }
    async initialize() {
        if (!this.tokenFile)
            return;
        try {
            const raw = await fs.readFile(this.tokenFile, "utf8");
            const parsed = JSON.parse(raw);
            if (parsed?.accessToken) {
                this.snapshot = parsed;
            }
        }
        catch {
            // Ignore missing/invalid token file.
        }
    }
    get() {
        return this.snapshot;
    }
    async set(next) {
        this.snapshot = next;
        if (!this.tokenFile)
            return;
        await fs.writeFile(this.tokenFile, JSON.stringify(next, null, 2), "utf8");
    }
    async clear() {
        this.snapshot = undefined;
        if (!this.tokenFile)
            return;
        try {
            await fs.unlink(this.tokenFile);
        }
        catch {
            // Ignore if token file does not exist.
        }
    }
}
