import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import App from '../components/App';
import board from '../components/board';
import landing from '../components/landing';
import login from '../components/login';
import signup from '../components/signup';

export default function Routes() {
    return (
        <Router>
            <nav>
                <div>
                    <h1><Link to="/">Bello</Link></h1>
                    <div className="btn-group">
                        <Link className="btn outline light" to="/signup">Sign Up</Link>
                        <Link className="btn solid light" to="/login">Log In</Link>
                    </div>
                </div>
            </nav>
            <div className="content">
                {/* <Route path="/" Component={landing}> */}
                    <Route exact path="/" component={landing} />
                    <Route exact path="/login" component={login} />
                    <Route exact path="/signup" component={signup} />
                    <Route exact path="/board/:board_id" component={board} />
                {/* </Route> */}
            </div>
        </Router>
    )
}