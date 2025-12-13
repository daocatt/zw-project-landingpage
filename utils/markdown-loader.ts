/// <reference types="vite/client" />

import { MarkdownProject, MarkdownProjectFrontmatter } from '../types/markdown-project';

/**
 * Parse frontmatter from markdown content
 */
function parseFrontmatter(content: string): { frontmatter: MarkdownProjectFrontmatter; body: string } {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (!match) {
        throw new Error('Invalid markdown format: frontmatter not found');
    }

    const [, frontmatterText, body] = match;
    const frontmatter: any = {};

    // Parse YAML-like frontmatter
    frontmatterText.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) return;

        const key = line.slice(0, colonIndex).trim();
        let value: any = line.slice(colonIndex + 1).trim();

        // Handle arrays (tags)
        if (value.startsWith('[') && value.endsWith(']')) {
            value = value
                .slice(1, -1)
                .split(',')
                .map((item: string) => item.trim());
        }

        frontmatter[key] = value;
    });

    return { frontmatter: frontmatter as MarkdownProjectFrontmatter, body: body.trim() };
}

/**
 * Load all markdown projects from the projects directory
 */
export async function loadMarkdownProjects(): Promise<MarkdownProject[]> {
    const projects: MarkdownProject[] = [];

    // Use Vite's glob import to load all markdown files
    const markdownFiles = import.meta.glob('/projects/*.md', { as: 'raw', eager: true });

    for (const [path, content] of Object.entries(markdownFiles)) {
        try {
            const filename = path.split('/').pop()?.replace('.md', '') || '';
            const { frontmatter, body } = parseFrontmatter(content as string);

            projects.push({
                id: filename,
                title: frontmatter.title,
                shortDescription: frontmatter.shortDescription,
                image: frontmatter.image,
                projectUrl: frontmatter.projectUrl,
                qrCodeUrl: frontmatter.qrCodeUrl,
                tags: frontmatter.tags,
                date: frontmatter.date,
                content: body,
                filename,
            });
        } catch (error) {
            console.error(`Error parsing markdown file ${path}:`, error);
        }
    }

    // Sort by date (newest first)
    projects.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
    });

    return projects;
}

/**
 * Get a single markdown project by ID
 */
export async function getMarkdownProject(id: string): Promise<MarkdownProject | null> {
    const projects = await loadMarkdownProjects();
    return projects.find(p => p.id === id) || null;
}
