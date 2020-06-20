import {ChatClient, PrivmsgMessage} from "dank-twitch-irc";
import {Callbacks, ENV} from "./index";

export async function initChat(callbacks: Callbacks, {channelName, botUsername, botOauth}: ENV): Promise<Callbacks> {
    const chatClient = new ChatClient({
        username: botUsername,
        password: `oauth:${botOauth}`
    });


    chatClient.on("ready", () => console.log("Successfully connected to chat"));
    chatClient.on("close", error => {
        if (error != null) {
            console.error("Client closed due to error", error);
        }
    });

    chatClient.on("PRIVMSG", (chatEvent: PrivmsgMessage) => {
        console.log(chatEvent);
        callbacks.onChat(chatEvent);
        console.log("Received Chat");
    });

    chatClient.connect();
    await chatClient.join(channelName);

    callbacks.debugChat = () => {
        console.log("Debug Chat");
        chatClient.say(channelName, "This is an automatic debug message!");
    }

    return callbacks;
}
