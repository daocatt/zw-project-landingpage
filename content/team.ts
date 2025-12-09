// STORAGE: content/team
// FORMAT: Aggregator for individual team member files

import { gemini } from './team/gemini.ts';
import { daocatt } from './team/daocatt.ts';
import { claudeCode } from './team/claude-code.ts';

// To add a new member:
// 1. Create a new .ts file in content/team/ exporting the MD string
// 2. Import it here
// 3. Add it to the array below

export const TEAM_FILES = [
  gemini,
  daocatt,
  claudeCode
];