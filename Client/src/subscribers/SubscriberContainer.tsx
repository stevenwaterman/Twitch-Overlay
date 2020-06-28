import {useSelector} from "react-redux";
import {RootState} from "../root/RootReducer";
import SubscriberBox from "./SubscriberBox";
import React from "react";
import {useLocation} from "react-use";

type Props = {};
const SubscriberContainer: React.FunctionComponent<Props> = () => {
    const fpsString = new URLSearchParams(useLocation().search).get("fps");
    const fps = fpsString === null ? 60 : parseInt(fpsString);
    const user = useSelector((state: RootState) => state.subscriber.current);

    if(user == null) return null;
    console.log(user);

    return <SubscriberBox key={user.userId} user={user.userDisplayName} fps={fps}/>
}

export default SubscriberContainer;