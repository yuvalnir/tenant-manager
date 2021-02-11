import React, { Component } from "react";
import { withRouter } from 'react-router-dom';


class AddTenant extends Component {

    handleAddTenant = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        fetch('http://localhost:8082/tenantapi/tenant', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        Authorization : `Bearer ${localStorage.getItem('token')}` 
                     },
            body: JSON.stringify({
                tenantmanager: localStorage.getItem("userId"),
                name: data.get('name'),
                phonenumber: data.get('phone-number'),
                address: data.get('address'),
                debt: data.get('debt'),
            })
        })
            .then(response => {
                if (response.status === 201){
                    console.log("Tenant created successfully");
                    this.props.history.push('/home');
                }
            })
            .catch(err => { console.log(err) })
    }

    render() {

        return (
            <div className="add-tenant-page">
                <div className="add-page-title"> <h1>Add Tenant</h1> </div>

                <form className="add-tenant-page-form" onSubmit={this.handleAddTenant.bind(this)}>

                    <div className="form-group">
                        <div className="add-tenant-title">Name</div>
                        <input type="text" name="name" className="form-control" placeholder="Place title here" required />
                    </div>

                    <div className="form-group">
                        <div className="add-tenant-title">Phone Number</div>
                        <input type="text" name="phone-number" className="form-control" placeholder="Place phone number here" required />
                    </div>

                    <div className="form-group">
                        <div className="add-tenant-title">Address</div>
                        <input type="text" name="address" className="form-control" placeholder="Place address here" required />
                    </div>

                    <div className="form-group">
                        <div className="add-tenant-title">Financial Debt</div>
                        <input type="text" name="debt" className="form-control" placeholder="Place debt amount here" required />
                    </div>

                    <button type="submit" className="btn btn-light btn-block">Add Tanent</button>
                </form>
            </div>
        );
    }
}

export default withRouter(AddTenant);