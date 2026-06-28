import { test, expect } from '../../src/fixtures/fixtures';
import path from 'path';

const DOCS_DIR = path.join(__dirname, '../../data/documents');
const DOC = 'valid-small.txt';

// serial: tests share the same backend session; chat history from one test would pollute the next
test.describe('Chat', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ chatPage }) => {
    await chatPage.goto();
    await chatPage.clearDocumentsIfPresent();
    await chatPage.uploadFile(path.join(DOCS_DIR, DOC));
  });

  test('TC-CHAT-014 — should return a non-empty AI response with a source citation chip', async ({ chatPage }) => {
    await chatPage.sendMessage('What file formats are supported?');
    await chatPage.waitForAIResponse();

    expect(await chatPage.isChatInputEmpty()).toBe(true);
    expect(await chatPage.isLastAIResponseNonEmpty()).toBe(true);
    expect(await chatPage.isCitationChipVisible(DOC)).toBe(true);
  });
});
