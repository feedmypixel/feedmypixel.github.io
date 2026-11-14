"""Build web-sized status and Pipes screenshots from the pinned design originals.

Store frames, plain screens and the Pipes framed store set become WebP; pipe screenshots and
the Pipes share image are already small and are copied byte-for-byte.
Run from the repo root: python3 -I scripts/resize-screens.py
"""

import shutil
import sys
from pathlib import Path

from PIL import Image

SCREENS_SOURCE_DIRECTORY = Path('design/status-captures')
FRAMES_SOURCE_DIRECTORY = SCREENS_SOURCE_DIRECTORY / 'frames'
CONTROL_SOURCE_DIRECTORY = SCREENS_SOURCE_DIRECTORY / 'control'
PIPES_SOURCE_DIRECTORY = Path('design/pipes-captures')
PIPES_PAGE_SOURCE_DIRECTORY = Path('design/pipes-v8/mocks-pinned/render/assets/pipes')

FRAMES_DIRECTORY = Path('static/status/frames')
SCREENS_DIRECTORY = Path('static/status/screens')
DESKTOP_DIRECTORY = Path('static/status/desktop')
PIPES_DIRECTORY = Path('static/pipes')

FRAME_WIDTH = 560
SCREEN_WIDTH = 660
ARTICLE_SHOT_WIDTH = 1040
WEBP_QUALITY = 85

FRAMED_SHOTS = ['1-sidepanel-dark', '2-author-light', '3-popup-dark', '4-notification', '5-options-dark']

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
    for source in sorted(FRAMES_SOURCE_DIRECTORY.glob('*.png')):
        jobs.append((source, FRAMES_DIRECTORY / f'{source.stem}.webp', FRAME_WIDTH))
    for theme in THEMES:
        for source in sorted((SCREENS_SOURCE_DIRECTORY / theme).glob('*.png')):
            jobs.append((source, SCREENS_DIRECTORY / theme / f'{source.stem}.webp', SCREEN_WIDTH))
        for source in sorted((CONTROL_SOURCE_DIRECTORY / 'iphone' / theme).glob('*.png')):
            destination = SCREENS_DIRECTORY / theme / f'control-{source.stem}.webp'
            jobs.append((source, destination, SCREEN_WIDTH))
        for source in sorted((CONTROL_SOURCE_DIRECTORY / 'web-desktop' / theme).glob('*.png')):
            destination = DESKTOP_DIRECTORY / theme / f'control-{source.stem}.webp'
            jobs.append((source, destination, ARTICLE_SHOT_WIDTH))
    for shot in FRAMED_SHOTS:
        jobs.append((
            PIPES_PAGE_SOURCE_DIRECTORY / 'framed' / f'{shot}.png',
            PIPES_DIRECTORY / 'framed' / f'{shot}.webp',
            ARTICLE_SHOT_WIDTH,
        ))

    pipe_jobs = [
        (PIPES_SOURCE_DIRECTORY / f'{view}-{theme}.png', PIPES_DIRECTORY / f'{view}-{theme}.png')
        for view in PIPE_VIEWS
        for theme in THEMES
    ]
    pipe_jobs.append((
        PIPES_PAGE_SOURCE_DIRECTORY / 'framed' / '7-marquee-tile.png',
        PIPES_DIRECTORY / 'og-image.png',
    ))

    missing = [source for source, *_ in jobs + pipe_jobs if not source.is_file()]
    if not jobs or missing:
        print(f'Missing sources: {missing or FRAMES_SOURCE_DIRECTORY}', file=sys.stderr)
        sys.exit(1)

    for source, destination, width in jobs:
        report(destination, convert_to_webp(source, destination, width))
    for source, destination in pipe_jobs:
        report(destination, copy_unchanged(source, destination))


main()
