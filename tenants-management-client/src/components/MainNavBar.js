import React, { Component } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import AddTenant from "./AddTenant";
import EditTenant from "./EditTenant";


class MainNavBar extends Component {

    /** change's the screen and navBar to login */
    logoutHandler = (e) => {

        fetch('http://localhost:8082/userapi/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                email: localStorage.getItem("userEmail"),
            })
        });

        localStorage.clear();
        this.props.setIsLogedin(false);
    }

    render() {
        return (
            <Router>
                <div>
                    <div className="main-navbar">
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <div className="container">
                                <Link className="navbar-brand" to={"/sign-in"}><h2>Tenants Management</h2></Link>
                                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <Link className="nav-link" to={"/home"}>Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" onClick={(e) => this.logoutHandler(e)} to={"/sign-in"}>Logout</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>

                    <div className="auth-wrapper">
                        <div className="main-container">
                            <Switch>
                                <Route path="/home" component={Home} />
                                <Route path="/sign-in" render={() => (<Login setIsLogedin={this.props.setIsLogedin} />)} />
                                <Route path="/addtanent" component={AddTenant} />
                                <Route path="/edittanent" component={EditTenant} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default MainNavBar;