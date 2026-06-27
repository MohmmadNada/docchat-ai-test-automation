# TC_CHAT — Chat Functionality

**URL:** `/` (with a document loaded)  
**Prerequisites:** User is logged in and has uploaded a valid document

---

## Empty Chat State

- [ ] **TC-CHAT-001** Chat area shows "Start a conversation" heading and subtitle before any message is sent
- [ ] **TC-CHAT-002** Three suggested questions are displayed, generated from the document content
- [ ] **TC-CHAT-003** Chat input placeholder reads "Ask a question about your document..."
- [ ] **TC-CHAT-004** Send button is disabled when the chat input is empty

---

## Suggested Questions

- [ ] **TC-CHAT-005** Clicking a suggested question populates it as the user message and triggers an AI response
- [ ] **TC-CHAT-006** The user message bubble appears right-aligned in green
- [ ] **TC-CHAT-007** The AI response bubble appears left-aligned
- [ ] **TC-CHAT-008** Each AI response shows the source document filename as a citation chip below the bubble
- [ ] **TC-CHAT-009** Timestamps are shown on both the user message and the AI response

---

## Typed Questions

- [ ] **TC-CHAT-010** Typing a question enables the Send button
- [ ] **TC-CHAT-011** Pressing Enter submits the question
- [ ] **TC-CHAT-012** Clicking the Send button submits the question
- [ ] **TC-CHAT-013** Input field is cleared after submitting a question
- [ ] **TC-CHAT-014** AI responds to a question about content present in the document
- [ ] **TC-CHAT-015** AI response for an out-of-scope question indicates the information is not in the document
- [ ] **TC-CHAT-016** Multiple questions can be asked in sequence and the full conversation is shown

---

## Web Search Mode

- [ ] **TC-CHAT-017** Web Search button is visible in the input area and inactive (grey) by default
- [ ] **TC-CHAT-018** Clicking Web Search toggles it to active (blue)
- [ ] **TC-CHAT-019** Clicking Web Search again toggles it back to inactive
- [ ] **TC-CHAT-020** With Web Search active, submitting a question returns an AI response
- [ ] **TC-CHAT-021** Web Search state persists across multiple questions in the same session

---

## Chat History & State

- [ ] **TC-CHAT-022** Chat history is preserved when switching Web Search on/off
- [ ] **TC-CHAT-023** Chat history is preserved when adding a second document
- [ ] **TC-CHAT-024** Chat history is cleared after confirming "Clear All Documents"
- [ ] **TC-CHAT-025** Chat history is cleared after removing the last document via the × button
