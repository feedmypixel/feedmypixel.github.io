"""Build web-sized status screenshots from the pinned design originals.

Store frames and plain screens become WebP; pipe screenshots are already small and are
copied byte-for-byte. Run from the repo root: python3 -I scripts/resize-screens.py
"""

import shutil
import sys
from pathlib import Path

from PIL import Image

RENDER_DIRECTORY = Path('design/status-v7/mocks-pinned/render')
UPLOADS_DIRECTORY = RENDER_DIRECTORY / 'uploads/1206x2622'
PIPES_SOURCE_DIRECTORY = RENDER_DIRECTORY / 'assets/pipes'

FRAMES_DIRECTORY = Path('static/status/frames')
SCREENS_DIRECTORY = Path('static/status/screens')
PIPES_DIRECTORY = Path('static/pipes')

FRAME_WIDTH = 560
SCREEN_WIDTH = 660
WEBP_QUALITY = 85

THEMES = ['light', 'dark']
PIPE_VIEWS = ['popup', 'sidepanel', 'options', 'failure-notification']


def convert_to_webp(source, destination, width):
    with Image.open(source) as image:
        height = round(image.height * width / image.width)
        resized = image.resize((width, height), Image.LANCZOS)
        destination.parent.mkdir(parents=True, exist_ok=True)
        resized.save(destination, 'WEBP', quality=WEBP_QUALITY)
    return f'{width}x{height}'


def copy_unchanged(source, destination):
    destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(source, destination)
    with Image.open(destination) as image:
        return f'{image.width}x{image.height}'


def report(destination, dimensions):
    print(f'{destination}  {dimensions}  {destination.stat().st_size} bytes')


def main():
    jobs = []
    for source in sorted(UPLOADS_DIRECTORY.glob('*.png')):
        jobs.append((source, FRAMES_DIRECTORY / f'{source.stem}.webp', FRAME_WIDTH))
    for theme in THEMES:
        for source in sorted((UPLOADS_DIRECTORY / theme).glob('*.png')):
            jobs.append((source, SCREENS_DIRECTORY / theme / f'{source.stem}.webp', SCREEN_WIDTH))

    pipe_jobs = [
        (PIPES_SOURCE_DIRECTORY / f'{view}-{theme}.png', PIPES_DIRECTORY / f'{view}-{theme}.png')
        for view in PIPE_VIEWS
        for theme in THEMES
    ]

    missing = [source for source, *_ in jobs + pipe_jobs if not source.is_file()]
    if not jobs or missing:
        print(f'Missing sources: {missing or UPLOADS_DIRECTORY}', file=sys.stderr)
        sys.exit(1)

    for source, destination, width in jobs:
        report(destination, convert_to_webp(source, destination, width))
    for source, destination in pipe_jobs:
        report(destination, copy_unchanged(source, destination))


main()
