import {ActionCreatorWithPayload, createAction, createReducer} from "@reduxjs/toolkit";
import {TwitchBadgesList} from "dank-twitch-irc/lib/message/badges";
import {Color} from "dank-twitch-irc/lib/message/color";
import {TwitchEmoteList} from "dank-twitch-irc/lib/message/emotes";

export type ChatEvent = {
    messageText: string;
    isAction: boolean;
    senderUsername: string;
    senderUserID: string;
    badgeInfo: TwitchBadgesList;
    badgeInfoRaw: string;
    badges: TwitchBadgesList;
    badgesRaw: string;
    bits: number | undefined;
    bitsRaw: string | undefined;
    color: Color | undefined;
    colorRaw: string;
    displayName: string;
    emotes: TwitchEmoteList;
    emotesRaw: string;
    messageID: string;
    isMod: boolean;
    isModRaw: string;
    channelID: string;
    serverTimestamp: Date;
    serverTimestampRaw: string;
};
type ChatState = {
    current: ChatEvent | null;
    history: ChatEvent[];
};

export const newChat: ActionCreatorWithPayload<ChatEvent, "CHAT"> = createAction<ChatEvent, "CHAT">("CHAT");
export const removeChat = createAction<void, "REMOVE_CHAT">("REMOVE_CHAT");

const initialState: ChatState = {
    current: null,
    history: []
}
const reducer = createReducer(initialState, builder =>
    builder.addCase(newChat, (state, {payload}) => {
        console.log(payload);
        state.current = payload;
        state.history.push(payload);
    })
        .addCase(removeChat, (state) => {
            state.history.shift();
            if (state.history.length === 0) {
                state.current = null;
            }
        }));

export default reducer;