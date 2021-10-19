import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../src/components/App';
import board from '../src/components/board';
import landing from '../src/components/landing';
import login from '../src/components/login';
import signup from '../src/components/signup';

export default (
    <Route path="/" Component={landing}>
        <IndexRoute Component={landing} />
        <Route path="/login" component={login} />
        <Route path="/signup" component={signup} />
        <Route path="/board/:board_id" component={board} />
    </Route>
)