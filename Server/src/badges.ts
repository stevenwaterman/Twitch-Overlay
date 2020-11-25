import TwitchClient, {ChatBadgeList, HelixUser} from "twitch";

export async function getBadges(twitchClient: TwitchClient, user: HelixUser): Promise<Record<string, string>> {
    const badges: ChatBadgeList = await twitchClient.badges.getChannelBadges(user, true);
    const output: Record<string, string> = {};

    badges.badgeSetNames.forEach(name => {
        const set = badges.getBadgeSet(name);
        set.versionNames.forEach(version => {
            const badge = set.getVersion(version);
            output[`${name}-${version}`] = badge.getImageUrl(4);
        })
    });

    return output;
}