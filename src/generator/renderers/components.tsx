import { DiscordActionRow, DiscordAttachment, DiscordSpoiler } from '@derockdev/discord-components-react';
import {
  ComponentType,
  type ThumbnailComponent,
  type MessageActionRowComponent,
  type TopLevelComponent,
} from 'discord.js';
import React from 'react';
import { parseDiscordEmoji } from '../../utils/utils';
import DiscordSelectMenu from './components/Select Menu';
import DiscordContainer from './components/Container';
import DiscordSection from './components/section/Section';
import DiscordMediaGallery from './components/Media Gallery';
import DiscordSeparator from './components/Spacing';
import DiscordButton from './components/Button';
import DiscordThumbnail from './components/Thumbnail';
import MessageContent from './content';
import { RenderType } from './content';
import type { RenderMessageContext } from '..';
import { ButtonStyleMapping } from './components/styles';

export default function ComponentRow({
  component,
  id,
  context,
}: {
  component: TopLevelComponent;
  id: number;
  context: RenderMessageContext;
}) {
  switch (component.type) {
    case ComponentType.ActionRow:
      return (
        <DiscordActionRow key={id}>
          <>
            {component.components.map((nestedComponent, idx) => (
              <Component component={nestedComponent} id={idx} key={idx} />
            ))}
          </>
        </DiscordActionRow>
      );

    case ComponentType.Container: {
      // accentColor is available as a hex string when present
      const accentColor = (component as { accentColor?: number | null }).accentColor;
      const hexAccent = typeof accentColor === 'number'
        ? `#${accentColor.toString(16).padStart(6, '0')}`
        : null;
      const spoiler = (component as { spoiler?: boolean }).spoiler ?? false;

      return (
        <DiscordContainer key={id} accentColor={hexAccent} spoiler={spoiler}>
          <>
            {component.components.map((nestedComponent, idx) => (
              <ComponentRow component={nestedComponent} id={idx} key={idx} context={context} />
            ))}
          </>
        </DiscordContainer>
      );
    }

    case ComponentType.File: {
      const fileComp = component as { file: { url: string }; spoiler?: boolean; id?: number };
      const inner = (
        <DiscordAttachment
          type="file"
          slot="attachment"
          url={fileComp.file.url}
          alt="Discord Attachment"
        />
      );
      return fileComp.spoiler ? (
        <DiscordSpoiler key={id} slot="attachment">
          {inner}
        </DiscordSpoiler>
      ) : (
        <React.Fragment key={id}>{inner}</React.Fragment>
      );
    }

    case ComponentType.MediaGallery:
      return <DiscordMediaGallery component={component} key={id} />;

    case ComponentType.Section:
      return (
        <DiscordSection key={id} accessory={component.accessory} id={id}>
          {component.components.map((nestedComponent, idx) => (
            <ComponentRow component={nestedComponent} id={idx} key={idx} context={context} />
          ))}
        </DiscordSection>
      );

    case ComponentType.Separator:
      return (
        <DiscordSeparator
          key={id}
          spacing={component.spacing}
          divider={component.divider ?? false}
        />
      );

    case ComponentType.TextDisplay:
      return (
        <div key={id} className="dcv2-text-display">
          <MessageContent content={component.content} context={{ ...context, type: RenderType.NORMAL }} />
        </div>
      );

    default:
      return null;
  }
}

export function Component({
  component,
  id,
}: {
  component: MessageActionRowComponent | ThumbnailComponent;
  id: number;
}) {
  switch (component.type) {
    case ComponentType.Button: {
      const btnStyle = ButtonStyleMapping[component.style as keyof typeof ButtonStyleMapping] ?? 'secondary';
      const isDisabled = component.disabled ?? false;
      return (
        <DiscordButton
          key={id}
          type={btnStyle}
          url={component.url ?? undefined}
          emoji={component.emoji ? parseDiscordEmoji(component.emoji) : undefined}
          disabled={isDisabled}
        >
          {component.label}
        </DiscordButton>
      );
    }

    case ComponentType.StringSelect:
    case ComponentType.UserSelect:
    case ComponentType.RoleSelect:
    case ComponentType.MentionableSelect:
    case ComponentType.ChannelSelect:
      return <DiscordSelectMenu key={id} component={component} />;

    case ComponentType.Thumbnail: {
      const thumb = component as ThumbnailComponent & { description?: string | null };
      return <DiscordThumbnail key={id} url={thumb.media.url} description={thumb.description} />;
    }

    default:
      return undefined;
  }
}



