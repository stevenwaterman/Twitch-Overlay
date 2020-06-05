import {createAction, createReducer} from "@reduxjs/toolkit";

//TODO multiple follows in a queue
type FollowerState = {
    current: {
        user: string;
        time: Date;
    } | null;
}

export const followAction = createAction<FollowerState["current"], "FOLLOW">("FOLLOW")
export const clearFollowAction = createAction<string, "CLEAR_FOLLOW">("CLEAR_FOLLOW");

const initialState: FollowerState = {
    current: null
}
const reducer = createReducer(initialState, {
    [followAction.type]: (state: FollowerState, action: ReturnType<typeof followAction>) => {
        return {
            ...state,
            current: action.payload
        };
    },
    [clearFollowAction.type]: (state: FollowerState, action: ReturnType<typeof clearFollowAction>) => {
        if(state.current?.user !== action.payload) return state;
        return {
            ...state,
            current: null
        }
    }
})

export default reducer;