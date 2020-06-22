import express, {Request, Response} from "express";
import expressWS from "express-ws";
import {initHooks} from "./api";
import * as ws from 'ws';
import {initChat} from "./irc";
import fs from "fs";
import {PrivmsgMessage, UsernoticeMessage} from "dank-twitch-irc";
import {HelixFollow} from "twitch";

export type ENV = {
    channelName: string
    clientId: string,
    clientSecret: string,
    botUsername: string,
    botOauth: string
}

export type RaidEvent = {
    displayName: string,
    login: string,
    viewerCount: number,
    serverTimestamp: Date
}

export type Callbacks = {
    onFollow: (follow: HelixFollow) => void;
    onChat: (chat: PrivmsgMessage) => void;
    onRaid: (raid: RaidEvent) => void;
    debugFollow: () => void;
    debugChat: () => void;
    debugRaid: () => void;
}

function initCallbacks(): Callbacks {
    return {
        onFollow: () => { },
        onChat: () => { },
        onRaid: () => { },
        debugFollow: () => { },
        debugChat: () => { },
        debugRaid: () => { }
    }
}

function initEnv(): ENV {
    const secretsText: string = fs.readFileSync("secrets.json", "utf8");
    const {clientId, clientSecret, botUsername, botOauth}: {
        clientId: string | undefined,
        clientSecret: string | undefined,
        botUsername: string | undefined,
        botOauth: string | undefined
    } = JSON.parse(secretsText);
    if (clientId === undefined) throw new Error("clientId missing from secrets");
    if (clientSecret === undefined) throw new Error("clientSecret missing from secret");
    if (botUsername === undefined) throw new Error("botUserName missing from secret");
    if (botOauth === undefined) throw new Error("botOauth missing from secret");

    const channelName: string | undefined = process.env.CHANNEL_NAME;
    if (channelName === undefined) throw new Error("Env Variable CHANNEL_NAME not set");

    return {
        clientId,
        clientSecret,
        botUsername,
        botOauth,
        channelName
    }
}

async function initAll(): Promise<Callbacks> {
    const env = initEnv();
    let callbacks = initCallbacks();
    callbacks = await initHooks(callbacks, env);
    callbacks = await initChat(callbacks, env);
    return callbacks;
}

async function start() {
    const callbacks = await initAll();
    callbacks.onFollow = onFollow;
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
