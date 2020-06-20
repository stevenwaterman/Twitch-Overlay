import {combineReducers} from "@reduxjs/toolkit";
import followerReducer from "../follows/FollowerReducer";
import chatReducer from "../chatAlerts/ChatReducer";

const rootReducer = combineReducers({
    follower: followerReducer,
    chat: chatReducer
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;