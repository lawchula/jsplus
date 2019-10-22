import React, { Component } from 'react';
import './Css/Department.css';
import * as firebase from 'firebase';
import plus from './Images/plus.png';
import CreateDepartment from './CreateDepartment';
import Header from './Header';
import url from './url';

class Department extends Component {

    constructor(props) {
        super(props)
        this.state = {
            company:[],
            showdepartment: false,
            department:[{name:"test",telno:"029131944",member:"10"}]
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

    showCreateDepartment = () => {
        this.setState({
          showdepartment: !this.state.showdepartment
        })
      }


    render(){
        const {company,department} = this.state
        const compayname = company.map((event,i) =>  {return <span className="second-description" key={i}>{ event.Company_Name}</span>})
        const companymail = company.map((event,i) =>  {return <span className="second-description" key={i}>{event.Company_Mail}</span>})
        const companytel = company.map((event,i) =>  {return <span className="second-description" key={i}>{event.Company_Tel}</span>})
        const companypicture = company.map((event,i) =>  {return <img key={i} className="company-pictures" src={event.Company_Picture} ></img>})
        const departments = department.map((event,i) => {return <div className="departments">
             <div className="dp-img1">

            </div>
            <div className="dp-sh">
              <span>Department : {event.name}</span>
              <span>Telno : {event.telno} </span>
              <span>Member : {event.member}</span>
              <button className="b-mn">Manage</button>
            </div>

        </div>} )
       



        return (
            <div className="department-container">
                <div className="company-description">
                    {companypicture}
                    <span className="description" style={{marginTop:20}}>Company :</span>
                    {compayname}
                    <span className="description">Email :</span>
                    {companymail}
                    <span className="description">Telno :</span>
                    {companytel}
                </div>
                <div className="department">
                    <div className="create-department-container">
                        <div className="create-department" onClick={this.showCreateDepartment}> 
                           <img src={plus} style={{height:32}}></img>
                        </div>
                        <span style={{marginLeft:10}}>create department</span>
                        </div>
                        {departments}
                        
                </div>
                <CreateDepartment show={this.state.showdepartment} onClose={this.showCreateDepartment}></CreateDepartment>
            </div>

        );
    }

}

export default Department