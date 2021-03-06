import {combineReducers} from "@reduxjs/toolkit";
import followerReducer from "../follows/FollowerReducer";
import subscriberReducer from "../subscribers/SubscriberReducer";
import bitsReducer from "../bits/BitsReducer";
import chatReducer from "../chatAlerts/ChatReducer";
import raidReducer from "../raid/RaidReducer";
import hostReducer from "../hosts/HostReducer";

const rootReducer = combineReducers({
    follower: followerReducer,
    host: hostReducer,
    subscriber: subscriberReducer,
    bits: bitsReducer,
    chat: chatReducer,
    raid: raidReducer
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;