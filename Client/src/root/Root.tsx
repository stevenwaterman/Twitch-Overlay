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

function Root() {
    return <Provider store={rootStore}>
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Link to="/follows">Follows</Link>
                    <Link to="/chat">Chat</Link>
                </Route>
                <Route path="/follows" exact>
                    <FollowerContainer/>
                </Route>
                <Route path="/chat" exact>
                    <ChatContainer/>
                </Route>
                <Route>
                    Unrecognised Path
                </Route>
            </Switch>
        </Router>
    </Provider>
}

export default Root;
