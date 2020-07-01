import React from "react";
import {debugFollowRequest, debugChatRequest, debugRaidRequest, debugSubRequest, debugGiftSubRequest} from "./DebugApi";


const DebugPage: React.FunctionComponent = () => {
    return <>
        <button onClick={debugFollowRequest}>Fake Follow</button>
        <button onClick={debugRaidRequest}>Fake Raid</button>
        <button onClick={debugSubRequest}>Fake Sub</button>
        <button onClick={debugGiftSubRequest}>Fake Gift Sub</button>
        <button onClick={debugChatRequest}>Real Chat</button>
    </>
}

export default DebugPage;