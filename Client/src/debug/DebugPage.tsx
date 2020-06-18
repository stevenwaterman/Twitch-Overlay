import React from "react";
import {debugFollowRequest, debugChatRequest} from "./DebugApi";


const DebugPage: React.FunctionComponent = () => {
    return <>
        <button onClick={debugFollowRequest}>Fake Follow</button>
        <button onClick={debugChatRequest}>Real Chat</button>
    </>
}

export default DebugPage;