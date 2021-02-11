import React, { Component } from "react";
import { withRouter } from 'react-router-dom';


class EditTenant extends Component {

    handleEditTenant = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);
        console.log(this.props.location.state.tenant);
        fetch('http://localhost:8082/tenantapi/tenant', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
                        Authorization : `Bearer ${localStorage.getItem('token')}` 
                     },
            body: JSON.stringify({
                name: data.get('name'),
                phonenumber: data.get('phone-number'),
                address: data.get('address'),
                debt: data.get('debt'),
                id: this.props.location.state.tenant._id,
            })
        })
            .then(response => {
                if (response.status === 201){
                    console.log("Tenant Updated successfully");
                    this.props.history.push('/home');
                }
            })
            .catch(err => { console.log(err) })
    }

    render() {
const tenant = this.props.location.state.tenant;
        return (
            <div className="add-tenant-page">
                <div className="add-page-title"> <h1>Update Tenant</h1> </div>

                <form className="add-tenant-page-form" onSubmit={this.handleEditTenant.bind(this)}>

                    <div className="form-group">
                        <div className="add-tenant-title">Name</div>
                        <input type="text" name="name" className="form-control" defaultValue={tenant.name} required />
                    </div>

                    <div className="form-group">
                        <div className="add-tenant-title">Phone Number</div>
                        <input type="text" name="phone-number" className="form-control" defaultValue={tenant.phonenumber} required />
                    </div>

                    <div className="form-group">
                        <div className="add-tenant-title">Address</div>
                        <input type="text" name="address" className="form-control" defaultValue={tenant.address} required />
                    </div>

                    <div className="form-group">
                        <div className="add-tenant-title">Financial Debt</div>
                        <input type="text" name="debt" className="form-control" defaultValue={tenant.debt} required />
                    </div>

                    <button type="submit" className="btn btn-light btn-block">Update Tanent</button>
                </form>
            </div>
        );
    }
}

export default withRouter(EditTenant);