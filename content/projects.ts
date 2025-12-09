// STORAGE: content/projects
// FORMAT: Aggregator for individual project files

import { suda } from './projects/suda';
import { antisoup } from './projects/antisoup';
import { threeDBricks } from './projects/threed-bricks';
import { miniapps } from './projects/miniapps';
import { retrosnapAi } from './projects/retrosnap-ai';

// To add a new project:
// 1. Create a new .ts file in content/projects/ exporting the MD string
// 2. Import it here
// 3. Add it to the array below
// Sorting is handled automatically by the date field in constants.ts

export const PROJECT_FILES = [
  suda,
  antisoup,
  threeDBricks,
  miniapps,
  retrosnapAi
];