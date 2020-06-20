import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../root/RootReducer";
import ChatLine from "./ChatLine";
import {useLocation} from "react-use";

const Chat: React.FunctionComponent = () => {
    const scaleString = new URLSearchParams(useLocation().search).get("zoom");
    const scale = scaleString === null ? 1 : parseFloat(scaleString);

    const messages = useSelector((state: RootState) => state.chat.history);

    return <div style={{
        position: "fixed",
        inset: "5px"
    }}>
        <div id="chat_box" style={{
            transform: `scale(${scale})`,
            width: `${100/scale}%`,
            height: `${100/scale}%`,
        }}>
            {messages.map(message => <ChatLine message={message.message} user={message.user} color={message.color} time={message.time}/>)}
        </div>
    </div>
}

export default Chat;