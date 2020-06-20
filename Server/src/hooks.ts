import TwitchClient, {HelixFollow} from "twitch";
import WebHookListener from "twitch-webhooks";
import LogLevel from "@d-fischer/logger/lib/LogLevel";
import * as fs from "fs";
import {Callbacks, ENV} from "./index";

export async function initHooks(callbacks: Callbacks, {channelName, clientId, clientSecret}: ENV): Promise<Callbacks> {
    console.log("Try auth");
    const twitchClient = TwitchClient.withClientCredentials(clientId, clientSecret, {
        logLevel: LogLevel.TRACE
    });
    console.log("Auth success");

    const user = await twitchClient.kraken.users.getUserByName(channelName);

    if (user === null) {
        throw("user null");
    }

    let followers = await twitchClient.helix.users.getFollows({
        followedUser: user
    }).then(res => res.total);

    const portString: string | undefined = process.env.WEBHOOK_PORT;
    if(portString === undefined) throw("port null");
    const port = parseInt(portString);
    const listener = await WebHookListener.create(twitchClient, {port});

    const follows = await listener.subscribeToFollowsToUser(user, (follow: HelixFollow) => {
        console.log("Follow from ", follow.userDisplayName);
        callbacks.onFollow(follow);
        followers++;
        fs.writeFile("follows.txt", (50 - followers) + " followers until Goldie emote!", err => {
            if (err) {
                console.error(err);
            }
        });
    });

    listener.listen();

    console.log("Listening");

    callbacks.debugFollow = () => {
        console.log("Debug Follow");
        callbacks.onFollow({
            userDisplayName: "Debug " + Math.random(),
            followDate: new Date()
        });
    }

    return callbacks;
}
