import {createAction, createReducer} from "@reduxjs/toolkit";
import {HelixSubscriptionEvent} from "twitch";

type UserSubscribe = HelixSubscriptionEvent;
type SubscriberState = {
    queue: UserSubscribe[];
    current: UserSubscribe | null;
}

export const subscribeAction = createAction<HelixSubscriptionEvent, "SUBSCRIBE">("SUBSCRIBE")
export const clearSubscribeAction = createAction<string, "CLEAR_SUBSCRIBE">("CLEAR_SUBSCRIBE");

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
        state.current = state.queue.pop() as UserSubscribe;
    } else {
        state.current = null;
    }
}));

export default reducer;