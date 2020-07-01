import express, {Request, Response} from "express";
import expressWS from "express-ws";
import {initHooks} from "./hooks";
import * as ws from 'ws';
import {initChat} from "./irc";
import fs from "fs";
import {PrivmsgMessage, UsernoticeMessage} from "dank-twitch-irc";
import TwitchClient, {HelixFollow, HelixSubscriptionEvent, HelixUser} from "twitch";
import LogLevel from "@d-fischer/logger/lib/LogLevel";
import {BitsEvent, initPubSub, SubEvent} from "./pubsub";
import {PubSubSubscriptionMessage} from "twitch-pubsub-client";

export type ENV = {
    channelName: string
    clientId: string,
    accessToken: string,
    refreshToken: string
}

export type RaidEvent = {
    displayName: string,
    login: string,
    viewerCount: number,
    serverTimestamp: Date
}

export type Callbacks = {
    onFollow: (follow: HelixFollow) => void;
    onSubscribe: (subscriptionEvent: SubEvent) => void;
    onBits: (bitsEvent: BitsEvent) => void;
    onChat: (chat: PrivmsgMessage) => void;
    onRaid: (raid: RaidEvent) => void;
    debugFollow: () => void;
    debugSubscribe: () => void;
    debugGiftSubscribe: () => void;
    debugBits: () => void;
    debugChat: () => void;
    debugRaid: () => void;
}

function initCallbacks(): Callbacks {
    return {
        onFollow: () => {
        },
        onSubscribe: () => {
        },
        onBits: () => {
        },
        onChat: () => {
        },
        onRaid: () => {
        },
        debugFollow: () => {
        },
        debugSubscribe: () => {
        },
        debugBits: () => {
        },
        debugGiftSubscribe: () => {
        },
        debugChat: () => {
        },
        debugRaid: () => {
        }
    }
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

async function initAll(): Promise<Callbacks> {
    const env = initEnv();

    console.log("Try auth");
    const twitchClient = TwitchClient.withCredentials(env.clientId, env.accessToken, [
        "user_read", "user_blocks_edit", "user_blocks_read", "user_follows_edit", "channel_read", "channel_editor", "channel_commercial", "channel_stream", "channel_subscriptions", "user_subscriptions", "channel_check_subscription", "chat_login", "channel_feed_read", "channel_feed_edit", "collections_edit", "communities_edit", "communities_moderate", "viewing_activity_read", "openid", "analytics:read:extensions", "user:edit", "user:read:email", "clips:edit", "bits:read", "analytics:read:games", "user:edit:broadcast", "user:read:broadcast", "chat:read", "chat:edit", "channel:moderate", "channel:read:subscriptions", "whispers:read", "whispers:edit", "moderation:read", "channel:read:redemptions", "channel:edit:commercial"
    ], undefined, {
        logLevel: LogLevel.TRACE
    });
    console.log("Auth success");

    const user: HelixUser | null = await twitchClient.helix.users.getUserByName(env.channelName);
    if (user === null) {
        throw("user null");
    }

    let callbacks = initCallbacks();
    callbacks = await initHooks(callbacks, twitchClient, user, env);
    callbacks = await initPubSub(callbacks, twitchClient, user, env);
    callbacks = await initChat(callbacks, env);
    return callbacks;
}

async function start() {
    const callbacks = await initAll();
    callbacks.onFollow = onFollow;
    callbacks.onSubscribe = onSubscribe;
    callbacks.onBits = onBits;
    callbacks.onChat = onChat;
    callbacks.onRaid = onRaid;

    const _app = express();
    const {app} = expressWS(_app);

    let sockets: ws[] = [];

    app.ws("/events", (ws: ws, req: Request) => {
        sockets.push(ws);
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
    app.post("/debug/raid", (req: Request, res: Response) => {
        callbacks.debugRaid();
        res.status(200);
        res.send("Complete");
    })
    app.post("/debug/sub", (req: Request, res: Response) => {
        callbacks.debugSubscribe();
        res.status(200);
        res.send("Complete");
    })
    app.post("/debug/giftsub", (req: Request, res: Response) => {
        callbacks.debugGiftSubscribe();
        res.status(200);
        res.send("Complete");
    })
    app.post("/debug/bits", (req: Request, res: Response) => {
        callbacks.debugBits();
        res.status(200);
        res.send("Complete");
    })

    function onFollow(follow: HelixFollow) {
        sockets = sockets.filter(socket => socket.readyState === 1);
        sockets.forEach(socket => {
            socket.send(JSON.stringify({
                type: "FOLLOW",
                payload: {
                    userDisplayName: follow.userDisplayName,
                    userId: follow.userId,
                    followedUserDisplayName: follow.followedUserDisplayName,
                    followedUserId: follow.followedUserId,
                    followDate: follow.followDate
                }
            }));
        })
    }

    function onSubscribe(subscriptionEvent: SubEvent) {
        sockets = sockets.filter(socket => socket.readyState === 1);
        sockets.forEach(socket => {
            socket.send(JSON.stringify({
                type: "SUBSCRIBE",
                payload: subscriptionEvent
            }));
        });
    }

    function onBits(bitsEvent: BitsEvent) {
        sockets = sockets.filter(socket => socket.readyState === 1);
        sockets.forEach(socket => {
            socket.send(JSON.stringify({
                type: "BITS",
                payload: bitsEvent
            }));
        });
    }

    function onChat(chatEvent: PrivmsgMessage) {
        sockets = sockets.filter(socket => socket.readyState === 1);
        sockets.forEach(socket => {
            socket.send(JSON.stringify({
                type: "CHAT",
                payload: chatEvent
            }));
        });
    }

    function onRaid(raidEvent: RaidEvent) {
        sockets = sockets.filter(socket => socket.readyState === 1);
        sockets.forEach(socket => {
            socket.send(JSON.stringify({
                type: "RAID",
                payload: raidEvent
            }));
        });
    }
}

start();
