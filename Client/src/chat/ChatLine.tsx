import React, {useEffect} from "react";
import {ChatMessage, removeChat} from "../chatAlerts/ChatReducer";
import "./chat.css";
import {useAppDispatch} from "../root/RootStore";

type Props = ChatMessage;
const defaultColors = ["#FF0000", "#0000FF", "#008000", "#B22222", "#FF7F50", "#9ACD32", "#FF4500", "#2E8B57", "#DAA520", "#D2691E", "#5F9EA0", "#1E90FF", "#FF69B4", "#8A2BE2", "#00FF7F"];

const ChatLine: React.FunctionComponent<Props> = ({message, user, color}: Props) => {
    const userColor = color === undefined ? defaultColors[user.charCodeAt(0) % 15] : color;
    const dispatch = useAppDispatch();
    useEffect(() => {
        setTimeout(() => {
            dispatch(removeChat())
        }, 10*1000)
    })

    return <div className="chat_line">
        <span className="nick" style={{color: userColor}}>{user} </span>
        <span className="message">{message}</span>
    </div>
}

export default ChatLine;