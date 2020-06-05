import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./RootReducer";
import {useDispatch} from "react-redux";

const rootStore = configureStore({
    reducer: rootReducer
});

export type AppDispatch = typeof rootStore.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

const socket = new WebSocket(`ws://${process.env.REACT_APP_SERVER_IP}/events`);
socket.onmessage = event => {
    const action = JSON.parse(event.data);
    console.log(action);
    rootStore.dispatch(action);
};

export default rootStore;