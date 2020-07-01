import {createAction, createReducer} from "@reduxjs/toolkit";

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
type SubscriberState = {
    queue: SubEvent[];
    current: SubEvent | null;
}

export const subscribeAction = createAction<SubEvent, "SUBSCRIBE">("SUBSCRIBE")
export const clearSubscribeAction = createAction<void, "CLEAR_SUBSCRIBE">("CLEAR_SUBSCRIBE");

const initialState: SubscriberState = {
    queue: [],
    current: null
}
const reducer = createReducer(initialState, builder =>
builder.addCase(subscribeAction, (state, {payload}) => {
    if(state.current === null) {
        state.current = payload;
    } else {
        state.queue.push(payload);
    }
}).addCase(clearSubscribeAction, (state) => {
    if(state.queue.length > 0) {
        state.current = state.queue.pop() as SubEvent;
    } else {
        state.current = null;
    }
}));

export default reducer;