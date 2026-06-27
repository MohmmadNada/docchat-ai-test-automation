import { test as base } from '@playwright/test';
import { ChatPage } from '../pages/ChatPage';

type Fixtures = {
  chatPage: ChatPage;
};

export const test = base.extend<Fixtures>({
  chatPage: async ({ page }, use) => {
    await use(new ChatPage(page));
  },
});

export { expect } from '@playwright/test';
