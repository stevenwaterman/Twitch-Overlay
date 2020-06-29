import {useSelector} from "react-redux";
import {RootState} from "../root/RootReducer";
import SubscriberBox from "./SubscriberBox";
import React from "react";
import {useLocation} from "react-use";

type Props = {};
const SubscriberContainer: React.FunctionComponent<Props> = () => {
    const fpsString = new URLSearchParams(useLocation().search).get("fps");
    const fps = fpsString === null ? 60 : parseInt(fpsString);
    const sub = useSelector((state: RootState) => state.subscriber.current);

    if(sub == null) return null;
    console.log(sub);

    return <SubscriberBox key={sub.userId} user={sub.userDisplayName} message={sub.context === "sub" || sub.context === "resub" ? sub.subMessage : null} fps={fps}/>
}

export default SubscriberContainer;