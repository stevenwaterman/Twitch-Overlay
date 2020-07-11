import {createAction, createReducer} from "@reduxjs/toolkit";
type RaidEvent = {
    displayName: string,
    viewerCount: number
}
type RaidState = {
    current: RaidEvent | null;
}

export const raidAction = createAction<RaidEvent, "RAID">("RAID")
export const clearRaidAction = createAction<void, "CLEAR_RAID">("CLEAR_RAID");

const initialState: RaidState = {
    current: null
}
const reducer = createReducer(initialState, builder =>
builder.addCase(raidAction, (state, {payload}) => {
    state.current = payload;
}).addCase(clearRaidAction, (state) => {
    state.current = null;
}));

export default reducer;