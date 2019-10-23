import React, { Component } from 'react';
import './Css/Department.css';
import * as firebase from 'firebase';
import plus from './Images/plus.png';
import CreateDepartment from './CreateDepartment';
import Header from './Header';
import url from './url';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
class Company extends Component {

    constructor(props) {
        super(props)
        this.state = {
            company: [],
            showdepartment: false,
            department: [],
            test: []
        }
    }

    componentDidMount() {
        this.getCompanyandDepartmentFromDB()
    }

    getCompanyandDepartmentFromDB = async () => {
        var token = localStorage.getItem('tk')
        const othepram = {
            headers: {
                tkAuth: token,
            },
            method: "GET"
        };
        const data = await Promise.all([
            fetch(url + '/get/company', othepram)
                .then((response) => {
                    return response.json();
                }),
            fetch(url + '/get/department', othepram)
                .then((response) => {
                    return response.json();
                })
        ])

        const [company, department] = data
        this.setState({ company, department, loading: false })
    }

    showCreateDepartment = () => {
        this.setState({
            showdepartment: !this.state.showdepartment
        })
    }
    
    render() {
        const { company, department } = this.state
        const compayname = company.map((event, i) => { return <span className="second-description" key={i}>{event.Company_Name}</span> })
        const companymail = company.map((event, i) => { return <span className="second-description" key={i}>{event.Company_Mail}</span> })
        const companytel = company.map((event, i) => { return <span className="second-description" key={i}>{event.Company_Tel}</span> })
        const companypicture = company.map((event, i) => { return <img key={i} className="company-pictures" src={event.Company_Picture} ></img> })
        const departments = department.map((department) => {
            return <div className="departments">
                <div className="dp-img1">
                    <img className="department-pictures" src={department.Department_Picture}></img>
                </div>
                <div className="dp-sh">
                    <span>Department : {department.Department_Name}</span>
                    <span>Telno : {department.Department_TelNo} </span>
                    <Link to={{
                        pathname: '/Department',
                        state: {
                            manageDepartment: department
                        }
                    }}>Manage</Link>
                </div>

            </div>
        })




        return (
            <div className="department-container">
                <div className="company-description">
                    {companypicture}
                    <span className="description" style={{ marginTop: 20 }}>Company :</span>
                    {compayname}
                    <span className="description">Email :</span>
                    {companymail}
                    <span className="description">Telno :</span>
                    {companytel}
                </div>
                <div className="department">
                    <div className="create-department-container">
                        <div className="create-department" onClick={this.showCreateDepartment}>
                            <img src={plus} style={{ height: 32 }}></img>
                        </div>
                        <span style={{ marginLeft: 10 }}>create department</span>
                    </div>
                    {departments}

                </div>
                <CreateDepartment show={this.state.showdepartment} onClose={this.showCreateDepartment}></CreateDepartment>
            </div>

        );
    }

}

export default Company