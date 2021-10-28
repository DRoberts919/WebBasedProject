import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import {AuthContext} from '../components/App';
import Board from '../components/board';
import Landing from '../components/landing';
import Login from '../components/login';
import Signup from '../components/signup';



export default function Routes() {
    const [redirect, setRedirect] = useState(false);
    const authing = useContext(AuthContext)
    useEffect(()=>{
        console.log(authing)
    },[authing])
    useEffect(()=>{
        authing.checkAuth();
    },[])
    function WithOutNavName(){
        return(
            <nav>
                <div>
                    <h1><Link to="/">Bello</Link></h1>
                    <div className="btn-group">
                        <Link className="btn outline light" to="/signup">Sign Up</Link>
                        <Link className="btn solid light" to="/login">Log In</Link>
                    </div>
                </div>
            </nav>
        )
    }

    const loggingOut = event => {
        event.preventDefault();

        fetch("http://localhost:3005/api/auth", {
            method: 'DELETE', 
            credentials: 'include'

        }).then( response => {
            console.log(response);
            if(response.ok)  {
                authing.checkAuth();
                setRedirect(true);
            }
        });
    }
    
    function WithNavName(){
        return(
            <nav>
                <div>
                    <h1><Link to="/">Bello</Link></h1>
                    <h3>{authing.currUser.name}</h3>
                    <div className="btn-group">
                        <Link onClick={loggingOut} className="btn solid light" to="/">Log Out</Link>
                    </div>
                </div>
            </nav>
        )
    }
    return (
        <Router>
            <section>
                {authing.isAuth && authing.currUser ? <WithNavName /> : <WithOutNavName />}
            </section>
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