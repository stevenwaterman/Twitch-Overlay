import ChatClient, {ParsedMessageEmotePart} from "twitch-chat-client";
import {Callbacks, ChatBadge, ChatEvent, ENV, TwitchEmote} from "./index";
import TwitchClient from "twitch";

export async function initChat(callbacks: Callbacks, twitchClient: TwitchClient, {channelName}: ENV): Promise<Callbacks> {
    const chatClient = ChatClient.forTwitchClient(twitchClient, {channels: [channelName]})

    chatClient.onPrivmsg(((channel, user, message, msg) => {
        console.log("Chat")

        const emotes: ParsedMessageEmotePart[] = msg.parseEmotes().filter(emote => emote.type === "emote") as any;
        const mappedEmotes: TwitchEmote[] = emotes.map(emote => ({
            code: emote.name,
            endIndex: emote.position + emote.length,
            id: emote.id,
            startIndex: emote.position
        }))

        const badges: ChatBadge[] = [];
        msg.userInfo.badges.forEach((value, key) => {
            badges.push({name: key, version: value})
        })

        const event: ChatEvent = {
            badges: badges,
            bits: msg.totalBits,
            color: msg.userInfo.color,
            displayName: msg.userInfo.displayName,
            emotes: mappedEmotes,
            isMod: msg.userInfo.isMod,
            messageText: msg.message.value,
            senderUserID: msg.userInfo.userId || "",
            senderUsername: msg.userInfo.userName
        }
        callbacks.onChat(event)
    }))

    chatClient.onHosted((channel, byChannel, auto, viewers) => {
        console.log("Hosted")
        callbacks.onHost({channel: byChannel, viewers: viewers || 0, auto})
    })

    chatClient.onRaid((channel, user, raidInfo, msg) => {
        console.log("Raided")
        callbacks.onRaid(raidInfo)
    })

    await chatClient.connect();

    callbacks.debugChat = () => {
        console.log("Debug Chat");
        chatClient.say(channelName, "This is an automatic debug message! itsami4Goldie");
    }

    callbacks.debugHost = () => {
        console.log("Debug Host");
        callbacks.onHost({
            channel: channelName, viewers: 10, auto: false
        })
    }

    callbacks.debugRaid = () => {
        console.log("Debug Raid");
        callbacks.onRaid({
            displayName: channelName, viewerCount: 15
        })
    }

    return callbacks;
}
