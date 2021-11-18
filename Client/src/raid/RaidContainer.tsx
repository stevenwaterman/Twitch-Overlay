import {useSelector} from "react-redux";
import {RootState} from "../root/RootReducer";
import React from "react";
import RaidBox from "./RaidBox";

type Props = { mute: boolean };
const RaidContainer: React.FunctionComponent<Props> = ({ mute }) => {
    const raid = useSelector((state: RootState) => state.raid.current);

    if(raid == null) return null;
    console.log(raid);

    return <RaidBox key={raid.displayName + new Date().toLocaleDateString()} mute={mute} displayName={raid.displayName} viewerCount={raid.viewerCount}/>
}

export default RaidContainer;