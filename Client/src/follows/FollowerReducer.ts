import {createAction, createReducer} from "@reduxjs/toolkit";
import {HelixFollow} from "twitch";

type UserFollow = HelixFollow;
type FollowerState = {
    queue: UserFollow[];
    current: UserFollow | null;
}

export const followAction = createAction<HelixFollow, "FOLLOW">("FOLLOW")
export const clearFollowAction = createAction<string, "CLEAR_FOLLOW">("CLEAR_FOLLOW");

const initialState: FollowerState = {
    queue: [],
    current: null
}
const reducer = createReducer(initialState, builder =>
builder.addCase(followAction, (state, {payload}) => {
    if(state.current === null) {
        state.current = payload;
    } else {
        state.queue.push(payload);
    }
}).addCase(clearFollowAction, (state) => {
    if(state.queue.length > 0) {
        state.current = state.queue.pop() as UserFollow;
    } else {
        state.current = null;
    }
}));

export default reducer;