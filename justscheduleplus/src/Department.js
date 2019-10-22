import React, { Component } from 'react';
import './Css/Department.css';
import * as firebase from 'firebase';
import plus from './Images/plus.png';
import url from './url';

class Department extends Component {

    constructor(props) {
        super(props)
        this.state = {
            company: [],
            loading: true
        }
    }

    componentDidMount() {
        console.log("TEST")
        this.getCompanyFromDB()
    }

    getCompanyFromDB = async () => {
        var token = localStorage.getItem('tk')
        const othepram = {
            headers: {
                tkAuth: token,
            },
            method: "GET"
        };
        console.log(token)
        console.log(url)
        const data = await Promise.all([
            fetch(url + '/get/company', othepram)
                .then((response) => {
                    return response.json();
                })
        ])

        const [company] = data
        this.setState({ company, loading: false })
    }


    render() {
        const { company, loading } = this.state
        const compayname = company.map((event, i) => { return <span className="second-description" key={i}>{event.Company_Name}</span> })
        const companymail = company.map((event, i) => { return <span className="second-description" key={i}>{event.Company_Mail}</span> })
        const companytel = company.map((event, i) => { return <span className="second-description" key={i}>{event.Company_Tel}</span> })
        const companypicture = company.map((event, i) => { return <img key={i} className="company-pictures" src={event.Company_Picture} ></img> })



        return (
            <div className="department-container">
                {!loading &&
                    <React.Fragment>
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
                                <div className="create-department">
                                    <img src={plus} style={{ height: 32 }}></img>
                                </div>
                                <span style={{ marginLeft: 5 }}>Create Department</span>
                            </div>
                        </div>
                    </React.Fragment>
                }
            </div>
        );
    }

}

export default Department