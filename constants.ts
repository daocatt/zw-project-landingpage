import { Project, SiteConfig, TeamMember } from './types';
import { parseMarkdown } from './utils/mdParser';
// Importing from the new content directory structure
import { PROJECT_FILES } from './content/projects';
import { TEAM_FILES } from './content/team';

export const SITE_CONFIG: SiteConfig = {
  name: "zw-Project",
  description: "Exploring the boundaries of code and creativity.",
  githubUrl: "https://github.com/your-username/zw-project",
  footerText: "© 2024 zw-Project. Built with React & Tailwind."
};

// --- DATA LOADING LOGIC ---

// Helper to sort by date descending
const sortByDateDesc = (a: { date?: string }, b: { date?: string }) => {
  if (!a.date) return 1;
  if (!b.date) return -1;
  return new Date(b.date).getTime() - new Date(a.date).getTime();
};

// 1. Process Projects
interface ProjectMetadata {
  id: string;
  title: string;
  shortDescription: string;
  image: string;
  projectUrl?: string;
  qrCodeUrl?: string;
  hasDetail: boolean;
  tags: string[];
  date: string;
}

export const PROJECTS: Project[] = PROJECT_FILES
  .map(fileContent => {
    const parsed = parseMarkdown<ProjectMetadata>(fileContent);
    return {
      ...parsed.metadata,
      content: parsed.content
    };
  })
  .sort(sortByDateDesc); // Auto-sort projects by date descending

// 2. Process Team
interface TeamMetadata {
  id: string;
  name: string;
  role: string;
  avatar: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
  date?: string; // Optional join date for sorting
}

export const TEAM_MEMBERS: TeamMember[] = TEAM_FILES
  .map(fileContent => {
    const parsed = parseMarkdown<TeamMetadata>(fileContent);
    const meta = parsed.metadata;
    
    return {
      id: meta.id,
      name: meta.name,
      role: meta.role,
      avatar: meta.avatar,
      bio: parsed.content,
      date: meta.date, // Preserve date for sorting
      socials: {
        github: meta.github,
        twitter: meta.twitter,
        linkedin: meta.linkedin,
        website: meta.website
      }
    } as TeamMember & { date?: string };
  })
  .sort(sortByDateDesc); // Auto-sort team by join date descending