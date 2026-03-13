import { DiscordHeader, DiscordMessages as DiscordMessagesComponent } from '@derockdev/discord-components-react';
import { ChannelType } from 'discord.js';
import React from 'react';
import type { RenderMessageContext } from '.';
import MessageContent, { RenderType } from './renderers/content';
import DiscordMessage from './renderers/message';
import { globalStyles } from './renderers/components/styles';

/**
 * The core transcript component.
 * Expects window.$discordMessage.profiles to be set for profile information.
 *
 * @param props Messages, channel details, callbacks, etc.
 * @returns
 */
export default function DiscordMessages({ messages, channel, callbacks, ...options }: RenderMessageContext) {
  return (
    <DiscordMessagesComponent style={{ minHeight: '100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <DiscordHeader
        guild={channel.isDMBased() ? 'Direct Messages' : channel.guild.name}
        channel={
          channel.isDMBased()
            ? channel.type === ChannelType.DM
              ? (channel.recipient?.tag ?? 'Unknown Recipient')
              : 'Unknown Recipient'
            : channel.name
        }
        icon={channel.isDMBased() ? undefined : (channel.guild.iconURL({ size: 128 }) ?? undefined)}
      >
        {channel.isThread() ? (
          `Thread channel in ${channel.parent?.name ?? 'Unknown Channel'}`
        ) : channel.isDMBased() ? (
          `Direct Messages`
        ) : channel.isVoiceBased() ? (
          `Voice Text Channel for ${channel.name}`
        ) : channel.type === ChannelType.GuildCategory ? (
          `Category Channel`
        ) : 'topic' in channel && channel.topic ? (
          <MessageContent
            content={channel.topic}
            context={{ messages, channel, callbacks, type: RenderType.REPLY, ...options }}
          />
        ) : (
          `This is the start of #${channel.name} channel.`
        )}
      </DiscordHeader>
      {/* body */}
      {messages.map((message) => (
        <DiscordMessage message={message} context={{ messages, channel, callbacks, ...options }} key={message.id} />
      ))}
      {/* footer */}
      <div className="transcript-footer">
        <div className="transcript-footer-stats">
          <span className="dot" />
          {options.footerText
            ? options.footerText
                .replaceAll('{number}', messages.length.toString())
                .replaceAll('{s}', messages.length > 1 ? 's' : '')
            : `${messages.length} message${messages.length > 1 ? 's' : ''} exported`}
        </div>
        {options.poweredBy ? (
          <div className="transcript-footer-brand">
            Generated with{' '}
            <a href="https://github.com/aymenelouadi/discord-html-transcripts-components-v2">
              discord-html-transcripts-components-v2
            </a>
          </div>
        ) : null}
      </div>
    </DiscordMessagesComponent>
  );
}
