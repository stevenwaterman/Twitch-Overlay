import {ActionCreatorWithPayload, createAction, createReducer} from "@reduxjs/toolkit";

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
        state.current = payload;
        state.history.push(payload);
    }).addCase(removeChat, (state) => {
        state.history.shift();
        if (state.history.length === 0) {
            state.current = null;
        }
    }));

export default reducer;