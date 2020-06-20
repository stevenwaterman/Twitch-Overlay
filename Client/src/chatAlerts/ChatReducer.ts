import {createAction, createReducer} from "@reduxjs/toolkit";

//TODO multiple follows in a queue
type ChatState = {
    current: {
        user: string;
        message: string;
        time: Date;
    } | null;
}

export const newChat = createAction<ChatState["current"], "CHAT">("CHAT")

const initialState: ChatState = {
    current: null
}
const reducer = createReducer(initialState, {
    [newChat.type]: (state: ChatState, action: ReturnType<typeof newChat>) => {
        return {
            ...state,
            current: action.payload
        };
    }
})

export default reducer;