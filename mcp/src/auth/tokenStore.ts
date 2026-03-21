import { promises as fs } from "node:fs";

type TokenSnapshot = {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
};

export class TokenStore {
  private snapshot?: TokenSnapshot;

  constructor(private readonly tokenFile?: string) {}

  async initialize(): Promise<void> {
    if (!this.tokenFile) return;

    try {
      const raw = await fs.readFile(this.tokenFile, "utf8");
      const parsed = JSON.parse(raw) as TokenSnapshot;
      if (parsed?.accessToken) {
        this.snapshot = parsed;
      }
    } catch {
      // Ignore missing/invalid token file.
    }
  }

  get(): TokenSnapshot | undefined {
    return this.snapshot;
  }

  async set(next: TokenSnapshot): Promise<void> {
    this.snapshot = next;
    if (!this.tokenFile) return;
    await fs.writeFile(this.tokenFile, JSON.stringify(next, null, 2), "utf8");
  }

  async clear(): Promise<void> {
    this.snapshot = undefined;
    if (!this.tokenFile) return;
    try {
      await fs.unlink(this.tokenFile);
    } catch {
      // Ignore if token file does not exist.
    }
  }
}

export type { TokenSnapshot };
