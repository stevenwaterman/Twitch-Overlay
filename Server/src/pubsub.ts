import {Callbacks, ENV} from "./index";
import TwitchClient, {HelixUser} from "twitch";
import PubSubClient, {PubSubSubscriptionMessage} from "twitch-pubsub-client";

export type MessageInfo = {
    userName: string;
    userId: string;
    userDisplayName: string;
    time: Date;
}
export type ChatMessage = {
    message: string;
    emotes: ChatMessageEmote[];
}
export type ChatMessageEmote = {
    start: number;
    end: number;
    id: number;
}
export type SubDetail = {
    context: "sub" | "resub";
    subPlan: "Prime" | "1000" | "2000" | "3000";
    subMessage: ChatMessage | null;
    cumulativeMonths: number;
    streakMonths: number;
}
export type SubGiftDetail = {
    context: 'subgift' | 'anonsubgift';
    subPlan: "1000" | "2000" | "3000";
    recipientId: string;
    recipientUserName: string;
    recipientDisplayName: string;
    months: number;
}
export type SubEvent = MessageInfo & (SubDetail | SubGiftDetail);

export async function initPubSub(callbacks: Callbacks, twitchClient: TwitchClient, user: HelixUser, {}: ENV): Promise<Callbacks> {
    const client = new PubSubClient();
    await client.registerUserListener(twitchClient, user);
    await client.onSubscription(user, (subscription: PubSubSubscriptionMessage) => {
        console.log("Subscription from " + subscription.userDisplayName);
        const messageInfo: MessageInfo = {
            time: subscription.time,
            userId: subscription.isGift ? subscription.gifterId || "Anonymous" : subscription.userId,
            userName: subscription.isGift ? subscription.gifterName || "Anonymous" : subscription.userName,
            userDisplayName: subscription.isGift? subscription.gifterDisplayName || "Anonymous" : subscription.userDisplayName,
        }
        const subDetail: SubDetail | SubGiftDetail = subscription.isGift ? {
            context: subscription.isResub ? "resub" : "sub",
            subPlan: subscription.subPlan,
            cumulativeMonths: subscription.cumulativeMonths,
            streakMonths: subscription.streakMonths,
            subMessage: subscription.message
        } : {
            context: subscription.isAnonymous ? "anonsubgift" : "subgift",
            subPlan: subscription.subPlan as "1000" | "2000" | "3000",
            months: subscription.months,
            recipientDisplayName: subscription.userDisplayName,
            recipientId: subscription.userId,
            recipientUserName: subscription.userName,
        }
        const subEvent: SubEvent = {
            ...messageInfo,
            ...subDetail
        }

        callbacks.onSubscribe(subEvent);
    })

    callbacks.debugSubscribe = () => {
        console.log("Debug Subscribe");
        callbacks.onSubscribe({
            cumulativeMonths: 10,
            streakMonths: 5,
            context: "sub",
            subMessage: {
                emotes: [],
                message: "This is a test sub"
            },
            subPlan: "Prime",
            time: new Date(),
            userId: user.id,
            userName: user.name,
            userDisplayName: user.displayName
        })
    }

    return callbacks;
}
