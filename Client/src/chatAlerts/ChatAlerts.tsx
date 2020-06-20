import React, {useEffect} from "react";
import {say} from "./tts";

type Props = {displayName: string, messageText: string};

const ChatAlerts: React.FunctionComponent<Props> = ({displayName, messageText}: Props) => {
    useEffect(() => {say(`${displayName} says ${messageText}`)})
    return <>
        <div>{displayName} says {messageText}</div>
        <div onClick={() => {say("hello")}}>Click here if it's broken</div>
    </>
}

export default ChatAlerts;