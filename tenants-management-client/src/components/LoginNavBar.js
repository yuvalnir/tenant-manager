import React, { Component } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "../components/Login";
import Home from "./Home";
import Signup from "../components/Signup";

class LoginNavBar extends Component {
    render() {
        return (
            <Router>
                <div className="LoginNavBar">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="container">
                            <Link className="navbar-brand" to={"/sign-in"}><h2>Tenants Management</h2></Link>
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/sign-in"}>Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>

                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <Switch>
                            <Route exact path='/' render={() => (<Login setIsLogedin={this.props.setIsLogedin} />)} />
                            <Route path="/sign-in" render={() => (<Login setIsLogedin={this.props.setIsLogedin} />)} />
                            <Route path="/sign-up" component={Signup} />
                            <Route path="/main" component={Home} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default LoginNavBar;