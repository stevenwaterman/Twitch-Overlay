import React from "react";
import {debugFollowRequest, debugChatRequest, debugRaidRequest} from "./DebugApi";


const DebugPage: React.FunctionComponent = () => {
    return <>
        <button onClick={debugFollowRequest}>Fake Follow</button>
        <button onClick={debugRaidRequest}>Fake Raid</button>
        <button onClick={debugChatRequest}>Real Chat</button>
    </>
}

export default DebugPage;