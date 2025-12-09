export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  image: string; // Supports HTTP URL or local path (e.g., /assets/project.png)
  projectUrl?: string; // Direct link
  qrCodeUrl?: string; // Optional QR code for mobile projects
  hasDetail: boolean; // Config to determine if a detail page is needed
  tags: string[];
  // Simulating MD content
  content?: string; 
  date: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string; // Supports HTTP URL or local path
  socials: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface SiteConfig {
  name: string;
  description: string;
  githubUrl: string;
  footerText: string;
}