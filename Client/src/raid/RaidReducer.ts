import {createAction, createReducer} from "@reduxjs/toolkit";
type RaidEvent = {
    displayName: string,
    viewerCount: number
}
type RaidState = {
    queue: RaidEvent[];
    current: RaidEvent | null;
}

export const raidAction = createAction<RaidEvent, "RAID">("RAID")
export const clearRaidAction = createAction<void, "CLEAR_RAID">("CLEAR_RAID");

const initialState: RaidState = {
    queue: [],
    current: null
}
const reducer = createReducer(initialState, builder =>
builder.addCase(raidAction, (state, {payload}) => {
    if(state.current === null) {
        state.current = payload;
    } else {
        state.queue.push(payload);
    }
}).addCase(clearRaidAction, (state) => {
    console.log("Clearing");
    if(state.queue.length > 0) {
        state.current = state.queue.pop() as RaidEvent;
    } else {
        state.current = null;
    }
}));

export default reducer;