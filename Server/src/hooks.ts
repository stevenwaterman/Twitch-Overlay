import TwitchClient, {HelixFollow, HelixUser} from "twitch";
import WebHookListener, {LegacyAdapter} from "twitch-webhooks";
import {Callbacks, ENV} from "./index";
import {randomName} from "./utils";

export async function initHooks(callbacks: Callbacks, twitchClient: TwitchClient, user: HelixUser, {}: ENV): Promise<Callbacks> {
    const portString: string | undefined = process.env.WEBHOOK_PORT;
    if (portString === undefined) throw("port null");
    const port = parseInt(portString);

    const listener = new WebHookListener(twitchClient, await LegacyAdapter.create({port}));

    setInterval(async () => {
      console.log("Starting Hooks");

      try {
        listener.unlisten();
      } catch {
        console.log("error unlistening");
      }

      await listener.subscribeToFollowsToUser(user, (follow: HelixFollow) => {
          console.log("Follow from ", follow.userDisplayName);
          callbacks.onFollow(follow);
      });
  
      await listener.listen();
  
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

      console.log("Hooks Started");
    }, 12 * 3600 * 1000);
    

    return callbacks;
}
