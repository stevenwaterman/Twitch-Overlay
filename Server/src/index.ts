import express, {Request, Response} from "express";
import expressWS from "express-ws";
import {initHooks} from "./hooks";
import * as ws from 'ws';
import {initChat} from "./chat";
import fs from "fs";
import TwitchClient, {HelixFollow, HelixUser} from "twitch";
import {BitsEvent, initPubSub, SubEvent} from "./pubsub";
import {ChatRaidInfo} from "twitch-chat-client";
import {getBadges} from "./badges";

export type ENV = {
    channelName: string
    clientId: string,
    accessToken: string,
    refreshToken: string
}

export type HostEvent = {
    channel: string,
    viewers: number,
    auto: boolean
}

export type ChatBadge = {
    name: string;
    version: string;
}

export type TwitchEmote = {
    id: string;
    startIndex: number;
    endIndex: number;
    code: string;
}

export type ChatEvent = {
    messageText: string;
    senderUsername: string;
    senderUserID: string;
    badges: Array<ChatBadge>;
    bits: number | undefined;
    color: string | undefined;
    displayName: string;
    emotes: Array<TwitchEmote>;
    isMod: boolean;
};

export type Callbacks = {
    onFollow: (follow: HelixFollow) => void;
    onSubscribe: (subscriptionEvent: SubEvent) => void;
    onBits: (bitsEvent: BitsEvent) => void;
    onChat: (chat: ChatEvent) => void;
    onHost: (host: HostEvent) => void;
    onRaid: (raid: ChatRaidInfo) => void;
    onParty: () => void;
    onBadges: (badges: Record<string, string>) => void;
    debugFollow: () => void;
    debugSubscribe: () => void;
    debugGiftSubscribe: () => void;
    debugBits: () => void;
    debugChat: () => void;
    debugHost: () => void;
    debugRaid: () => void;
}

function initCallbacks(): Callbacks {
    return {} as any;
}

function initEnv(): ENV {
    const secretsText: string = fs.readFileSync("secrets.json", "utf8");
    const {clientId, accessToken, refreshToken}: {
        clientId: string | undefined,
        accessToken: string | undefined,
        refreshToken: string | undefined
    } = JSON.parse(secretsText);
    if (clientId === undefined) throw new Error("clientId missing from secrets");
    if (accessToken === undefined) throw new Error("accessToken missing from secret");
    if (refreshToken === undefined) throw new Error("refreshToken missing from secret");

    const channelName: string | undefined = process.env.CHANNEL_NAME;
    if (channelName === undefined) throw new Error("Env Variable CHANNEL_NAME not set");

    return {
        clientId,
        accessToken,
        refreshToken,
        channelName
    }
}

let badges: Record<string, string> = {};

async function initAll(): Promise<Callbacks> {
    const env = initEnv();

    console.log("Try auth");
    const twitchClient = TwitchClient.withCredentials(env.clientId, env.accessToken, [
        "user_read", "user_blocks_edit", "user_blocks_read", "user_follows_edit", "channel_read", "channel_editor", "channel_commercial", "channel_stream", "channel_subscriptions", "user_subscriptions", "channel_check_subscription", "chat_login", "channel_feed_read", "channel_feed_edit", "collections_edit", "communities_edit", "communities_moderate", "viewing_activity_read", "openid", "analytics:read:extensions", "user:edit", "user:read:email", "clips:edit", "bits:read", "analytics:read:games", "user:edit:broadcast", "user:read:broadcast", "chat:read", "chat:edit", "channel:moderate", "channel:read:subscriptions", "whispers:read", "whispers:edit", "moderation:read", "channel:read:redemptions", "channel:edit:commercial"
    ]);
    console.log("Auth success");

    const user: HelixUser | null = await twitchClient.helix.users.getUserByName(env.channelName);
    if (user === null) {
        throw("user null");
    }

    const badgesRequest = getBadges(twitchClient, user);

    let callbacks = initCallbacks();
    console.log("Init Hooks");
    callbacks = await initHooks(callbacks, twitchClient, user, env);
    console.log("Init Hooks Done");

    console.log("Init Pubsub");
    callbacks = await initPubSub(callbacks, twitchClient, user, env);
    console.log("Init Pubsub done");

    console.log("Init Chat");
    callbacks = await initChat(callbacks, twitchClient, env);
    console.log("Init Chat done");

    badges = await badgesRequest;

    return callbacks;
}

async function start() {
    const callbacks: Callbacks = await initAll();
    callbacks.onFollow = onFollow;
    callbacks.onSubscribe = (event) => send("SUBSCRIBE", event);
    callbacks.onBits = (event) => send("BITS", event);
    callbacks.onChat = (event) => send("CHAT", event);
    callbacks.onHost = (event) => send("HOST", event);
    callbacks.onRaid = (event) => send("RAID", event);
    callbacks.onParty = () => send("PARTY", {});
    callbacks.onBadges = (badges) => send("BADGES", badges);

    const _app = express();
    const {app} = expressWS(_app);

    let sockets: ws[] = [];

    app.ws("/events", (ws: ws, req: Request) => {
        sockets.push(ws);
        callbacks.onBadges(badges);
        ws.onclose = () => sockets.filter(it => it !== ws);
    });

    app.listen(8080, () => {
        console.log("Started server");
    });

    app.post("/debug/follow", (req: Request, res: Response) => {
        callbacks.debugFollow();
        res.status(200);
        res.send("Complete");
    });
    app.post("/debug/chat", (req: Request, res: Response) => {
        callbacks.debugChat();
        res.status(200);
        res.send("Complete");
    });
    app.post("/debug/host", (req: Request, res: Response) => {
        callbacks.debugHost();
        res.status(200);
        res.send("Complete");
    });
    app.post("/debug/raid", (req: Request, res: Response) => {
        callbacks.debugRaid();
        res.status(200);
        res.send("Complete");
    });
    app.post("/debug/sub", (req: Request, res: Response) => {
        callbacks.debugSubscribe();
        res.status(200);
        res.send("Complete");
    });
    app.post("/debug/giftsub", (req: Request, res: Response) => {
        callbacks.debugGiftSubscribe();
        res.status(200);
        res.send("Complete");
    });
    app.post("/debug/bits", (req: Request, res: Response) => {
        callbacks.debugBits();
        res.status(200);
        res.send("Complete");
    });
    app.post("/debug/party", (req: Request, res: Response) => {
      callbacks.onParty();
      res.status(200);
      res.send("Complete");
    });

    function send(type: string, payload: any) {
        sockets = sockets.filter(socket => socket.readyState === 1);
        sockets.forEach(socket => {
            socket.send(JSON.stringify({
                type,
                payload
            }));
        })
    }

    function onFollow(follow: HelixFollow) {
        send("FOLLOW", {
            userDisplayName: follow.userDisplayName,
            userId: follow.userId,
            followedUserDisplayName: follow.followedUserDisplayName,
            followedUserId: follow.followedUserId,
            followDate: follow.followDate
        });
    }
}

start();
