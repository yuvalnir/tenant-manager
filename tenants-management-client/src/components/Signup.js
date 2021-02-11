import React, { Component } from "react";

import { withRouter } from 'react-router-dom';

class SignUp extends Component {

    /** handleSubmit - responsible for user creation,
    if user created successfully screen will move to login page */
    handleSignUp = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);
        console.log("{email: " + data.get('email') + " password: " + data.get('password') + " firstName: " + data.get('first-name') + " lastName: " + data.get('last-name') + "}"); //test print

        fetch('http://localhost:8082/userapi/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstname: data.get('first-name'),
            lastname: data.get('last-name'),
            email: data.get('email'),
            password: data.get('password')
          })
        })
        .then(response => {
            console.log(response); //delete later
            console.log(response.body); //delete later
            console.log(response.status); //delete later
            if(response.status === 201) {
                alert("User created successfully");
                this.props.history.push('/login');
            }
            else
                alert("User wasn't created, db error");
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSignUp.bind(this)}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" name="first-name" className="form-control" placeholder="First name" required/>
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" name="last-name" className="form-control" placeholder="Last name" required/>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter email" required/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password" required/>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
            </form>
        );
    }
}

export default withRouter(SignUp);
