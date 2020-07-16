import {createAction, createReducer} from "@reduxjs/toolkit";

export type BitsEvent = {
    bits: number,
    totalBits: number,
    isAnonymous: boolean,
    message: string,
    userId: string,
    userName: string
};
type BitsState = {
    queue: BitsEvent[];
    current: BitsEvent | null;
}

export const bitsAction = createAction<BitsEvent, "BITS">("BITS")
export const clearBitsAction = createAction<void, "CLEAR_BITS">("CLEAR_BITS");

const initialState: BitsState = {
    queue: [],
    current: null
}
const reducer = createReducer(initialState, builder =>
builder.addCase(bitsAction, (state, {payload}) => {
    if(state.current === null) {
        state.current = payload;
    } else {
        state.queue.push(payload);
    }
}).addCase(clearBitsAction, (state) => {
    console.log("clearing bits")
    if(state.queue.length > 0) {
        state.current = state.queue.pop() as BitsEvent;
    } else {
        state.current = null;
    }
}));

export default reducer;