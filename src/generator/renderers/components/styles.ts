import type { CSSProperties } from 'react';
import { ButtonStyle } from 'discord.js';

// Container styles
export const containerStyle = {
  display: 'grid',
  gap: '4px',
  width: '100%',
  maxWidth: '516px',
  borderRadius: '8px',
  overflow: 'hidden',
} satisfies CSSProperties;

// Base image style
export const baseImageStyle = {
  overflow: 'hidden',
  position: 'relative',
  background: '#2b2d31',
} satisfies CSSProperties;

// Button style mapping
export const ButtonStyleMapping = {
  [ButtonStyle.Primary]: 'primary',
  [ButtonStyle.Secondary]: 'secondary',
  [ButtonStyle.Success]: 'success',
  [ButtonStyle.Danger]: 'destructive',
  [ButtonStyle.Link]: 'link',
  [ButtonStyle.Premium]: 'premium',
} as const;

export const globalStyles = `
  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     Discord HTML Transcripts â€” Components V2 Styles
     Redesigned by aymenelouadi
     https://github.com/aymenelouadi/discord-html-transcripts-components-v2
  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

  /* â”€â”€ V2 Container â”€â”€ */
  .dcv2-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 520px;
    background: linear-gradient(135deg, #1e1f22 0%, #1a1b1e 100%);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: var(--radius-lg, 12px);
    overflow: hidden;
    margin: 6px 0;
    box-sizing: border-box;
    box-shadow: 0 2px 12px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.3);
    transition: box-shadow 0.18s ease, border-color 0.18s ease;
  }

  .dcv2-container:hover {
    border-color: rgba(255,255,255,0.11);
    box-shadow: 0 4px 20px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.3);
  }

  .dcv2-container.has-accent {
    border-left: none;
  }

  .dcv2-container-inner {
    display: flex;
    flex-direction: column;
    padding: 14px 16px;
    gap: 10px;
  }

  .dcv2-container-accent-bar {
    width: 4px;
    flex-shrink: 0;
    align-self: stretch;
    min-height: 100%;
    border-radius: 0;
  }

  .dcv2-container-accent-wrap {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  /* â”€â”€ V2 Section â”€â”€ */
  .dcv2-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    max-width: 520px;
    gap: 10px;
    padding: 8px 0;
    box-sizing: border-box;
  }

  .dcv2-section-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
    min-width: 0;
  }

  .dcv2-section-accessory {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* â”€â”€ V2 Separator â”€â”€ */
  .dcv2-separator {
    display: block;
    width: 100%;
    box-sizing: border-box;
  }

  .dcv2-separator-line {
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent);
    border: none;
    margin: 0;
  }

  .dcv2-separator-spacing-sm {
    padding: 4px 0;
  }

  .dcv2-separator-spacing-lg {
    padding: 10px 0;
  }

  /* â”€â”€ V2 Media Gallery â”€â”€ */
  .dcv2-media-gallery {
    display: grid;
    gap: 3px;
    width: 100%;
    max-width: 520px;
    border-radius: var(--radius-md, 10px);
    overflow: hidden;
    margin: 4px 0;
    box-shadow: 0 2px 12px rgba(0,0,0,0.4);
  }

  .dcv2-media-gallery-item {
    overflow: hidden;
    position: relative;
    background: #111214;
    cursor: pointer;
  }

  .dcv2-media-gallery-item img,
  .dcv2-media-gallery-item video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.22s cubic-bezier(0.4,0,0.2,1);
  }

  .dcv2-media-gallery-item:hover img,
  .dcv2-media-gallery-item:hover video {
    transform: scale(1.03);
  }

  .dcv2-media-gallery-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 24px;
    font-weight: 700;
    font-family: 'Inter', Whitney, sans-serif;
    backdrop-filter: blur(2px);
    letter-spacing: -0.5px;
  }

  /* â”€â”€ V2 Thumbnail â”€â”€ */
  .dcv2-thumbnail {
    width: 84px;
    height: 84px;
    border-radius: var(--radius-sm, 6px);
    overflow: hidden;
    flex-shrink: 0;
    background: #111214;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    transition: transform 0.18s ease, box-shadow 0.18s ease;
  }

  .dcv2-thumbnail:hover {
    transform: scale(1.04);
    box-shadow: 0 4px 16px rgba(0,0,0,0.5);
  }

  .dcv2-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* â”€â”€ V2 Text Display â”€â”€ */
  .dcv2-text-display {
    color: #dde1e6;
    font-size: 14px;
    line-height: 1.45;
    font-family: 'Inter', Whitney, 'Helvetica Neue', Helvetica, Arial, sans-serif;
    letter-spacing: 0.01em;
  }

  /* â”€â”€ Buttons â”€â”€ */
  .discord-button {
    color: #ffffff !important;
    padding: 3px 16px;
    border-radius: 4px;
    text-decoration: none !important;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    font-size: 14px;
    font-weight: 500;
    height: 34px;
    min-height: 34px;
    min-width: 60px;
    cursor: pointer;
    font-family: 'Inter', Whitney, sans-serif;
    text-align: center;
    box-sizing: border-box;
    border: none;
    outline: none;
    transition: filter 0.14s ease, transform 0.12s ease, box-shadow 0.14s ease;
    user-select: none;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    letter-spacing: 0.01em;
  }

  .discord-button::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0);
    transition: background 0.14s ease;
  }

  .discord-button:hover::before {
    background: rgba(255,255,255,0.08);
  }

  .discord-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
  }

  .discord-button.disabled {
    opacity: 0.45;
    cursor: not-allowed;
    pointer-events: none;
    transform: none !important;
    box-shadow: none !important;
  }

  .discord-button-emoji {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
  }

  .discord-button-emoji img {
    width: 18px;
    height: 18px;
  }

  .discord-button-link-icon {
    display: inline-flex;
    align-items: center;
    opacity: 0.7;
    flex-shrink: 0;
  }

  .discord-button-primary {
    background: #5865f2;
    box-shadow: 0 2px 8px rgba(88,101,242,0.3);
  }

  .discord-button-secondary {
    background: #4e5058;
  }

  .discord-button-success {
    background: #248046;
    box-shadow: 0 2px 8px rgba(36,128,70,0.3);
  }

  .discord-button-destructive {
    background: #da373c;
    box-shadow: 0 2px 8px rgba(218,55,60,0.3);
  }

  .discord-button-link {
    background: #4e5058;
  }

  .discord-button-premium {
    background: linear-gradient(135deg, #e79232 0%, #c559de 100%);
    box-shadow: 0 2px 12px rgba(197,89,222,0.35);
  }

  /* â”€â”€ Action Row â”€â”€ */
  .discord-action-row-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 6px 0;
    align-items: center;
  }

  /* â”€â”€ Select Menu â”€â”€ */
  .discord-select-menu {
    position: relative;
    width: 100%;
    max-width: 520px;
    min-height: 42px;
    background: #1a1b1e;
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: var(--radius-sm, 6px);
    color: #b5bac1;
    cursor: pointer;
    font-family: 'Inter', Whitney, sans-serif;
    font-size: 14px;
    display: flex;
    align-items: center;
    padding: 0 14px;
    justify-content: space-between;
    box-sizing: border-box;
    user-select: none;
    margin: 6px 0;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }

  .discord-select-menu:hover {
    border-color: rgba(255,255,255,0.18);
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  }

  .discord-select-menu-placeholder {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    letter-spacing: 0.01em;
  }

  .discord-select-menu-arrow {
    display: flex;
    align-items: center;
    margin-left: 10px;
    flex-shrink: 0;
    color: #6d6f78;
    transition: color 0.15s ease;
  }

  .discord-select-menu:hover .discord-select-menu-arrow {
    color: #b5bac1;
  }

  .discord-select-menu-options {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background: #1e1f22;
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: var(--radius-sm, 6px);
    z-index: 100;
    max-height: 300px;
    overflow-y: auto;
    box-shadow: 0 8px 32px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4);
  }

  .discord-select-menu-option {
    padding: 10px 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    color: #dde1e6;
    font-size: 14px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    transition: background 0.12s ease;
  }

  .discord-select-menu-option:last-child {
    border-bottom: none;
  }

  .discord-select-menu-option:hover {
    background: rgba(88,101,242,0.18);
  }

  .discord-select-menu-option-label {
    font-weight: 500;
    letter-spacing: 0.01em;
  }

  .discord-select-menu-option-desc {
    color: #6d6f78;
    font-size: 11.5px;
    margin-top: 2px;
    letter-spacing: 0.01em;
  }

  /* â”€â”€ V2 File Attachment â”€â”€ */
  .dcv2-file {
    display: flex;
    align-items: center;
    gap: 14px;
    background: #1a1b1e;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: var(--radius-md, 10px);
    padding: 12px 16px;
    max-width: 520px;
    margin: 6px 0;
    box-sizing: border-box;
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
  }

  .dcv2-file:hover {
    background: #1e1f22;
    border-color: rgba(255,255,255,0.13);
    box-shadow: 0 2px 12px rgba(0,0,0,0.4);
  }

  .dcv2-file-icon {
    width: 32px;
    height: 40px;
    color: #949cf7;
    flex-shrink: 0;
  }

  .dcv2-file-info {
    display: flex;
    flex-direction: column;
    gap: 3px;
    flex: 1;
    min-width: 0;
  }

  .dcv2-file-name {
    color: #58a6ff;
    font-size: 14px;
    font-weight: 500;
    font-family: 'Inter', Whitney, sans-serif;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    letter-spacing: 0.01em;
  }

  .dcv2-file-size {
    color: #6d6f78;
    font-size: 12px;
    font-family: 'Inter', Whitney, sans-serif;
  }

  /* ── User Mention ── */
  .dc-user-mention {
    display: inline;
    cursor: pointer;
  }

  /* ── Profile Popup Card ── */
  .dc-profile-card {
    position: absolute;
    z-index: 9999;
    background: #232428;
    border-radius: 12px;
    width: 300px;
    box-shadow: 0 8px 48px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.5);
    overflow: hidden;
    display: none;
    font-family: 'Inter', Whitney, 'Helvetica Neue', Helvetica, Arial, sans-serif;
    border: 1px solid rgba(255,255,255,0.07);
  }

  .dc-profile-banner {
    height: 96px;
    background: #5865f2;
    background-size: cover;
    background-position: center;
  }

  .dc-profile-body {
    padding: 12px 16px 16px;
    position: relative;
  }

  .dc-profile-avatar-wrap {
    position: absolute;
    top: -40px;
    left: 16px;
  }

  .dc-profile-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 6px solid #232428;
    display: block;
    background: #36393f;
  }

  .dc-profile-name-row {
    margin-top: 52px;
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }

  .dc-profile-display-name {
    font-size: 20px;
    font-weight: 700;
    color: #f2f3f5;
    line-height: 1.2;
  }

  .dc-profile-bot-badge {
    display: inline-flex;
    align-items: center;
    background: #5865f2;
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.05em;
    border-radius: 4px;
    padding: 2px 6px;
    text-transform: uppercase;
  }

  .dc-profile-username {
    font-size: 13px;
    color: #b5bac1;
    margin-top: 3px;
  }

  .dc-profile-divider {
    height: 1px;
    background: rgba(255,255,255,0.06);
    margin: 10px 0;
  }

  .dc-profile-section-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #b5bac1;
    margin-bottom: 6px;
  }

  .dc-role-tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 4px;
    padding: 3px 8px;
    font-size: 12px;
    color: #f2f3f5;
  }

  .dc-role-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }
`;
