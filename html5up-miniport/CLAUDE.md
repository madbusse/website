# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Overview

This is Madeline Busse's personal portfolio website, a static site built on an HTML5 template and hosted on AWS. There is no build step or server-side logic.

## Developing

Open any HTML file directly in a browser to preview it. There is no build system, package manager, or local dev server required.

If you edit `assets/sass/main.scss`, you must compile it to `assets/css/main.css` with a Sass compiler:
```
sass assets/sass/main.scss assets/css/main.css
```
Editing `assets/css/main.css` directly is simpler if you're making targeted style tweaks.

## Site structure

- `index.html` — homepage with hero, featured projects, technical skills grid, resume download, and contact section
- `projects.html` — full project list organized by category (Robotics, AI/ML, Data Science)
- `aboutme.html` - page with key personal insights
- `gallery.html` - image-focused page with photos displayed in chronological order, with most recent photos at the top
- Individual project pages: `dancebot.html`, `treasure.html`, `blackfriday.html`, `kaggle.html`
- `busse_resume.pdf` — linked for download from the homepage

## Navigation pattern

Each page's `<nav>` must be manually kept in sync — there is no shared template or include system. When adding or removing nav links, update them in every HTML file.

## Header & Footer

Each page contains a header with links to all other pages at the top.

Each page contains a consistent footer, except for the home page `index.html` which has a unique footer.

## CSS architecture

Styles live in `assets/css/main.css` (compiled output) and `assets/sass/main.scss` (source). Custom layout classes like `.hero-section`, `.hero-content`, `.padded-container`, `.about-section`, and `.contact-links` extend the base Miniport theme. The responsive grid uses classes like `col-4 col-6-medium col-12-small`.

## Adding a project

1. Create a new `<project-name>.html` using an existing project page as a template.
2. Add a card for it in `projects.html` under the appropriate category section.
3. Add an image to `images/` and reference it in the card.
4. Optionally feature it on `index.html` in the Projects section (max ~3 featured).

## Adding a new image to gallery

1. Upload the photo to `images/`.
2. Create a new header for the current month and year in the `gallery.html` page. If the current month and year is already in a header, skip this step.
3. Add the image under the header for the the current month and year. Preserve existing styling for image.
4. Include a brief text description of the image on the back of the flip card.
