import TwitchClient, {HelixFollow, HelixUser} from "twitch";
import WebHookListener from "twitch-webhooks";
import LogLevel from "@d-fischer/logger/lib/LogLevel";
import {Callbacks, ENV} from "./index";

export async function initHooks(callbacks: Callbacks, twitchClient: TwitchClient, user: HelixUser, {}: ENV): Promise<Callbacks> {
    const portString: string | undefined = process.env.WEBHOOK_PORT;
    if (portString === undefined) throw("port null");
    const port = parseInt(portString);
    const listener = await WebHookListener.create(twitchClient, {port});

    await listener.subscribeToFollowsToUser(user, (follow: HelixFollow) => {
        console.log("Follow from ", follow.userDisplayName);
        callbacks.onFollow(follow);
    });

    listener.listen();

    console.log("Listening");

    callbacks.debugFollow = () => {
        console.log("Debug Follow");
        callbacks.onFollow(new HelixFollow({
            followed_at: new Date().toLocaleDateString(),
            from_id: user.id,
            from_name: user.displayName,
            to_id: user.id,
            to_name: user.displayName
        }, twitchClient));
    }

    return callbacks;
}
