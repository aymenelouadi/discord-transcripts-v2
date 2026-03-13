import {
  DiscordBold,
  DiscordCodeBlock,
  DiscordCustomEmoji,
  DiscordInlineCode,
  DiscordItalic,
  DiscordMention,
  DiscordQuote,
  DiscordSpoiler,
  DiscordTime,
  DiscordUnderlined,
} from '@derockdev/discord-components-react';
import parse, { type RuleTypesExtended } from 'discord-markdown-parser';
import { ChannelType, type APIMessageComponentEmoji } from 'discord.js';
import React from 'react';
import type { ASTNode } from 'simple-markdown';
import { ASTNode as MessageASTNodes } from 'simple-markdown';
import type { SingleASTNode } from 'simple-markdown';
import type { RenderMessageContext } from '../';
import { parseDiscordEmoji } from '../../utils/utils';

export enum RenderType {
  EMBED,
  REPLY,
  NORMAL,
  WEBHOOK,
}

type RenderContentContext = RenderMessageContext & {
  type: RenderType;

  _internal?: {
    largeEmojis?: boolean;
  };
};

/**
 * Renders discord markdown content
 * @param content - The content to render
 * @param context - The context to render the content in
 * @returns
 */
export default function MessageContent({ content, context }: { content: string; context: RenderContentContext }) {
  if (context.type === RenderType.REPLY && content.length > 180) content = content.slice(0, 180) + '...';

  // parse the markdown
  const parsed = parse(
    content,
    context.type === RenderType.EMBED || context.type === RenderType.WEBHOOK ? 'extended' : 'normal'
  );

  // check if the parsed content is only emojis
  const isOnlyEmojis = parsed.every(
    (node) => ['emoji', 'twemoji'].includes(node.type) || (node.type === 'text' && node.content.trim().length === 0)
  );
  if (isOnlyEmojis) {
    // now check if there are less than or equal to 25 emojis
    const emojis = parsed.filter((node) => ['emoji', 'twemoji'].includes(node.type));
    if (emojis.length <= 25) {
      context._internal = {
        largeEmojis: true,
      };
    }
  }

  return <MessageASTNodes nodes={parsed} context={context} />;
}

// This function can probably be combined into the MessageSingleASTNode function
function MessageASTNodes({
  nodes,
  context,
}: {
  nodes: ASTNode;
  context: RenderContentContext;
}): React.JSX.Element {
  if (Array.isArray(nodes)) {
    return (
      <>
        {nodes.map((node, i) => (
          <MessageSingleASTNode node={node} context={context} key={i} />
        ))}
      </>
    );
  } else {
    return <MessageSingleASTNode node={nodes} context={context} />;
  }
}

