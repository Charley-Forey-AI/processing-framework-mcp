from __future__ import annotations

import argparse
import json
import sys
import time
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import urljoin

from markdownify import markdownify as to_markdown
from playwright.sync_api import Error as PlaywrightError
from playwright.sync_api import TimeoutError as PlaywrightTimeoutError
from playwright.sync_api import sync_playwright

BASE_DIR = Path(__file__).resolve().parent
URLS_FILE = BASE_DIR / "urls.json"
DEFAULT_OUTPUT_DIR = BASE_DIR / "docs"
AUTH_STATE_FILE = BASE_DIR / "auth-state" / "storage-state.json"
FAILURES_FILE = BASE_DIR / "scrape-failures.json"

CONTENT_SELECTORS = [
    "article.md-content__inner.md-typeset",
    "article.md-content__inner",
    ".md-content article",
    "main article",
]


@dataclass
class PageTarget:
    url: str
    path: str
    section: str


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Scrape Trimble Processing Framework docs into markdown files."
    )
    parser.add_argument(
        "--urls-file",
        default=str(URLS_FILE),
        help="Path to urls.json manifest.",
    )
    parser.add_argument(
        "--output-dir",
        default=str(DEFAULT_OUTPUT_DIR),
        help="Directory where markdown pages are written.",
    )
    parser.add_argument(
        "--state-file",
        default=str(AUTH_STATE_FILE),
        help="Playwright storage state file for authenticated session reuse.",
    )
    parser.add_argument(
        "--delay-seconds",
        type=float,
        default=1.0,
        help="Delay between page fetches.",
    )
    parser.add_argument(
        "--max-retries",
        type=int,
        default=3,
        help="Retries per URL before marking as failed.",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=0,
        help="Optional page limit for test runs.",
    )
    parser.add_argument(
        "--headless",
        action="store_true",
        help="Run in headless mode. For first auth run, leave this off.",
    )
    parser.add_argument(
        "--force-login",
        action="store_true",
        help="Ignore saved storage state and prompt for interactive login again.",
    )
    return parser.parse_args()


def load_manifest(path: Path) -> tuple[str, list[PageTarget]]:
    payload = json.loads(path.read_text(encoding="utf-8"))
    base_url = payload.get("base_url")
    pages = payload.get("pages", [])
    if not base_url or not isinstance(base_url, str):
        raise ValueError("urls.json is missing a string base_url")
    targets: list[PageTarget] = []
    for item in pages:
        targets.append(
            PageTarget(
                url=item["url"],
                path=item["path"],
                section=item.get("section", ""),
            )
        )
    return base_url, targets


def is_login_page(page) -> bool:
    url_lower = page.url.lower()
    if "okta" in url_lower or "login" in url_lower or "signin" in url_lower:
        return True
    try:
        body = (page.locator("body").inner_text(timeout=2000) or "").lower()
    except PlaywrightTimeoutError:
        return False
    return "sign in with your account" in body or "cookies are required" in body


def wait_for_content(page, timeout_ms: int = 20000) -> str:
    last_error: Exception | None = None
    for selector in CONTENT_SELECTORS:
        try:
            page.wait_for_selector(selector, timeout=timeout_ms)
            html = page.locator(selector).first.inner_html()
            if html and html.strip():
                return html
        except PlaywrightTimeoutError as exc:
            last_error = exc
    if last_error:
        raise last_error
    raise RuntimeError("No content selector matched.")


def safe_goto(page, url: str, timeout_ms: int = 45000) -> None:
    try:
        page.goto(url, wait_until="domcontentloaded", timeout=timeout_ms)
    except PlaywrightError as exc:
        message = str(exc).lower()
        # Some doc routes redirect ./ -> /index.html, which can interrupt goto.
        if "interrupted by another navigation" not in message:
            raise
        page.wait_for_load_state("domcontentloaded", timeout=timeout_ms)


def sanitize_markdown(markdown: str) -> str:
    lines = [line.rstrip() for line in markdown.splitlines()]
    cleaned = "\n".join(lines).strip()
    return cleaned + "\n"


def build_frontmatter(title: str, source_url: str) -> str:
    fetched_at = datetime.now(tz=timezone.utc).isoformat()
    title_value = title.replace('"', '\\"')
    return (
        "---\n"
        f'title: "{title_value}"\n'
        f"source_url: {source_url}\n"
        f"fetched_at: {fetched_at}\n"
        "---\n\n"
    )


