# Content Storage Definition

## Directory Structure
- `content/projects/*.ts`: Individual project files.
- `content/team/*.ts`: Individual team member files.

## Markdown Format
All files follow the Frontmatter + Content pattern.

### Project Format
```markdown
---
id: unique-id
title: Project Title
shortDescription: Brief summary for cards
image: https://... OR /assets/images/project.png
projectUrl: https://... (optional)
qrCodeUrl: https://... (optional)
hasDetail: true/false
tags: [Tag1, Tag2]
date: YYYY-MM-DD
---
# Heading (Markdown Body)
Detailed content...
Images in content: ![Alt Text](/path/to/image.jpg)
```

### Team Member Format
```markdown
---
id: unique-id
name: Full Name
role: Job Title
avatar: https://... OR /assets/team/photo.jpg
github: https://github.com/user (optional)
twitter: https://twitter.com/user (optional)
linkedin: https://linkedin.com/in/user (optional)
website: https://website.com (optional)
---
Bio content supports **markdown** styling.
```