export function MessageSingleASTNode({ node, context }: { node: SingleASTNode; context: RenderContentContext }) {
  if (!node) return null;

  const type = node.type as RuleTypesExtended;

  switch (type) {
    case 'text':
      return node.content;

    case 'link':
      return (
        <a href={node.target}>
          <MessageASTNodes nodes={node.content} context={context} />
        </a>
      );

    case 'url':
    case 'autolink':
      return (
        <a href={node.target} target="_blank" rel="noreferrer">
          <MessageASTNodes nodes={node.content} context={context} />
        </a>
      );

    case 'blockQuote':
      if (context.type === RenderType.REPLY) {
        return <MessageASTNodes nodes={node.content} context={context} />;
      }

      return (
        <DiscordQuote>
          <MessageASTNodes nodes={node.content} context={context} />
        </DiscordQuote>
      );

    case 'br':
    case 'newline':
      if (context.type === RenderType.REPLY) return ' ';
      return <br />;

    case 'channel': {
      const id = node.id as string;
      const channel = context.resolvedEntities?.channels.get(id) ?? null;

      return (
        <DiscordMention type={channel ? (channel.isDMBased() ? 'channel' : getChannelType(channel.type)) : 'channel'}>
          {channel ? (channel.isDMBased() ? 'DM Channel' : channel.name) : `<#${id}>`}
        </DiscordMention>
      );
    }

    case 'role': {
      const id = node.id as string;
      const role = context.resolvedEntities?.roles.get(id) ?? null;

      return (
        <DiscordMention type="role" color={context.type === RenderType.REPLY ? undefined : role?.hexColor}>
          {role ? role.name : `<@&${id}>`}
        </DiscordMention>
      );
    }

    case 'user': {
      const id = node.id as string;
      const user = context.resolvedEntities?.users.get(id) ?? null;

      return <DiscordMention type="user">{user ? (user.displayName ?? user.username) : `<@${id}>`}</DiscordMention>;
    }

    case 'here':
    case 'everyone':
      return (
        <DiscordMention type={'role'} highlight>
          {`@${type}`}
        </DiscordMention>
      );

    case 'codeBlock':
      if (context.type !== RenderType.REPLY) {
        return <DiscordCodeBlock language={node.lang} code={node.content} />;
      }
      return <DiscordInlineCode>{node.content}</DiscordInlineCode>;

    case 'inlineCode':
      return <DiscordInlineCode>{node.content}</DiscordInlineCode>;

    case 'em':
      return (
        <DiscordItalic>
          <MessageASTNodes nodes={node.content} context={context} />
        </DiscordItalic>
      );

    case 'strong':
      return (
        <DiscordBold>
          <MessageASTNodes nodes={node.content} context={context} />
        </DiscordBold>
      );

    case 'underline':
      return (
        <DiscordUnderlined>
          <MessageASTNodes nodes={node.content} context={context} />
        </DiscordUnderlined>
      );

    case 'strikethrough':
      return (
        <s>
          <MessageASTNodes nodes={node.content} context={context} />
        </s>
      );

    case 'emoticon':
      return typeof node.content === 'string' ? (
        node.content
      ) : (
        <MessageASTNodes nodes={node.content} context={context} />
      );

    case 'spoiler':
      return (
        <DiscordSpoiler>
          <MessageASTNodes nodes={node.content} context={context} />
        </DiscordSpoiler>
      );

    case 'emoji':
    case 'twemoji':
      return (
        <DiscordCustomEmoji
          name={node.name}
          url={parseDiscordEmoji(node as APIMessageComponentEmoji)}
          embedEmoji={context.type === RenderType.EMBED}
          largeEmoji={context._internal?.largeEmojis}
        />
      );

    case 'timestamp':
      return <DiscordTime timestamp={parseInt(node.timestamp) * 1000} format={node.format} />;

    case 'heading': {
      const level = (node.level as number) ?? 3;
      const headingStyles: Record<number, React.CSSProperties> = {
        1: { fontSize: '20px', fontWeight: 700, margin: '6px 0 4px', color: '#f2f3f5', lineHeight: 1.3 },
        2: { fontSize: '17px', fontWeight: 700, margin: '5px 0 3px', color: '#f2f3f5', lineHeight: 1.3 },
        3: { fontSize: '15px', fontWeight: 700, margin: '4px 0 2px', color: '#f2f3f5', lineHeight: 1.3 },
      };
      const style = headingStyles[level] ?? headingStyles[3];
      return (
        <div style={style}>
          <MessageASTNodes nodes={node.content} context={context} />
        </div>
      );
    }

    case 'list':
      return (
        node.ordered ? (
          <ol style={{ paddingLeft: '24px', margin: '4px 0' }}>
            {(node.items as ASTNode[]).map((item, i) => (
              <li key={i} style={{ margin: '2px 0' }}>
                <MessageASTNodes nodes={item} context={context} />
              </li>
            ))}
          </ol>
        ) : (
          <ul style={{ paddingLeft: '24px', margin: '4px 0', listStyleType: 'disc' }}>
            {(node.items as ASTNode[]).map((item, i) => (
              <li key={i} style={{ margin: '2px 0' }}>
                <MessageASTNodes nodes={item} context={context} />
              </li>
            ))}
          </ul>
        )
      );

    default: {
      console.log(`Unknown node type: ${type}`, node);
      return typeof node.content === 'string' ? (
        node.content
      ) : (
        <MessageASTNodes nodes={node.content} context={context} />
      );
    }
  }
}

export function getChannelType(channelType: ChannelType): 'channel' | 'voice' | 'thread' | 'forum' {
  switch (channelType) {
    case ChannelType.GuildCategory:
    case ChannelType.GuildAnnouncement:
    case ChannelType.GuildText:
    case ChannelType.DM:
    case ChannelType.GroupDM:
    case ChannelType.GuildDirectory:
    case ChannelType.GuildMedia:
      return 'channel';
    case ChannelType.GuildVoice:
    case ChannelType.GuildStageVoice:
      return 'voice';
    case ChannelType.PublicThread:
    case ChannelType.PrivateThread:
    case ChannelType.AnnouncementThread:
      return 'thread';
    case ChannelType.GuildForum:
      return 'forum';
    default:
      return 'channel';
  }
}
