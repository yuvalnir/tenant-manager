import React, { Component } from "react";
import { withRouter, Link } from 'react-router-dom';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { selectFilter, textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

class Home extends Component {

    constructor(props) {
        super()
        this.handleDelete.bind(this);
        this.GetActionFormat.bind(this);
        this.state = {
            tenants: [],
        }
    }

    fetchAllTenants = () => {
        fetch(`http://localhost:8082/tenantapi/tenants/${localStorage.getItem('userId')}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                if (response.status === 200) {
                    response.json().then(jsonObj => {
                        this.setState({ tenants: jsonObj.data });
                    });
                }
            })
            .catch(err => { console.log(err) })
    }

    handleDelete = (e, tenant) => {
        e.preventDefault();
        console.log(tenant); //delete later

        fetch(`http://localhost:8082/tenantapi/tenant/${tenant._id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
            .then(response => {
                if (response.status === 200) {
                    const index = this.state.tenants.findIndex(element => element._id === tenant._id);
                    this.state.tenants.splice(index, 1);
                    this.setState({ tenants: this.state.tenants });
                }
            })
            .catch(err => { console.log(err) })
    }

    GetActionFormat = (cell, row) => {
        return (
            <div>
                <Link
                    to={{
                        pathname: "/edittanent",
                        state: { tenant: row }
                    }}
                ><Button size="sm" variant="outline-dark">Update</Button></Link>
                <Button size="sm" variant="outline-danger" onClick={(e) => this.handleDelete(e, row)}>Delete</Button>
            </div>
        );
    }

    componentDidMount() {
        this.fetchAllTenants();
    }

    render() {

        const selectOptions = {
            0: "Without a debt",
            1: "With debt"
        };

        const columns = [{
            dataField: 'name',
            text: 'Name',
            filter: textFilter()
        }, {
            dataField: 'phonenumber',
            text: 'Phone Number'
        }, {
            dataField: 'address',
            text: 'Address'
        }, {
            dataField: 'debt',
            text: 'Financial Debt',
            filter: selectFilter({
                options: selectOptions,
                onFilter:  (filterValue) => {
                    switch (filterValue) {
                        case "0":
                            return this.state.tenants.filter(v => v.debt === 0);
                        case "1":
                            return this.state.tenants.filter(v => v.debt > 0);
                        default:
                            return this.rows;
                    }
                }
            })
        }, {
            dataField: 'actions',
            text: 'Actions',
            isDummyField: true,
            csvExport: false,
            formatter: this.GetActionFormat,
        }];

        return (

            <div className="main-container">
                <h3>home screen</h3>
                <div className="title-and-dropdown">
                    <h6>Tanents table</h6>
                    <Link to={{ pathname: "/addtanent" }}>
                        <Button variant="light">Add Tenant</Button>
                    </Link>
                </div>
                <div className="table-container">
                    <BootstrapTable keyField="_id" data={this.state.tenants} columns={columns} filter={filterFactory()} striped hover></BootstrapTable>
                </div>
            </div>
        );
    }
}

export default withRouter(Home);