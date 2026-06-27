# Test Document Fixtures

All files are committed to the repo. Tests reference them by path — never generate files at runtime.

## Naming convention

| Prefix | Meaning |
|---|---|
| `valid-` | Should be accepted by the app |
| `invalid-` | Should be rejected by the app |

## Files

### Valid — happy path

| File | Size | Format | Purpose |
|---|---|---|---|
| `valid-small.txt` | 220 B | Plain text | Happy-path chat tests — real readable content for AI response assertions |
| `valid-small.pdf` | 632 B | PDF 1.4 | Happy-path PDF upload |
| `valid-small.doc` | 2 KB | OLE2/CFBF Word 97-2003 | Happy-path DOC upload |
| `valid-small.docx` | 935 B | OOXML ZIP | Happy-path DOCX upload |
| `valid-boundary-1mb.txt` | 1,048,576 B | Plain text | Boundary test — exactly 1 MB, must be accepted |

### Invalid — rejection tests

| File | Size | Purpose |
|---|---|---|
| `invalid-empty.txt` | 0 B | Empty file — should be rejected (BUG-004) |
| `invalid-empty.pdf` | 0 B | Empty file — should be rejected (BUG-004) |
| `invalid-empty.doc` | 0 B | Empty file — should be rejected (BUG-004) |
| `invalid-empty.docx` | 0 B | Empty file — should be rejected (BUG-004) |
| `invalid-over-1mb.txt` | 1,048,577 B | Over size limit — must be rejected |
| `invalid-type.exe` | tiny | Unsupported extension (greyed out in file picker via `accept` attribute) |
| `invalid-type.jpg` | tiny | Unsupported extension |
| `invalid-type.csv` | tiny | Unsupported extension |

