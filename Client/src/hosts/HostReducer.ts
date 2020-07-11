import {createAction, createReducer} from "@reduxjs/toolkit";

export type HostEvent = {
    channel: string,
    viewers: number,
    auto: boolean
}
type HostState = {
    queue: HostEvent[];
    current: HostEvent | null;
}

export const hostAction = createAction<HostEvent, "HOST">("HOST")
export const clearHostAction = createAction<void, "CLEAR_HOST">("CLEAR_HOST");

const initialState: HostState = {
    queue: [],
    current: null
}
const reducer = createReducer(initialState, builder =>
builder.addCase(hostAction, (state, {payload}) => {
    if(payload.auto) return state;

    if(state.current === null) {
        state.current = payload;
    } else {
        state.queue.push(payload);
    }
}).addCase(clearHostAction, (state) => {
    console.log("Clearing");
    if(state.queue.length > 0) {
        state.current = state.queue.pop() as HostEvent;
    } else {
        state.current = null;
    }
}));

export default reducer;