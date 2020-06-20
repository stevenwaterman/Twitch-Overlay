import {useSelector} from "react-redux";
import {RootState} from "../root/RootReducer";
import React from "react";
import ChatAlerts from "./ChatAlerts";

type Props = {};
const ChatAlertsContainer: React.FunctionComponent<Props> = () => {
    const chat = useSelector((state: RootState) => state.chat.current);
    if(chat == null) return null;

    return <ChatAlerts key={chat.user} user={chat.user} message={chat.message}/>
}

export default ChatAlertsContainer;