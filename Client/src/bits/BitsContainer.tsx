import {useSelector} from "react-redux";
import {RootState} from "../root/RootReducer";
import BitsBox from "./BitsBox";
import React from "react";
import {useLocation} from "react-use";

type Props = {min?: number; mute: boolean};
const BitsContainer: React.FunctionComponent<Props> = ({ min, mute }) => {
    const fpsString = new URLSearchParams(useLocation().search).get("fps");
    const fps = fpsString === null ? 60 : parseInt(fpsString);
    const bitsEvent = useSelector((state: RootState) => state.bits.current);

    if(bitsEvent == null) return null;

    const id = new Date().toLocaleDateString() + bitsEvent.userId
    return <BitsBox key={id} id={id} bits={bitsEvent.bits} min={min} mute={mute} message={bitsEvent.message} user={bitsEvent.userName} fps={fps}/>
}

export default BitsContainer;