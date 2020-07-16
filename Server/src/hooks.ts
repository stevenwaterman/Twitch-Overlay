import TwitchClient, {HelixFollow, HelixUser} from "twitch";
import WebHookListener, {ConnectionAdapter, LegacyAdapter, SimpleAdapter} from "twitch-webhooks";
import LogLevel from "@d-fischer/logger/lib/LogLevel";
import {Callbacks, ENV} from "./index";
import {randomName} from "./utils";

export async function initHooks(callbacks: Callbacks, twitchClient: TwitchClient, user: HelixUser, {}: ENV): Promise<Callbacks> {
    const portString: string | undefined = process.env.WEBHOOK_PORT;
    if (portString === undefined) throw("port null");
    const port = parseInt(portString);

    const listener = new WebHookListener(twitchClient, await LegacyAdapter.create({port}));

    await listener.subscribeToFollowsToUser(user, (follow: HelixFollow) => {
        console.log("Follow from ", follow.userDisplayName);
        callbacks.onFollow(follow);
    });

    await listener.listen();

    console.log("Listening");

    callbacks.debugFollow = () => {
        console.log("Debug Follow");
        callbacks.onFollow(new HelixFollow({
            followed_at: new Date().toLocaleDateString(),
            from_id: randomName(),
            from_name: randomName(),
            to_id: randomName(),
            to_name: randomName()
        }, twitchClient));
    }

    return callbacks;
}
