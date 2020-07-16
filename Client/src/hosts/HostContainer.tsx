import {useSelector} from "react-redux";
import {RootState} from "../root/RootReducer";
import HostBox from "./HostBox";
import React from "react";

type Props = {};
const HostContainer: React.FunctionComponent<Props> = () => {
    const event = useSelector((state: RootState) => state.host.current);

    if(event == null) return null;

    return <HostBox key={event.channel + new Date().toLocaleDateString()} user={event.channel}/>
}

export default HostContainer;