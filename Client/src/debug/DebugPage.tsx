import React from "react";
import {
    debugFollowRequest,
    debugChatRequest,
    debugRaidRequest,
    debugSubRequest,
    debugGiftSubRequest,
    debugBitsRequest,
    debugHostRequest
} from "./DebugApi";

const DebugPage: React.FunctionComponent = () => {
    return <>
        <button onClick={debugFollowRequest}>Fake Follow</button>
        <button onClick={debugRaidRequest}>Fake Raid</button>
        <button onClick={debugHostRequest}>Fake Host</button>
        <button onClick={debugSubRequest}>Fake Sub</button>
        <button onClick={debugGiftSubRequest}>Fake Gift Sub</button>
        <button onClick={debugBitsRequest}>Fake Bits</button>
        <button onClick={debugChatRequest}>Real Chat</button>
    </>
}

export default DebugPage;