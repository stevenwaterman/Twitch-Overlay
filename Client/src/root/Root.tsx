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

function Root() {
    return <Provider store={rootStore}>
        <Router>
            <Switch>
                <Route path="/" exact>
                    <ul>
                        <Link to="/follows?fps=60"><li>Follows</li></Link>
                        <Link to="/chat?zoom=1"><li>Chat</li></Link>
                        <Link to="/chatAlerts"><li>Chat Alerts</li></Link>
                        <Link to="/debug"><li>Debug</li></Link>
                    </ul>
                </Route>
                <Route path="/follows" exact>
                    <FollowerContainer/>
                </Route>
                <Route path="/chat" exact>
                    {() => window.location.href=`/chat.html?channel=${process.env.REACT_APP_CHANNEL_NAME}&fade=10&bot_activity=false&prevent_clipping=false&scale=${new URLSearchParams(window.location.search).get("zoom")}`}
                </Route>
                <Route path="/chatAlerts" exact>
                    <ChatAlertsContainer/>
                </Route>
                <Route path="/debug" exact>
                    <DebugPage/>
                </Route>
                <Route>
                    Unrecognised Path
                </Route>
            </Switch>
        </Router>
    </Provider>
}

export default Root;
