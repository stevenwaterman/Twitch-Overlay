import {combineReducers} from "@reduxjs/toolkit";
import followerReducer from "../follows/FollowerReducer";
import subscriberReducer from "../subscribers/SubscriberReducer";
import chatReducer from "../chatAlerts/ChatReducer";
import raidReducer from "../raid/RaidReducer";

const rootReducer = combineReducers({
    follower: followerReducer,
    subscriber: subscriberReducer,
    chat: chatReducer,
    raid: raidReducer
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;