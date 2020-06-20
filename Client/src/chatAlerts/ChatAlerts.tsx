import React, {useEffect} from "react";
import {say} from "./tts";

type Props = {user: string, message: string};

const ChatAlerts: React.FunctionComponent<Props> = ({user, message}: Props) => {
    useEffect(() => {say(`${user} says ${message}`)})
    return <>
        <div>{user} says {message}</div>
        <div onClick={() => {say("hello")}}>Click here if it's broken</div>
    </>
}

export default ChatAlerts;