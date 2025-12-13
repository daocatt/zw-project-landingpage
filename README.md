# PPProject

A generic, Markdown-based project portfolio and team showcase application built with React and TypeScript.

## Features

- **Project Showcase**: Display projects with images, descriptions, tags, and links.
- **Team Page**: Showcase team members with avatars and bio.
- **Markdown Support**: Content for projects and team members is stored as markdown-like strings in the `content/` directory, supporting rich text and images.
- **Filtering**: Search and filter projects by tags.
- **Responsive**: Fully responsive design using Tailwind CSS.

## Directory Structure

- `content/projects/*.ts`: Add new project files here.
- `content/team/*.ts`: Add new team member files here.
- `content/projects.ts` & `content/team.ts`: Aggregator files. You must import your new files here to make them visible.
- `constants.ts`: Global configuration and data processing logic.

## Local Development

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment to Cloudflare Pages

This project is configured to use **Vite** for building static assets.

### Option 1: Connect via Git (Recommended)

1.  Push your code to a GitHub/GitLab repository.
2.  Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
3.  Go to **Workers & Pages** > **Create Application** > **Pages** > **Connect to Git**.
4.  Select your repository.
5.  Configure the build settings:
    *   **Framework Preset**: `Vite`
    *   **Build command**: `npm run build`
    *   **Build output directory**: `dist`
6.  Click **Save and Deploy**.

### Option 2: Direct Upload

1.  Build the project locally:
    ```bash
    npm run build
    ```
2.  This will create a `dist` folder in your project root.
3.  Go to Cloudflare Pages and select "Direct Upload" to upload the `dist` folder.

## Customization

### Adding Content
To add a new project, create a file in `content/projects/my-new-project.ts` following the existing pattern, and register it in `content/projects.ts`.

### Changing Images
The application supports both external URLs (e.g., `https://...`) and local paths. If using local images, place them in the `public/` directory (create it if it doesn't exist) and reference them like `/my-image.jpg`.


# Team Member Avatars

Place team member avatar images in this folder.

## Naming Convention
- Use the member's ID as the filename (e.g., `gemini.jpg`, `daocatt.png`)
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`

## Recommended Specifications
- Size: 200x200px to 400x400px (square)
- Format: JPG or PNG
- File size: Keep under 200KB for optimal loading

## Usage
Reference avatars in team member files like this:
```
avatar: /avatars/gemini.jpg
```

The `/avatars/` path is relative to the public directory.
