<div align="center">
  <img src="https://raw.githubusercontent.com/aymenelouadi/discord-html-transcripts-components-v2/main/media/back.png" alt="discord-transcript-v2" width="100%" />

  <br/><br/>

  <h1>discord-transcript-v2</h1>

  <p><strong>The only Discord transcript library with full Components V2 support.</strong><br/>
  Generate beautiful, pixel-perfect HTML transcripts — classic messages, rich embeds, <em>and</em> every Components V2 type.</p>

  <br/>

  [![npm](https://img.shields.io/npm/v/discord-transcript-v2?style=for-the-badge&color=5865F2&labelColor=1a1b1e&label=npm)](https://www.npmjs.com/package/discord-transcript-v2)
  [![downloads](https://img.shields.io/npm/dm/discord-transcript-v2?style=for-the-badge&color=248046&labelColor=1a1b1e&label=downloads)](https://www.npmjs.com/package/discord-transcript-v2)
  [![discord](https://img.shields.io/discord/1478503047951941785?style=for-the-badge&color=5865F2&labelColor=1a1b1e&label=discord&logo=discord&logoColor=white)](https://discord.gg/KBaDzNsvSt)
  [![ko-fi](https://img.shields.io/badge/Ko--fi-support-FF5E5B?style=for-the-badge&labelColor=1a1b1e&logo=ko-fi&logoColor=white)](https://ko-fi.com/code_nexus)
  [![license](https://img.shields.io/github/license/aymenelouadi/discord-html-transcripts-components-v2?style=for-the-badge&color=da373c&labelColor=1a1b1e)](LICENSE)

  <br/>

  [![Join Code Nexus](https://img.shields.io/badge/Join%20Code%20Nexus-Community%20%26%20Support-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/KBaDzNsvSt)

  <br/><br/>
</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🧩 **Components V2** | Container · TextDisplay · Separator · MediaGallery · Section · Thumbnail · File · Buttons · All 5 Select types |
| 📋 **Classic Messages** | Plain text, rich embeds (all fields), attachments, reactions, threads, slash commands, replies |
| 🎨 **Modern Design** | Pixel-perfect Discord UI with Inter font, CSS variables, smooth animations, and deep dark theme |
| 🖼️ **Image Saving** | Optionally download and embed all images directly into the HTML (no CDN links) |
| 🗂️ **Self-contained** | Single `.html` file — no external runtime dependencies after generation |
| ⚡ **React 19 SSR** | Powered by `prerenderToNodeStream` for fast, memory-efficient rendering |
| 📝 **Markdown** | Headings · Lists · Bold/Italic · Code blocks · Blockquotes · Spoilers · Timestamps |
| 🔧 **TypeScript** | Fully typed public API |

---

## 📦 Installation

```bash
npm install discord-transcript-v2
```

> **Peer dependency:** `discord.js ^14.0.0 || ^15.0.0`

---

## 🚀 Quick Start

### `createTranscript` — from a live channel

```ts
import { createTranscript, ExportReturnType } from 'discord-transcript-v2';

// Export as a Discord attachment (default)
const attachment = await createTranscript(channel);
await logChannel.send({ files: [attachment] });

// Export as a string and save to disk
const html = await createTranscript(channel, {
  returnType: ExportReturnType.String,
  filename: 'transcript.html',
  saveImages: true,
  poweredBy: true,
});
```

### `generateFromMessages` — from an array of messages

```ts
import { generateFromMessages, ExportReturnType } from 'discord-transcript-v2';

const messages = await channel.messages.fetch({ limit: 100 });

const buffer = await generateFromMessages(messages, channel, {
  returnType: ExportReturnType.Buffer,
  saveImages: false,
});
```

---

## 📚 API Reference

### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `returnType` | `ExportReturnType` | `Attachment` | `Attachment`, `Buffer`, or `String` |
| `filename` | `string` | `transcript.html` | Output file name |
| `limit` | `number` | `-1` (all) | Max messages to fetch |
| `saveImages` | `boolean` | `false` | Download & embed images into the file |
| `poweredBy` | `boolean` | `true` | Show footer credit |
| `footerText` | `string` | — | Custom footer (`{number}` = count, `{s}` = plural) |
| `favicon` | `'guild' \| string` | `'guild'` | Page favicon URL |
| `hydrate` | `boolean` | `false` | Server-side hydrate web components |

### `ExportReturnType`

```ts
enum ExportReturnType {
  Attachment = 'attachment', // discord.js AttachmentBuilder
  Buffer     = 'buffer',
  String     = 'string',
}
```

---

## 🧩 Components V2 Coverage

| Component | Status | Notes |
|---|---|---|
| `Container` | ✅ | Accent colour bar, spoiler blur |
| `TextDisplay` | ✅ | Full Discord markdown |
| `Separator` | ✅ | Divider line or spacing block (sm / lg) |
| `MediaGallery` | ✅ | 1–10 items, auto-grid layout |
| `Section` | ✅ | Thumbnail or Button accessory |
| `Thumbnail` | ✅ | Alt text, hover animation |
| `File` | ✅ | Spoiler support, `attachment://` protocol |
| `Button` | ✅ | All 6 styles + disabled + emoji |
| `StringSelect` | ✅ | Options with emoji & description |
| `UserSelect` | ✅ | |
| `RoleSelect` | ✅ | |
| `MentionableSelect` | ✅ | |
| `ChannelSelect` | ✅ | |

---

## 💬 Support & Community

Join **Code Nexus** for help, updates, and feature requests:

<div align="center">
  <a href="https://discord.gg/KBaDzNsvSt">
    <img src="https://discordapp.com/api/guilds/1478503047951941785/widget.png?style=banner2" alt="Code Nexus Discord" />
  </a>
</div>

---

## ☕ Support Development

<div align="center">
  <a href="https://ko-fi.com/code_nexus">
    <img src="https://ko-fi.com/img/githubbutton_sm.svg" alt="Support on Ko-fi" />
  </a>
</div>

---

## 🛠️ Development

```bash
git clone https://github.com/aymenelouadi/discord-html-transcripts-components-v2.git
cd discord-html-transcripts-components-v2
npm install
npm run build

# Run live CV2 coverage test (needs .env with DISCORD_TOKEN + GUILD_ID)
cp .env.example .env
npm run test:cv2
```

---

## 📄 Changelog

See [CHANGELOG.md](CHANGELOG.md) for the full release history.

---

## 📜 License

MIT © 2026 [aymenelouadi](https://github.com/aymenelouadi) · Supported by [Code Nexus](https://discord.gg/KBaDzNsvSt)

---

<div align="center">
  <sub>
    <a href="https://discord.gg/KBaDzNsvSt">Code Nexus Community</a> ·
    <a href="https://ko-fi.com/code_nexus">Ko-fi</a> ·
    <a href="https://www.npmjs.com/package/discord-transcript-v2">npm</a> ·
    <a href="https://github.com/aymenelouadi/discord-html-transcripts-components-v2">GitHub</a>
  </sub>
</div>
