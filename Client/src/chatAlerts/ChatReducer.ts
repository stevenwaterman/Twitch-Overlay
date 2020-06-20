import {createAction, createReducer} from "@reduxjs/toolkit";

export type ChatMessage = {
    user: string;
    message: string;
    color: string | undefined;
    time: Date;
};
type ChatState = {
    current: ChatMessage | null;
    history: ChatMessage[];
};

export const newChat = createAction<ChatMessage, "CHAT">("CHAT");
export const removeChat = createAction<void, "REMOVE_CHAT">("REMOVE_CHAT");

const initialState: ChatState = {
    current: null,
    history: []
}
const reducer = createReducer(initialState, {
    [newChat.type]: (state: ChatState, action: ReturnType<typeof newChat>) => {
        state.current = action.payload;
        state.history.push(action.payload);
    },
    [removeChat.type]: (state: ChatState, action: ReturnType<typeof removeChat>) => {
        state.history.shift();
    }
})

export default reducer;