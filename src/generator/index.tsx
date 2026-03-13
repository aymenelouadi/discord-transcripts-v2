import { type Awaitable, type Channel, type Message, type Role, type User } from 'discord.js';
import { prerenderToNodeStream } from 'react-dom/static';
import React from 'react';
import { buildProfiles } from '../utils/buildProfiles';
import { revealSpoiler, scrollToMessage } from '../static/client';
import { readFileSync } from 'fs';
import path from 'path';
import { renderToString } from '@derockdev/discord-components-core/hydrate';
import DiscordMessages from './transcript';
import type { ResolveImageCallback } from '../downloader/images';
import { streamToString } from '../utils/utils';

// read the package.json file and get the @derockdev/discord-components-core version
let discordComponentsVersion = '^3.6.1';

try {
  const packagePath = path.join(__dirname, '..', '..', 'package.json');
  const packageJSON = JSON.parse(readFileSync(packagePath, 'utf8'));
  discordComponentsVersion = packageJSON.dependencies['@derockdev/discord-components-core'] ?? discordComponentsVersion;
  // eslint-disable-next-line no-empty
} catch {} // ignore errors

export type RenderMessageContext = {
  messages: Message[];
  channel: Channel;

  callbacks: {
    resolveImageSrc: ResolveImageCallback;
    resolveChannel: (channelId: string) => Awaitable<Channel | null>;
    resolveUser: (userId: string) => Awaitable<User | null>;
    resolveRole: (roleId: string) => Awaitable<Role | null>;
  };

  poweredBy?: boolean;
  footerText?: string;
  saveImages: boolean;
  favicon: 'guild' | string;
  hydrate: boolean;
};

export default async function render({ messages, channel, callbacks, ...options }: RenderMessageContext) {
  const profiles = buildProfiles(messages);

  const { prelude } = await prerenderToNodeStream(
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* favicon */}
        <link
          rel="icon"
          type="image/png"
          href={
            options.favicon === 'guild'
              ? channel.isDMBased()
                ? undefined
                : (channel.guild.iconURL({ size: 16, extension: 'png' }) ?? undefined)
              : options.favicon
          }
        />

        {/* title */}
        <title>{channel.isDMBased() ? 'Direct Messages' : channel.name}</title>

        {/* Inter font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Global page styles */}
        <style dangerouslySetInnerHTML={{ __html: `
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

          :root {
            --page-bg:        #0b0c0e;
            --page-surface:   #111214;
            --page-border:    rgba(255,255,255,0.06);
            --text-primary:   #f2f3f5;
            --text-secondary: #b5bac1;
            --text-muted:     #6d6f78;
            --accent:         #5865f2;
            --accent-hover:   #4752c4;
            --radius-sm:      6px;
            --radius-md:      10px;
            --radius-lg:      16px;
            --shadow-sm:      0 1px 4px rgba(0,0,0,0.5);
            --shadow-md:      0 4px 16px rgba(0,0,0,0.6);
            --shadow-lg:      0 12px 40px rgba(0,0,0,0.7);
            --anim:           0.18s cubic-bezier(0.4,0,0.2,1);
          }

          html {
            scroll-behavior: smooth;
          }

          body {
            background: var(--page-bg);
            color: var(--text-primary);
            font-family: 'Inter', 'Whitney', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            min-height: 100vh;
          }

          /* ── Scrollbar ── */
          ::-webkit-scrollbar { width: 8px; height: 8px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.1);
            border-radius: 99px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(255,255,255,0.18);
          }
          * { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.1) transparent; }

          /* ── Page container ── */
          discord-messages {
            font-family: 'Inter', 'Whitney', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
          }

          /* ── Footer ── */
          .transcript-footer {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            padding: 28px 16px 36px;
            text-align: center;
            border-top: 1px solid var(--page-border);
            margin-top: 8px;
            background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.25));
          }

          .transcript-footer-stats {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(255,255,255,0.05);
            border: 1px solid var(--page-border);
            border-radius: 99px;
            padding: 5px 14px;
            font-size: 12px;
            font-weight: 500;
            color: var(--text-secondary);
            letter-spacing: 0.02em;
          }

          .transcript-footer-stats .dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--accent);
            box-shadow: 0 0 6px var(--accent);
            flex-shrink: 0;
          }

          .transcript-footer-brand {
            font-size: 11px;
            color: var(--text-muted);
            line-height: 1.4;
          }

          .transcript-footer-brand a {
            color: var(--accent);
            text-decoration: none;
            font-weight: 500;
            transition: color var(--anim);
          }

          .transcript-footer-brand a:hover {
            color: var(--accent-hover);
            text-decoration: underline;
          }
        ` }} />

        {/* message reference handler */}
        <script
          dangerouslySetInnerHTML={{
            __html: scrollToMessage,
          }}
        />

        {!options.hydrate && (
          <>
            {/* profiles */}
            <script
              dangerouslySetInnerHTML={{
                __html: `window.$discordMessage={profiles:${JSON.stringify(await profiles)}}`,
              }}
            ></script>
            {/* component library */}
            <script
              type="module"
              src={`https://cdn.jsdelivr.net/npm/@derockdev/discord-components-core@${discordComponentsVersion}/dist/derockdev-discord-components-core/derockdev-discord-components-core.esm.js`}
            ></script>
          </>
        )}
      </head>

      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          background: 'var(--page-bg)',
        }}
      >
        <DiscordMessages messages={messages} channel={channel} callbacks={callbacks} {...options} />
      </body>

      {/* Make sure the script runs after the DOM has loaded */}
      {options.hydrate && <script dangerouslySetInnerHTML={{ __html: revealSpoiler }}></script>}
    </html>
  );

  const markup = await streamToString(prelude);

  if (options.hydrate) {
    const result = await renderToString(markup, {
      beforeHydrate: async (document) => {
        document.defaultView.$discordMessage = {
          profiles: await profiles,
        };
      },
    });

    return result.html;
  }

  return markup;
}
