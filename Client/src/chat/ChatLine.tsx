import React, {useEffect, useState} from "react";
import {ChatEvent, removeChat} from "../chatAlerts/ChatReducer";
import "./chat.css";
import {useAppDispatch} from "../root/RootStore";
import Badge from "./Badge";
import EmoteComponent from "./Emote";
import {TwitchEmoteList} from "dank-twitch-irc";
import { CSSTransition } from 'react-transition-group';

type Props = {
    message: ChatEvent
};
const defaultColors = ["#FF0000", "#0000FF", "#008000", "#B22222", "#FF7F50", "#9ACD32", "#FF4500", "#2E8B57", "#DAA520", "#D2691E", "#5F9EA0", "#1E90FF", "#FF69B4", "#8A2BE2", "#00FF7F"];

const ChatLine: React.FunctionComponent<Props> = ({message}: Props) => {
    const dispatch = useAppDispatch();
    const [show, setShow] = useState(false);

    const {colorRaw, displayName, messageText, badges, emotes} = message;
    const userColor = colorRaw === undefined || colorRaw.length === 0 ? defaultColors[displayName.charCodeAt(0) % 15] : colorRaw;
    useEffect(() => {
        setTimeout(() => {
            setShow(false);

        }, 10*1000)
    })

    useEffect(() => setShow(true), [message.messageID]);
    const chatLineRef = React.createRef<HTMLDivElement>();

    return <CSSTransition mountOnEnter unmountOnExit in={show} onExited={() => dispatch(removeChat())} timeout={200} classNames={"chat_line"} nodeRef={chatLineRef}>
        <div className="chat_line" ref={chatLineRef}>
            {badges.map(badge => {
                return <Badge key={badge.name} name={badge.name} version={badge.version}/>
            })}
            <span className="nick" style={{color: userColor}}>{displayName} </span>
            <span className="message">{tokenise(messageText, emotes) }</span>
        </div>
    </CSSTransition>

}

type TextToken = {
    start: number,
    end: number,
    content: string
}

type EmoteToken = {
    start: number,
    end: number,
    content: ReturnType<typeof EmoteComponent>
}

type Token = TextToken | EmoteToken;

function tokenise(text: string, emotes: TwitchEmoteList): Array<Token["content"]> {
    const emoteTokens: EmoteToken[] = [];
    emotes.forEach(emote => {
        emoteTokens.push({
            start: emote.startIndex,
            end: emote.endIndex,
            content: <EmoteComponent key={emote.startIndex} id={emote.id}/>
        })
    })
    emoteTokens.sort((a,b) => a.start - b.start);

    const textTokens: TextToken[] = [];
    let idx = 0;
    emoteTokens.forEach(emoteToken => {
        textTokens.push({
            start: idx,
            end: emoteToken.start,
            content: text.slice(idx, emoteToken.start)
        })
        idx = emoteToken.end;
    })
    textTokens.push({
        start: idx,
        end: text.length,
        content: text.slice(idx)
    })

    const tokens = [...emoteTokens, ...textTokens].filter(token => token.start !== token.end);
    tokens.sort((a,b) => a.start - b.start);
    return tokens.map(token => token.content);
}

export default ChatLine;