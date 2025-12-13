# Markdown Projects System

This directory contains markdown files that are automatically loaded and displayed on the Markdown Projects page.

## File Format

Each markdown file should follow this format:

```markdown
---
title: Project Title
shortDescription: A brief description of the project
image: /projects/image.png
projectUrl: https://example.com (optional)
qrCodeUrl: https://example.com/qr (optional)
tags: [Tag1, Tag2, Tag3]
date: YYYY-MM-DD
---

# Project Title

Your markdown content goes here...

## Features

- Feature 1
- Feature 2

## Technical Details

More details...
```

## Frontmatter Fields

- **title** (required): The project title
- **shortDescription** (required): A short description shown on the project card
- **image** (required): Path to the project image
- **projectUrl** (optional): External link to the live project
- **qrCodeUrl** (optional): QR code image for mobile access
- **tags** (required): Array of technology/category tags
- **date** (required): Project date in YYYY-MM-DD format (used for sorting)

## Automatic Features

1. **Auto-loading**: All `.md` files in this directory are automatically loaded
2. **Time-based sorting**: Projects are sorted by date (newest first)
3. **Search & Filter**: Built-in search and tag filtering
4. **Markdown rendering**: Full markdown support for project details

## Adding a New Project

1. Create a new `.md` file in this directory
2. Follow the format above
3. The project will automatically appear on the Markdown Projects page

## Example

See `example-project.md`, `ai-chatbot.md`, and `ecommerce-platform.md` for examples.
