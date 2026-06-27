# TC_AUTH — Authentication

**URL:** `/login`  
**Data-testids:** `username-input`, `password-input`, `login-button`, `logout-button`

---

## Login Page — UI

- [ ] **TC-AUTH-001** Login page loads at `/login` with the DocChat AI logo, "Welcome Back" heading, and "Sign in to continue" subtitle
- [ ] **TC-AUTH-002** Username field is visible and accepts text input
- [ ] **TC-AUTH-003** Password field is visible and masks characters
- [ ] **TC-AUTH-004** Sign In button is visible and enabled without any input
- [ ] **TC-AUTH-005** Language selector is available on the login page

---

## Login — Happy Path

- [ ] **TC-AUTH-006** Valid credentials redirect the user to `/` (home/chat page)
- [ ] **TC-AUTH-007** After login the header shows the Logout button, dark mode toggle, and language selector

---

## Login — Negative

- [ ] **TC-AUTH-008** Wrong username and correct password shows "Invalid username or password" error
- [ ] **TC-AUTH-009** Correct username and wrong password shows "Invalid username or password" error
- [ ] **TC-AUTH-010** Both fields wrong shows "Invalid username or password" error
- [ ] **TC-AUTH-011** Empty username with any password shows "Invalid username or password" error
- [ ] **TC-AUTH-012** Empty password with any username shows "Invalid username or password" error
- [ ] **TC-AUTH-013** Both fields empty — Sign In does not navigate away from `/login`
- [ ] **TC-AUTH-014** Error message disappears or updates on a subsequent submission attempt

---

## Auth Guard

- [ ] **TC-AUTH-015** Unauthenticated direct navigation to `/` redirects to `/login`
- [ ] **TC-AUTH-016** Unauthenticated direct navigation to any protected route redirects to `/login`

---

## Logout

- [ ] **TC-AUTH-017** Clicking Logout redirects to `/login`
- [ ] **TC-AUTH-018** After logout, navigating back to `/` redirects to `/login` (session cleared)
- [ ] **TC-AUTH-019** After logout, the browser back button does not restore the authenticated session
