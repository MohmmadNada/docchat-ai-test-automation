import { test, expect } from '../../src/fixtures/fixtures';
import path from 'path';
import uploadData from '../../src/data/upload.json';

const DOCS_DIR = path.join(__dirname, '../../data/documents');

// serial: all upload tests share the same backend user session — parallel runs cause document state conflicts
test.describe('File Upload', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ chatPage }) => {
    await chatPage.goto();
    await chatPage.clearDocumentsIfPresent();
  });

  for (const { tcId, file } of uploadData.validFiles) {
    test(`${tcId} — should upload ${file} and transition to chat interface`, async ({ chatPage }) => {
      await chatPage.uploadFile(path.join(DOCS_DIR, file));

      expect(await chatPage.isChatInterfaceVisible()).toBe(true);
      expect(await chatPage.isDocumentTabVisible(file)).toBe(true);
    });
  }
});
