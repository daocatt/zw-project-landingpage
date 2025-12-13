export interface MarkdownProject {
    id: string;
    title: string;
    shortDescription: string;
    image: string;
    projectUrl?: string;
    qrCodeUrl?: string;
    tags: string[];
    date: string;
    content: string;
    filename: string;
}

export interface MarkdownProjectFrontmatter {
    title: string;
    shortDescription: string;
    image: string;
    projectUrl?: string;
    qrCodeUrl?: string;
    tags: string[];
    date: string;
}
