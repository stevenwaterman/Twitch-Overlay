import {useSelector} from "react-redux";
import {RootState} from "../root/RootReducer";
import React from "react";
import RaidBox from "./RaidBox";

type Props = {};
const RaidContainer: React.FunctionComponent<Props> = () => {
    const raid = useSelector((state: RootState) => state.raid.current);

    if(raid == null) return null;
    console.log(raid);

    return <RaidBox key={raid.displayName + new Date().toLocaleDateString()} displayName={raid.displayName} viewerCount={raid.viewerCount}/>
}

export default RaidContainer;