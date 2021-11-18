import {useSelector} from "react-redux";
import {RootState} from "../root/RootReducer";
import SelfSubscriberBox from "./SelfSubscriberBox";
import React from "react";
import {useLocation} from "react-use";
import GiftSubscriberBox from "./GiftSubscriberBox";

type Props = { mute: boolean };
const SubscriberContainer: React.FunctionComponent<Props> = ({ mute }) => {
    const fpsString = new URLSearchParams(useLocation().search).get("fps");
    const fps = fpsString === null ? 60 : parseInt(fpsString);
    const sub = useSelector((state: RootState) => state.subscriber.current);

    if(sub == null) return null;
    console.log(sub);

    if(sub.context === "subgift" || sub.context === "anonsubgift") {
        return <GiftSubscriberBox key={new Date().toLocaleDateString() + sub.userId} mute={mute} recipient={sub.recipientDisplayName} giver={sub.userDisplayName} fps={fps}/>
    } else {
        return <SelfSubscriberBox key={new Date().toLocaleDateString() + sub.userId} mute={mute} user={sub.userDisplayName} message={sub.context === "sub" || sub.context === "resub" ? sub.subMessage : null} fps={fps}/>
    }
}

export default SubscriberContainer;