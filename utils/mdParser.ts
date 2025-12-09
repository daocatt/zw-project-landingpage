export interface ParsedMarkdown<T> {
  metadata: T;
  content: string;
}

/**
 * Parses a string containing YAML-style frontmatter and markdown content.
 * Format:
 * ---
 * key: value
 * array: [item1, item2]
 * ---
 * Markdown content...
 */
export const parseMarkdown = <T>(md: string): ParsedMarkdown<T> => {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = frontmatterRegex.exec(md.trim());

  if (!match) {
    // Fallback if no frontmatter is found, treat whole string as content
    return { metadata: {} as T, content: md };
  }

  const rawMetadata = match[1];
  const content = match[2].trim();

  const metadata: any = {};
  
  rawMetadata.split('\n').forEach(line => {
    // Simple key: value parsing
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;
    
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Remove surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // Handle Arrays: [a, b, c]
    if (value.startsWith('[') && value.endsWith(']')) {
      const arrayContent = value.slice(1, -1);
      // Split by comma, trim, and remove quotes
      metadata[key] = arrayContent.split(',')
        .map(s => s.trim().replace(/^["']|["']$/g, ''))
        .filter(s => s.length > 0);
    } 
    // Handle Booleans
    else if (value === 'true') {
      metadata[key] = true;
    } else if (value === 'false') {
      metadata[key] = false;
    } 
    // Default String
    else {
      metadata[key] = value;
    }
  });

  return { metadata: metadata as T, content };
};