def write_page(output_dir: Path, rel_path: str, title: str, source_url: str, markdown: str) -> Path:
    destination = output_dir / f"{rel_path}.md"
    destination.parent.mkdir(parents=True, exist_ok=True)
    with destination.open("w", encoding="utf-8") as handle:
        handle.write(build_frontmatter(title=title, source_url=source_url))
        handle.write(markdown)
    return destination


def scrape_one(page, url: str, output_path: str, output_dir: Path, max_retries: int) -> Path:
    last_error: Exception | None = None
    for attempt in range(1, max_retries + 1):
        try:
            safe_goto(page, url=url, timeout_ms=45000)
            if is_login_page(page):
                raise RuntimeError("Session is not authenticated; redirected to login page.")
            html = wait_for_content(page)
            title = page.locator("h1").first.inner_text(timeout=5000).strip()
            markdown = to_markdown(html, heading_style="ATX")
            markdown = sanitize_markdown(markdown)
            return write_page(
                output_dir=output_dir,
                rel_path=output_path,
                title=title or output_path,
                source_url=url,
                markdown=markdown,
            )
        except Exception as exc:  # noqa: BLE001
            last_error = exc
            print(f"  attempt {attempt}/{max_retries} failed: {exc}")
            if attempt < max_retries:
                time.sleep(1.5)
    assert last_error is not None
    raise last_error


def ensure_authenticated_context(playwright, base_url: str, state_file: Path, headless: bool, force_login: bool):
    browser = playwright.chromium.launch(headless=headless)
    state_file.parent.mkdir(parents=True, exist_ok=True)

    can_reuse_state = state_file.exists() and not force_login
    context = browser.new_context(storage_state=str(state_file) if can_reuse_state else None)
    page = context.new_page()
    safe_goto(page, url=base_url, timeout_ms=45000)

    if can_reuse_state and not is_login_page(page):
        return browser, context, page

    print("\nInteractive login required.")
    print(f"Open browser window and sign in at: {base_url}")
    print("After you reach docs content, return here and press Enter.")
    input()

    safe_goto(page, url=base_url, timeout_ms=45000)
    if is_login_page(page):
        raise RuntimeError("Still on login page after confirmation. Authentication was not completed.")

    context.storage_state(path=str(state_file))
    print(f"Saved auth state to: {state_file}")
    return browser, context, page


def main() -> int:
    args = parse_args()
    urls_file = Path(args.urls_file).resolve()
    output_dir = Path(args.output_dir).resolve()
    state_file = Path(args.state_file).resolve()

    if not urls_file.exists():
        print(f"urls file does not exist: {urls_file}", file=sys.stderr)
        return 1

    base_url, targets = load_manifest(urls_file)
    if args.limit and args.limit > 0:
        targets = targets[: args.limit]

    output_dir.mkdir(parents=True, exist_ok=True)

    failures: list[dict[str, Any]] = []
    succeeded = 0

    with sync_playwright() as p:
        browser, context, page = ensure_authenticated_context(
            playwright=p,
            base_url=base_url,
            state_file=state_file,
            headless=args.headless,
            force_login=args.force_login,
        )
        try:
            print(f"Scraping {len(targets)} pages into: {output_dir}")
            for index, target in enumerate(targets, start=1):
                absolute_url = urljoin(base_url, target.url)
                print(f"[{index}/{len(targets)}] {absolute_url}")
                try:
                    destination = scrape_one(
                        page=page,
                        url=absolute_url,
                        output_path=target.path,
                        output_dir=output_dir,
                        max_retries=args.max_retries,
                    )
                    print(f"  saved -> {destination}")
                    succeeded += 1
                except Exception as exc:  # noqa: BLE001
                    failures.append(
                        {
                            "url": absolute_url,
                            "path": target.path,
                            "error": str(exc),
                        }
                    )
                    print(f"  failed -> {exc}")
                time.sleep(max(args.delay_seconds, 0))
        finally:
            context.close()
            browser.close()

    if failures:
        FAILURES_FILE.write_text(json.dumps(failures, indent=2), encoding="utf-8")
        print(f"\nCompleted with failures: {len(failures)} (see {FAILURES_FILE})")
    else:
        if FAILURES_FILE.exists():
            FAILURES_FILE.unlink()
        print("\nCompleted with no failures.")

    print(f"Successful pages: {succeeded}/{len(targets)}")
    return 0 if not failures else 2


if __name__ == "__main__":
    raise SystemExit(main())
