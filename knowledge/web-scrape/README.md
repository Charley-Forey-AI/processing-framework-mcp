# Processing Framework Docs Scraper

Browser-authenticated scraper for Trimble Processing Framework docs.

## What this creates

- URL manifest: `urls.json` (36 pages from the nav you provided)
- Scraper script: `scrape.py`
- Output directory: `docs/` (one markdown file per page)
- Saved auth session: `auth-state/storage-state.json`

## Prerequisites

- Python 3.10+
- Access to `https://docs.trimblecloud.com/processing-framework/`

## Setup

From this directory (`knowledge/web-scrape`):

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m playwright install chromium
```

## Run

First run (interactive login in browser):

```powershell
python scrape.py
```

The script opens Chromium. Sign in with Trimble Identity / Okta, then come back to the terminal and press Enter. The session state is saved and reused on future runs.

Subsequent runs (reuses session):

```powershell
python scrape.py --headless
```

Useful options:

```powershell
python scrape.py --limit 3
python scrape.py --force-login
python scrape.py --delay-seconds 1.5 --max-retries 3
python scrape.py --output-dir "C:\Users\cforey\Documents\pf-mcp\knowledge\web-scrape\docs"
```

## Output format

Each generated markdown page includes frontmatter:

- `title`
- `source_url`
- `fetched_at` (UTC)

Example output paths:

- `docs/index.md`
- `docs/concepts/engines.md`
- `docs/how-to-guides/engine-development/api.md`
- `docs/reference/sdk/python/referencedocs.md`

## Troubleshooting

- If pages redirect to sign-in, rerun with `--force-login`.
- Failed pages are recorded in `scrape-failures.json`.
- If selectors break due to docs theme updates, adjust `CONTENT_SELECTORS` in `scrape.py`.

## RAG ingestion

Point your RAG pipeline at:

- `knowledge/web-scrape/docs/`

If you prefer a single knowledge root, copy or sync these markdown files into `knowledge/docs/`.
