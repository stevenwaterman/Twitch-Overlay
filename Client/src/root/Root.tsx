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

function Root() {
    return <Provider store={rootStore}>
        <Router>
            <Switch>
                <Route path="/" exact>
                    <ul>
                        <Link to="/follows?fps=60"><li>Follows</li></Link>
                        <Link to="/chat"><li>Chat</li></Link>
                        <Link to="/chatAlerts"><li>Chat Alerts</li></Link>
                        <Link to="/raid"><li>Raids</li></Link>
                        <Link to="/debug"><li>Debug</li></Link>
                    </ul>
                </Route>
                <Route path="/follows" exact>
                    <FollowerContainer/>
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

                <Route>
                    Unrecognised Path
                </Route>
            </Switch>
        </Router>
    </Provider>
}

export default Root;
