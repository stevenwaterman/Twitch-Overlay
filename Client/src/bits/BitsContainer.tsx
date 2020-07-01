import {useSelector} from "react-redux";
import {RootState} from "../root/RootReducer";
import BitsBox from "./BitsBox";
import React from "react";
import {useLocation} from "react-use";

type Props = {};
const BitsContainer: React.FunctionComponent<Props> = () => {
    const fpsString = new URLSearchParams(useLocation().search).get("fps");
    const fps = fpsString === null ? 60 : parseInt(fpsString);
    const bitsEvent = useSelector((state: RootState) => state.bits.current);

    if(bitsEvent == null) return null;
    console.log(bitsEvent);

    return <BitsBox id={new Date().toLocaleDateString() + bitsEvent.userId} key={bitsEvent.userId} bits={bitsEvent.bits} message={bitsEvent.message} user={bitsEvent.userName} fps={fps}/>
}

export default BitsContainer;