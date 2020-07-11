import React from 'react';
import {Provider} from "react-redux";
import rootStore from "./RootStore";
import "../Root.css";
import FollowerContainer from "../follows/FollowerContainer";
import {
    BrowserRouter as Router,
    Switch,
    Route, Link
} from "react-router-dom";
import ChatAlertsContainer from "../chatAlerts/ChatAlertsContainer";
import DebugPage from "../debug/DebugPage";
import Chat from "../chat/Chat";
import RaidContainer from "../raid/RaidContainer";
import SubscriberContainer from "../subscribers/SubscriberContainer";
import BitsContainer from "../bits/BitsContainer";
import HostContainer from "../hosts/HostContainer";

function Root() {
    return <Provider store={rootStore}>
        <Router>
            <Switch>
                <Route path="/" exact>
                    <ul>
                        <Link to="/follows?fps=60"><li>Follows</li></Link>
                        <Link to="/subscribers?fps=60"><li>Subscribers</li></Link>
                        <Link to="/bits?fps=60"><li>Bits</li></Link>
                        <Link to="/chat"><li>Chat</li></Link>
                        <Link to="/chatAlerts"><li>Chat Alerts</li></Link>
                        <Link to="/raid"><li>Raids</li></Link>
                        <Link to="/host"><li>Host</li></Link>
                        <Link to="/overlay?fps=60"><li>Overlay</li></Link>
                        <Link to="/debug"><li>Debug</li></Link>
                    </ul>
                </Route>
                <Route path="/follows" exact>
                    <FollowerContainer/>
                </Route>
                <Route path="/subscribers" exact>
                    <SubscriberContainer/>
                </Route>
                <Route path="/bits" exact>
                    <BitsContainer/>
                </Route>
                <Route path="/chatAlerts" exact>
                    <ChatAlertsContainer/>
                </Route>
                <Route path="/chat" exact>
                    <Chat/>
                </Route>
                <Route path="/debug" exact>
                    <DebugPage/>
                </Route>
                <Route path="/raid" exact>
                    <RaidContainer/>
                </Route>
                <Route path="/host" exact>
                    <HostContainer/>
                </Route>
                <Route path="/overlay" exact>
                    <SubscriberContainer/>
                    <BitsContainer/>
                    <RaidContainer/>
                    <FollowerContainer/>
                    <HostContainer/>
                </Route>

                <Route>
                    Unrecognised Path
                </Route>
            </Switch>
        </Router>
    </Provider>
}

export default Root;
