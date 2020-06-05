import {combineReducers} from "@reduxjs/toolkit";
import followerReducer from "../follows/FollowerReducer";
import chatReducer from "../chat/ChatReducer";

const rootReducer = combineReducers({
    follower: followerReducer,
    chat: chatReducer
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;