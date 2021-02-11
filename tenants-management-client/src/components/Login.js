import React, { Component } from "react";

import { withRouter } from 'react-router-dom';

class Login extends Component {

    /** handleSubmit - responsible for user authentication,
    if user authenticated correctly it will change the browser address to /menu
    and to change the navBar to the main screen navBar */
    handleSubmit = (e) => {
        e.preventDefault();
        

        const data = new FormData(e.target);
        console.log("{email: " + data.get('email') + " password: " + data.get('password') + "}");

        fetch('http://localhost:8082/userapi/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: data.get('email'),
                password: data.get('password')
            })
        }).then(response => {
            console.log(response.status); //delete later
            if (response.status === 200) {
                response.json().then(jsonObj => {   
                    localStorage.setItem('userId', jsonObj.data.user._id);
                    localStorage.setItem('userEmail', jsonObj.data.user.email);
                    localStorage.setItem('token', jsonObj.data.token);
                    this.props.history.push('/home');
                    this.props.setIsLogedin(true);    
                });
            } else
                alert("Email or password was entered incorrectly, db error");
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter email" required />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password" required />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Login</button>
            </form>
        );
    }
}

export default withRouter(Login);