import { type GuildMember, type Message, type User, UserFlags } from 'discord.js';

export type Profile = {
  author: string; // display name / nickname
  username?: string; // raw username (e.g. john_doe)
  avatar?: string; // avatar URL
  banner?: string; // banner image URL (if available)
  bannerColor?: string; // accent color as hex (e.g. #5865f2)
  roleColor?: string; // highest role color
  roleIcon?: string; // highest role icon
  roleName?: string; // highest hoisted role name

  bot?: boolean; // is the author a bot
  verified?: boolean; // is the author verified
};

export async function buildProfiles(messages: Message[]) {
  const profiles: Record<string, Profile> = {};

  // loop through messages
  for (const message of messages) {
    // add all users
    const author = message.author;
    if (!profiles[author.id]) {
      // add profile
      profiles[author.id] = buildProfile(message.member, author);
    }

    // add interaction users
    if (message.interaction) {
      const user = message.interaction.user;
      if (!profiles[user.id]) {
        profiles[user.id] = buildProfile(null, user);
      }
    }

    // threads
    if (message.thread && message.thread.lastMessage) {
      profiles[message.thread.lastMessage.author.id] = buildProfile(
        message.thread.lastMessage.member,
        message.thread.lastMessage.author
      );
    }
  }

  // return as a JSON
  return profiles;
}

function buildProfile(member: GuildMember | null, author: User) {
  const accentColor = author.accentColor;
  const bannerColor = accentColor != null
    ? `#${accentColor.toString(16).padStart(6, '0')}`
    : undefined;
  return {
    author: member?.nickname ?? author.displayName ?? author.username,
    username: author.username,
    avatar: member?.displayAvatarURL({ size: 128 }) ?? author.displayAvatarURL({ size: 128 }),
    banner: author.bannerURL({ size: 600 }) ?? undefined,
    bannerColor,
    roleColor: member?.displayHexColor,
    roleIcon: member?.roles.icon?.iconURL() ?? undefined,
    roleName: member?.roles.hoist?.name ?? undefined,
    bot: author.bot,
    verified: author.flags?.has(UserFlags.VerifiedBot),
  };
}
