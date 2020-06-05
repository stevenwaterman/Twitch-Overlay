import React from 'react';
import {Provider} from "react-redux";
import rootStore from "./RootStore";
import "../Root.css";
import FollowerContainer from "../follows/FollowerContainer";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import ChatContainer from "../chat/ChatContainer";

function Root() {
    return <Provider store={rootStore}>
        <Router>
            <Switch>
                <Route path="/follows">
                    <FollowerContainer/>
                </Route>
                <Route path="/chat">
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
