import TwitchClient, {HelixFollow, HelixUser} from "twitch";
import WebHookListener, {LegacyAdapter} from "twitch-webhooks";
import {Callbacks, ENV} from "./index";
import {randomName} from "./utils";
import FollowsToUserSubscription from "twitch-webhooks/lib/Subscriptions/FollowsToUserSubscription";

export async function initHooks(callbacks: Callbacks, twitchClient: TwitchClient, user: HelixUser, {}: ENV): Promise<Callbacks> {
    const portString: string | undefined = process.env.WEBHOOK_PORT;
    if (portString === undefined) throw("port null");
    const port = parseInt(portString);

    const listener = new WebHookListener(twitchClient, await LegacyAdapter.create({port}));
    await listener.listen()

    let subscription: FollowsToUserSubscription = await startHooks(listener, user, callbacks);
    setInterval(async () => {
        await subscription.stop();
        subscription = await startHooks(listener, user, callbacks);
    }, 3600 * 1000); // Hourly

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

async function startHooks(listener: WebHookListener, user: HelixUser, callbacks: Callbacks): Promise<FollowsToUserSubscription> {
    return await listener.subscribeToFollowsToUser(user, (follow: HelixFollow) => {
        console.log("Follow from ", follow.userDisplayName);
        callbacks.onFollow(follow);
    });
}
