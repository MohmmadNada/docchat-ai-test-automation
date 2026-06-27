import { test as base } from '@playwright/test';

// Extend with page objects as they are added
export const test = base;
export { expect } from '@playwright/test';
