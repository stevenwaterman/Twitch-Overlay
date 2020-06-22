import {combineReducers} from "@reduxjs/toolkit";
import followerReducer from "../follows/FollowerReducer";
import chatReducer from "../chatAlerts/ChatReducer";
import raidReducer from "../raid/RaidReducer";

const rootReducer = combineReducers({
    follower: followerReducer,
    chat: chatReducer,
    raid: raidReducer
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;