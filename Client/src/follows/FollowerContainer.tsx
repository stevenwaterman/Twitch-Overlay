import {useSelector} from "react-redux";
import {RootState} from "../root/RootReducer";
import FollowerBox from "./FollowerBox";
import React from "react";
import {useLocation} from "react-use";

type Props = {};
const FollowerContainer: React.FunctionComponent<Props> = () => {
    const fpsString = new URLSearchParams(useLocation().search).get("fps");
    const fps = fpsString === null ? 60 : parseInt(fpsString);
    const user = useSelector((state: RootState) => state.follower.current);

    if(user == null) return null;

    return <FollowerBox key={user.userDisplayName + user.followDate.toLocaleString()} user={user.userDisplayName} fps={fps}/>
}

export default FollowerContainer;