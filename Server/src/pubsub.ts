import {Callbacks, ENV} from "./index";
import TwitchClient, {HelixUser} from "twitch";
import PubSubClient, {PubSubBitsMessage, PubSubSubscriptionMessage, PubSubRedemptionMessage} from "twitch-pubsub-client";
import {randomName} from "./utils";

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

export type BitsEvent = {
    bits: number,
    totalBits: number,
    isAnonymous: boolean,
    message: string,
    userId: string,
    userName: string
}

export async function initPubSub(callbacks: Callbacks, twitchClient: TwitchClient, user: HelixUser, {}: ENV): Promise<Callbacks> {
    const client = new PubSubClient();
    await client.registerUserListener(twitchClient, user);

    await client.onSubscription(user, (subscription: PubSubSubscriptionMessage) => {
        console.log("Subscription from " + subscription.userDisplayName);
        const messageInfo: MessageInfo = {
            time: subscription.time,
            userId: subscription.isGift ? (subscription.isAnonymous ? "Anonymous" : subscription.gifterId as string) : subscription.userId,
            userName: subscription.isGift ? (subscription.isAnonymous ? "Anonymous" : subscription.gifterName as string) : subscription.userName,
            userDisplayName: subscription.isGift ? (subscription.isAnonymous ? "Anonymous" : subscription.gifterDisplayName as string) : subscription.userDisplayName,
        }
        const subDetail: SubDetail | SubGiftDetail = subscription.isGift ? {
            context: subscription.isAnonymous ? "anonsubgift" : "subgift",
            subPlan: subscription.subPlan as "1000" | "2000" | "3000",
            months: subscription.months,
            recipientDisplayName: subscription.userDisplayName,
            recipientId: subscription.userId,
            recipientUserName: subscription.userName,
        } : {
            context: subscription.isResub ? "resub" : "sub",
            subPlan: subscription.subPlan,
            cumulativeMonths: subscription.cumulativeMonths,
            streakMonths: subscription.streakMonths,
            subMessage: subscription.message
        }
        const subEvent: SubEvent = {
            ...messageInfo,
            ...subDetail
        }

        callbacks.onSubscribe(subEvent);
    })

    await client.onBits(user, async (bits: PubSubBitsMessage) => {
        const user = bits.isAnonymous ? null : await bits.getUser();
        const displayName = user === null ? bits.userName : user.displayName;
        const userId = user === null ? null : user.id;
        callbacks.onBits({
            bits: bits.bits,
            isAnonymous: bits.isAnonymous,
            message: bits.message,
            totalBits: bits.totalBits,
            userId: userId || "Anonymous",
            userName: displayName || "Anonymous"
        })
    });

    await client.onRedemption(user, async (redemption: PubSubRedemptionMessage) => {
      if(redemption.rewardName.toLowerCase() === "party") {
        callbacks.onParty();
      }
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
            userId: randomName(),
            userName: randomName(),
            userDisplayName: randomName()
        })
    }

    callbacks.debugGiftSubscribe = () => {
        console.log("Debug Gift Subscribe");
        callbacks.onSubscribe({
            context: "subgift",
            months: 1,
            recipientDisplayName: randomName(),
            recipientId: randomName(),
            recipientUserName: randomName(),
            userDisplayName: randomName(),
            userId: randomName(),
            userName: randomName(),
            time: new Date(),
            subPlan: "1000"
        })
    }

    callbacks.debugBits = () => {
        console.log("Debug Bits");
        callbacks.onBits({
            isAnonymous: false,
            userId: randomName(),
            userName: randomName(),
            message: "Corgo100",
            bits: 99,
            totalBits: 500
        });
    }

    return callbacks;
}
