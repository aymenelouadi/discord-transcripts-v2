# Changelog

All notable changes to `discord-transcript-v2` will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] — 2026-03-13

### 🎉 Initial Release

This is the first public release of **discord-transcript-v2**, a complete rewrite and rebrand of `discord-html-transcripts` with full Discord Components V2 support.

---

### ✨ Added — Components V2

Full rendering support for every Discord Components V2 type:

- **Container** — accent colour bar (any hex), spoiler blur, multiple nested children
- **TextDisplay** — full Discord markdown inside CV2 messages
- **Separator** — divider line (`on/off`) × spacing (`SMALL` / `LARGE`) = 4 combinations
- **MediaGallery** — 1–10 items; auto-grid layout (1-col / 2-col / 2×2 / 3-col); hover zoom
- **Section** — horizontal row layout with **Thumbnail** or **Button** as accessory
- **Thumbnail** — 84×84 image with alt text and hover lift animation
- **File** — `attachment://` protocol support, spoiler blur option
- **Button** — Primary, Secondary, Success, Danger, Link (with URL), Premium (gradient); disabled state; custom emoji
- **StringSelect** — placeholder, min/max values, options with label + emoji + description
- **UserSelect** — placeholder
- **RoleSelect** — placeholder
- **MentionableSelect** — placeholder
- **ChannelSelect** — placeholder

---

### ✨ Added — Classic Messages

Full support for non-CV2 Discord messages:

- Plain text with full markdown (bold, italic, underline, strikethrough, spoiler, code, blockquote)
- Rich embeds — author, title, URL, description, inline/full fields, image, thumbnail, footer, timestamp, colour bar
- File & image attachments
- Emoji reactions with count
- Thread references
- Slash command interactions
- Message replies

---

### ✨ Added — Markdown Rendering

Extended `discord-markdown-parser` AST support:

- `heading` — `#` (15px), `##` (17px), `###` (20px) with bold weight
- `list` — unordered (`<ul>`) and ordered (`<ol>`) with `<li>` items
- All existing inline nodes: bold, italic, underline, strikethrough, inline-code, code-block, blockquote, spoiler, emoji, mention, channel, timestamp

---

### ✨ Added — Modern Page Design

- **Inter** font loaded from Google Fonts
- **CSS custom properties** (`--page-bg`, `--accent`, `--radius-*`, `--shadow-*`, `--anim`)
- **Custom dark scrollbar** — thin, rounded, translucent
- **Deep dark background** (`#0b0c0e`)
- **Polished footer** — stats pill with glowing accent dot + Ko-fi / GitHub credit
- All CV2 components redesigned with shadows, hover animations, and smooth transitions

---

### ✨ Added — Developer Experience

- `.env` / `.env.example` pattern — no secrets in code
- `npm run test:cv2` — comprehensive live bot test covering all 13 CV2 categories
- `npm run build` — full TypeScript compile to `dist/`
- `.npmignore` — clean npm package (no tests, no docs, no media)
- Fully typed public API (`ExportReturnType`, `createTranscript`, `generateFromMessages`)

---

### 🔧 Changed

- Package renamed from `discord-html-transcripts` → **`discord-transcript-v2`**
- License changed from Apache-2.0 → **MIT**
- All inline styles replaced with semantic CSS class names (`.dcv2-*`, `.discord-button-*`, `.discord-select-menu-*`)
- "Powered by" footer link updated to Code Nexus / this repository
- React upgraded to 19.x with `prerenderToNodeStream` SSR

---

### 🗑️ Removed

- Removed original Apache-2.0 license headers
- Removed all `@ItzDerock` branding and funding links
- Removed `docs/` GitBook documentation (replaced by this README)

---

[1.0.0]: https://github.com/aymenelouadi/discord-html-transcripts-components-v2/releases/tag/v1.0.0
