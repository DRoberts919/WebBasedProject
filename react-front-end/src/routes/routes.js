import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import App from '../components/App';
import Board from '../components/board';
import Landing from '../components/landing';
import Login from '../components/login';
import Signup from '../components/signup';

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
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/board/:board_id" component={Board} />
                {/* </Route> */}
            </div>
        </Router>
    )
}