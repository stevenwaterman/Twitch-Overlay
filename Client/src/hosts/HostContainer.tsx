import {useSelector} from "react-redux";
import {RootState} from "../root/RootReducer";
import HostBox from "./HostBox";
import React from "react";

type Props = {mute: boolean};
const HostContainer: React.FunctionComponent<Props> = ({ mute }) => {
    const event = useSelector((state: RootState) => state.host.current);

    if(event == null) return null;

    return <HostBox key={event.channel + new Date().toLocaleDateString()} user={event.channel} mute={mute}/>
}

export default HostContainer;