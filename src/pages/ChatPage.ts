import { type Page, type Locator } from '@playwright/test';
import path from 'path';

export class ChatPage {
  private readonly dropzone: Locator;
  private readonly chatInput: Locator;

  private readonly uploadErrorNotification: Locator;
  private readonly aiResponseBubble: Locator;
  private readonly citationChip: Locator;

  constructor(private readonly page: Page) {
    this.dropzone  = page.getByTestId('file-upload-dropzone');
    this.chatInput = page.getByRole('textbox', { name: /Ask a question about your document/i });
    this.uploadErrorNotification = page.getByText('File too large', { exact: true });
    // AI bubbles use flex-row; user bubbles use flex-row-reverse — distinct Tailwind classes
    this.aiResponseBubble = page.locator('.animate-fade-in.flex-row');
    this.citationChip     = page.locator('span.rounded-full');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  /** No-op when the upload dropzone is already visible; otherwise removes every loaded document via the × buttons and waits for the dropzone to reappear. */
  async clearDocumentsIfPresent(): Promise<void> {
    if (await this.dropzone.isVisible()) return;
    while (await this.page.getByRole('button', { name: '×' }).count() > 0) {
      const currentCount = await this.page.getByRole('button', { name: '×' }).count();
      await this.page.getByRole('button', { name: '×' }).first().click();
      // Playwright has no built-in wait for "count decreased"; poll to avoid the next loop iteration firing before the DOM updates
      await this.page.waitForFunction(
        ({ n, id }) => {
          const zone = document.querySelector(`[data-testid="${id}"]`);
          const xs = [...document.querySelectorAll('button')].filter(b => b.textContent?.trim() === '×');
          return !!zone || xs.length < n;
        },
        { n: currentCount, id: 'file-upload-dropzone' }
      );
    }
  }

  /** Intercepts the native file chooser via the dropzone click and uploads the file at the given absolute path. Requires the dropzone to be visible — call clearDocumentsIfPresent() first. Waits until the filename tab is visible before returning. */
  async uploadFile(filePath: string): Promise<void> {
    const filename = path.basename(filePath);
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.dropzone.click(),
    ]);
    await fileChooser.setFiles(filePath);
    await this.page.getByText(filename, { exact: true }).waitFor({ state: 'visible' });
  }

  /** Triggers the file chooser via the dropzone without waiting for any outcome. Use for error-path tests where no filename tab should appear. */
  async attemptUpload(filePath: string): Promise<void> {
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.dropzone.click(),
    ]);
    await fileChooser.setFiles(filePath);
  }

  async waitForUploadError(): Promise<void> {
    await this.uploadErrorNotification.waitFor({ state: 'visible' });
  }

  async isUploadErrorVisible(): Promise<boolean> {
    return this.uploadErrorNotification.isVisible();
  }

  async sendMessage(text: string): Promise<void> {
    await this.chatInput.fill(text);
    await this.page.keyboard.press('Enter');
  }

  async isChatInputEmpty(): Promise<boolean> {
    return (await this.chatInput.inputValue()) === '';
  }

  /** Waits until the first AI response bubble contains a visible paragraph — accounts for API latency. */
  async waitForAIResponse(): Promise<void> {
    await this.aiResponseBubble.first().locator('p').first().waitFor({ state: 'visible' });
  }

  async isLastAIResponseNonEmpty(): Promise<boolean> {
    const text = await this.aiResponseBubble.last().locator('p').first().innerText();
    return text.trim().length > 0;
  }

  async isCitationChipVisible(filename: string): Promise<boolean> {
    return this.citationChip.filter({ hasText: filename }).first().isVisible();
  }

  async isChatInterfaceVisible(): Promise<boolean> {
    return this.chatInput.isVisible();
  }

  async isDocumentTabVisible(filename: string): Promise<boolean> {
    return this.page.getByText(filename, { exact: true }).isVisible();
  }
}
