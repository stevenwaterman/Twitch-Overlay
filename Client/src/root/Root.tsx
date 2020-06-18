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
import ChatContainer from "../chat/ChatContainer";
import DebugPage from "../debug/DebugPage";

function Root() {
    return <Provider store={rootStore}>
        <Router>
            <Switch>
                <Route path="/" exact>
                    <ul>
                        <Link to="/follows?fps=60"><li>Follows</li></Link>
                        <Link to="/chat"><li>Chat</li></Link>
                        <Link to="/debug"><li>Debug</li></Link>
                    </ul>
                </Route>
                <Route path="/follows" exact>
                    <FollowerContainer/>
                </Route>
                <Route path="/chat" exact>
                    <ChatContainer/>
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
