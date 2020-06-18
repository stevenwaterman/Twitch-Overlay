import {createAction, createReducer} from "@reduxjs/toolkit";

//TODO multiple follows in a queue
type UserFollow = {
    user: string;
    time: Date;
}
type FollowerState = {
    queue: UserFollow[];
    current: UserFollow | null;
}

export const followAction = createAction<UserFollow, "FOLLOW">("FOLLOW")
export const clearFollowAction = createAction<string, "CLEAR_FOLLOW">("CLEAR_FOLLOW");

const initialState: FollowerState = {
    queue: [],
    current: null
}
const reducer = createReducer(initialState, {
    [followAction.type]: (state: FollowerState, action: ReturnType<typeof followAction>) => {
        if(state.current === null) {
            state.current = action.payload;
        } else {
            state.queue.push(action.payload);
        }
    },
    [clearFollowAction.type]: (state: FollowerState, action: ReturnType<typeof clearFollowAction>) => {
        if(state.queue.length > 0) {
            state.current = state.queue.pop() as UserFollow;
        } else {
            state.current = null;
        }
    }
})

export default reducer;