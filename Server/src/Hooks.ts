import TwitchClient, {HelixFollow} from "twitch";
import WebHookListener from "twitch-webhooks";
import LogLevel from "@d-fischer/logger/lib/LogLevel";
import * as fs from "fs";
import {ChatClient} from "dank-twitch-irc";

export type ChatEvent = {
    displayName: string;
    messageText: string;
    serverTimestamp: Date;
}

export type Callbacks = {
    onFollow: (follow: HelixFollow) => void;
    onChat: (chat: ChatEvent) => void;
}

export default async function startHooks() {
    const callbacks: Callbacks = {
        onFollow: () => {
        },
        onChat: () => {
        }
    }


    const secretsText: string = fs.readFileSync("secrets.json", "utf8");
    const {clientId, clientSecret} = JSON.parse(secretsText);

    console.log("Try auth");
    const twitchClient = TwitchClient.withClientCredentials(clientId, clientSecret, {
        logLevel: LogLevel.TRACE
    });
    console.log("Auth success");

    const channelName: string | undefined = process.env.CHANNEL_NAME;
    if (channelName === undefined) throw new Error("Env Variable CHANNEL_NAME not set");
    const user = await twitchClient.kraken.users.getUserByName(channelName);

    if (user === null) {
        throw("user null");
    }

    let followers = await twitchClient.helix.users.getFollows({
        followedUser: user
    }).then(res => res.total);

    const listener = await WebHookListener.create(twitchClient, {port: process.env.WEBHOOK_PORT});


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


    const chatClient = new ChatClient();
    chatClient.on("ready", () => console.log("Successfully connected to chat"));
    chatClient.on("close", error => {
        if (error != null) {
            console.error("Client closed due to error", error);
        }
    });

    chatClient.on("PRIVMSG", (chatEvent: ChatEvent) => {
        callbacks.onChat(chatEvent);
        console.log("Received Chat");
    });

    chatClient.connect();
    await chatClient.join(channelName);


    console.log("Listening");


    return callbacks;
}

