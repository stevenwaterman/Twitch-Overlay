import {ChatClient, PrivmsgMessage, UsernoticeMessage} from "dank-twitch-irc";
import {Callbacks, ENV} from "./index";

export async function initChat(callbacks: Callbacks, {channelName, accessToken}: ENV): Promise<Callbacks> {
    const chatClient = new ChatClient({
        username: channelName,
        password: `oauth:${accessToken}`
    });

    chatClient.on("ready", () => console.log("Successfully connected to chat"));
    chatClient.on("close", error => {
        if (error != null) {
            console.error("Client closed due to error", error);
        }
    });

    chatClient.on("PRIVMSG", (chatEvent: PrivmsgMessage) => {
        callbacks.onChat(chatEvent);
        console.log("Received Chat");
    });


    chatClient.on("USERNOTICE", (usernoticeEvent: UsernoticeMessage) => {
        if (usernoticeEvent.isRaid()) {
            console.log("Received Raid");
            callbacks.onRaid({
                ...usernoticeEvent.eventParams,
                serverTimestamp: usernoticeEvent.serverTimestamp
            });
        }
    })

    chatClient.connect();
    await chatClient.join(channelName);

    callbacks.debugChat = () => {
        console.log("Debug Chat");
        chatClient.say(channelName, "This is an automatic debug message! itsami4Goldie");
    }

    callbacks.debugRaid = () => {
        console.log("Debug Raid");
        callbacks.onRaid({
            displayName: channelName, login: channelName, serverTimestamp: new Date(), viewerCount: 15
        })
    }

    return callbacks;
}
