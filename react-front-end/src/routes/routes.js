import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from '../components/App';
import board from '../components/board';
import landing from '../components/landing';
import login from '../components/login';
import signup from '../components/signup';

export default function Routes() {
    return (
        <Router>
            {/* <Route path="/" Component={landing}> */}
                <Route exact path="/" component={landing} />
                <Route exact path="/login" component={login} />
                <Route exact path="/signup" component={signup} />
                <Route exact path="/board/:board_id" component={board} />
            {/* </Route> */}
        </Router>
    )
}