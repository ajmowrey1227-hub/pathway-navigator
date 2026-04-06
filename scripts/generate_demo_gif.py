#!/usr/bin/env python3
"""
Record a short GIF: last 2 quiz questions + results screen.
Requires: pip install pillow playwright && playwright install chromium

Run from project root:
  .venv/bin/python scripts/generate_demo_gif.py
"""
from __future__ import annotations

import http.server
import io
import os
import socketserver
import threading
import time

from PIL import Image

try:
    from playwright.sync_api import sync_playwright
except ImportError as e:
    raise SystemExit("Install playwright: pip install playwright && playwright install chromium") from e

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = 8899
BASE_URL = f"http://127.0.0.1:{PORT}/index.html"
OUT_NAME = "demo-pathway-navigator.gif"


def _resize(im: Image.Image, max_w: int = 960) -> Image.Image:
    w, h = im.size
    if w <= max_w:
        return im.convert("RGB")
    nh = int(h * (max_w / w))
    return im.convert("RGB").resize((max_w, nh), Image.Resampling.LANCZOS)


def main() -> None:
    os.chdir(ROOT)
    class _Handler(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *args):
            pass

    socketserver.TCPServer.allow_reuse_address = True
    httpd = socketserver.TCPServer(("", PORT), _Handler)
    thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    thread.start()
    time.sleep(0.3)

    frames: list[Image.Image] = []
    durations: list[int] = []

    def snap(ms: int = 450) -> None:
        png = page.screenshot(type="png", full_page=False)
        im = _resize(Image.open(io.BytesIO(png)))
        frames.append(im)
        durations.append(ms)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        page.goto(BASE_URL, wait_until="domcontentloaded", timeout=60000)
        page.wait_for_timeout(500)
        page.click("#btn-start")
        page.wait_for_timeout(400)

        # Reach step 13 (first of the last 2 questions): 13 click+next pairs from step 0
        for _ in range(13):
            page.locator(".option").first.click()
            page.wait_for_timeout(40)
            page.click("#btn-next")
            page.wait_for_timeout(50)

        # Last 2 questions — slower, with frames
        snap(600)  # question 13 (data-comfort) visible
        page.locator(".option").first.click()
        page.wait_for_timeout(350)
        snap(500)
        page.click("#btn-next")
        page.wait_for_timeout(500)
        snap(650)  # question 14 (values)
        page.locator(".option").first.click()
        page.wait_for_timeout(350)
        snap(500)
        page.click("#btn-next")
        # Transition animation ~1.1s
        page.wait_for_timeout(400)
        snap(350)
        page.wait_for_timeout(500)
        snap(400)
        page.wait_for_selector("#results.screen, #results", timeout=15000)
        page.wait_for_function(
            "() => document.querySelector('#results')?.classList.contains('active')",
            timeout=15000,
        )
        page.wait_for_timeout(600)
        snap(900)  # results visible
        page.wait_for_timeout(400)
        snap(1200)  # hold on results
        snap(1200)  # extra beats so the loop rests on results before repeating

        browser.close()

    httpd.shutdown()

    out_path = os.path.join(ROOT, OUT_NAME)
    if not frames:
        raise SystemExit("No frames captured")

    frames[0].save(
        out_path,
        save_all=True,
        append_images=frames[1:],
        duration=durations,
        loop=0,
        optimize=True,
    )
    size_kb = os.path.getsize(out_path) / 1024
    print(f"Wrote {out_path} ({len(frames)} frames, ~{size_kb:.1f} KB)")


if __name__ == "__main__":
    main()
