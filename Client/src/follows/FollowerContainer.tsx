import {useSelector} from "react-redux";
import {RootState} from "../root/RootReducer";
import FollowerBox from "./FollowerBox";
import React from "react";
import {useLocation} from "react-use";

type Props = {};
const FollowerContainer: React.FunctionComponent<Props> = () => {
    const fpsString = new URLSearchParams(useLocation().search).get("fps");
    const fps = fpsString === null ? 60 : parseInt(fpsString);
    const user = useSelector((state: RootState) => state.follower.current?.user);

    if(user == null) return null;

    return <FollowerBox key={user} user={user} fps={fps}/>
}

export default FollowerContainer;