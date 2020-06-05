import express, {Request} from "express";
import expressWS from "express-ws";
import startHooks, {ChatEvent} from "./Hooks";
import {HelixFollow} from "twitch";
import * as ws from 'ws';

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

function onFollow(follow: HelixFollow) {
    sockets = sockets.filter(socket => socket.readyState === 1);
    sockets.forEach(socket => {
        socket.send(JSON.stringify({
            type: "FOLLOW",
            payload: {
                user: follow.userDisplayName,
                time: follow.followDate
            }
        }));
    })
}

function onChat(chatEvent: ChatEvent) {
    sockets = sockets.filter(socket => socket.readyState === 1);
    sockets.forEach(socket => {
        socket.send(JSON.stringify({
            type: "CHAT",
            payload: {
                user: chatEvent.displayName,
                message: chatEvent.messageText,
                time: chatEvent.serverTimestamp
            }
        }));
    });
}


startHooks().then(callbacks => {
    callbacks.onFollow = onFollow;
    callbacks.onChat = onChat;
});
