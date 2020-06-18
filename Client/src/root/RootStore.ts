import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./RootReducer";
import {useDispatch} from "react-redux";
import {WebSocketClient} from "./ws";

const rootStore = configureStore({
    reducer: rootReducer
});

export type AppDispatch = typeof rootStore.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

const websocket = new WebSocketClient(`ws://${process.env.REACT_APP_SERVER_IP}/events`);
websocket.onMessage = event => {
    const action = JSON.parse(event.data);
    console.log(action);
    rootStore.dispatch(action);
}

export default rootStore;