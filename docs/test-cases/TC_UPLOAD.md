# TC_UPLOAD — Document Upload & Management

**URL:** `/`  
**Data-testids:** `file-input`, `theme-toggle`, `language-selector`  
**Supported formats:** TXT, PDF, DOC, DOCX  
**Max size:** 1 MB

---

## Upload Zone — UI

- [ ] **TC-UPL-001** Upload zone is displayed after login with icon, "Drop your document here or click to browse" text, and format hint "Supports TXT, PDF, DOC, DOCX (Max 1MB)"
- [ ] **TC-UPL-002** Clicking the upload zone opens the file chooser

---

## Valid File Upload

- [ ] **TC-UPL-003** Uploading `valid-small.txt` transitions the page to the chat interface
- [ ] **TC-UPL-004** Uploading `valid-small.pdf` transitions the page to the chat interface
- [ ] **TC-UPL-005** Uploading `valid-small.doc` transitions the page to the chat interface *(BUG-003: currently fails silently)*
- [ ] **TC-UPL-006** Uploading `valid-small.docx` transitions the page to the chat interface
- [ ] **TC-UPL-007** After upload the document tab bar shows the filename with a × remove button
- [ ] **TC-UPL-008** After upload the document count badge shows "1 document"
- [ ] **TC-UPL-009** After upload the "Add Document" button is visible
- [ ] **TC-UPL-010** After upload the trash (clear all) button is visible

---

## Invalid File Type

- [ ] **TC-UPL-011** Unsupported file types (`.exe`, `.jpg`, `.csv`) are greyed out and unselectable in the file picker
- [ ] **TC-UPL-012** The file picker `accept` attribute restricts selection to `.txt`, `.pdf`, `.doc`, `.docx` only
- [ ] **TC-UPL-013** Drag-and-drop of an unsupported file type shows a rejection error
- [ ] **TC-UPL-014** Drop zone hint text "Supports TXT, PDF, DOC, DOCX (Max 1MB)" is visible to guide the user

---

## Empty File Validation

- [ ] **TC-UPL-015** Uploading `invalid-empty.txt` (0 B) is rejected with an error *(BUG-004)*
- [ ] **TC-UPL-016** Uploading `invalid-empty.pdf` (0 B) is rejected with an error *(BUG-004)*
- [ ] **TC-UPL-017** Uploading `invalid-empty.doc` (0 B) is rejected with an error *(BUG-004)*
- [ ] **TC-UPL-018** Uploading `invalid-empty.docx` (0 B) is rejected with an error *(BUG-004)*

---

## File Size Validation

- [ ] **TC-UPL-019** Uploading `invalid-over-1mb.txt` (1 MB + 1 B) shows "File too large" and is rejected
- [ ] **TC-UPL-020** Error message clearly states the file size limit
- [ ] **TC-UPL-021** Uploading `valid-boundary-1mb.txt` (exactly 1 MB) is accepted

---

## Multiple Documents

- [ ] **TC-UPL-022** Clicking "Add Document" after an upload allows adding a second document
- [ ] **TC-UPL-023** Document count badge increments for each added document
- [ ] **TC-UPL-024** Each document appears as a separate tab with its filename

---

## Remove Single Document

- [ ] **TC-UPL-025** Clicking × on a document tab removes that document from the tab bar
- [ ] **TC-UPL-026** Document count badge decrements after removing a document
- [ ] **TC-UPL-027** Removing the last document returns the page to the upload zone state

---

## Clear All Documents

- [ ] **TC-UPL-028** Clicking the trash icon opens the "Clear All Documents" confirmation modal
- [ ] **TC-UPL-029** Modal shows title "Clear All Documents" and the warning "This will also clear the chat history"
- [ ] **TC-UPL-030** Clicking Cancel closes the modal and documents remain
- [ ] **TC-UPL-031** Clicking Cancel preserves the existing chat history
- [ ] **TC-UPL-032** Clicking "Clear All" removes all documents and returns to the upload zone
- [ ] **TC-UPL-033** Clicking "Clear All" clears the entire chat history

---

## Drag and Drop

- [ ] **TC-UPL-034** Dragging a valid file onto the drop zone uploads it successfully
- [ ] **TC-UPL-035** Dragging an invalid file type onto the drop zone shows an error
