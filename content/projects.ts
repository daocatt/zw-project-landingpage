// STORAGE: content/projects
// FORMAT: Aggregator for individual project files

import { ai_processor } from './projects/ai-processor';
import { eco_tracker } from './projects/eco-tracker';
import { dashboard_pro } from './projects/dashboard-pro';
import { finance_bot } from './projects/finance-bot';

// To add a new project:
// 1. Create a new .ts file in content/projects/ exporting the MD string
// 2. Import it here
// 3. Add it to the array below
// Sorting is handled automatically by the date field in constants.ts

export const PROJECT_FILES = [
  ai_processor,
  eco_tracker,
  dashboard_pro,
  finance_bot
];