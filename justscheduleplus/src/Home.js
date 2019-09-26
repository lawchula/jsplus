import React, { Component } from "react";
import Header from "./Header";
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Css/NewHomepage.css';
import manager from './Images/manager.png';
import staff from './Images/staff.png';
import admin from './Images/admin.png';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
      showregis: false,
    };
  }

  componentDidMount() {
    AOS.init({
      duration: 3000
    })
  }

  render() {

   
    return (
      <div className="Home">
        <Header />
        <div className="home-img">
            <div className="layer">
                <span className="h-t1">WE ARE SCHEDULE MANAGEMENT WEBSITE</span>
                <span className="h-t2">MAKE YOUR LIFE EASIER</span>
                <span className="h-t3">GET START NOW</span>
                <div style={{display:'flex'}}>
                    <button className="b-h1">CREATE COMPANY</button>
                    <button className="b-h1" style={{marginLeft:10}}>JOIN COMPANY</button>
                </div>
            </div>
        </div>
        <div className="h-content">
            <span className="c-t1">What are we offer</span>
            <span className="c-t2">we offering online schedule management</span>
            <div className="contents">
                <div className="cover-func col-4">
                    <div className="c-func" data-aos="flip-right">
                          <img src={manager} className="func-pic"></img>
                          <span className="role-func">Manager</span>
                          <span className="role-func2">Able to manage staff's work schedule</span>
                          <span className="role-func2"> Able to change work schedule everytime</span>
                          <span className="role-func2"> Able approve or reject staff's request for changing schedule
                            or personal leave</span>
                    </div>
                </div>
                <div className="cover-func col-4">
                    <div className="c-func" data-aos="flip-right">
                    <img src={staff} className="func-pic"></img>
                    <span className="role-func">Staff</span>
                    <span className="role-func2">View work schedule</span>
                    <span className="role-func2">Able to request for changing schedule or personal leave</span>
                    <span className="role-func2">View work statistic</span>
                    </div>
                </div>
                <div className="cover-func col-4">
                    <div className="c-func" data-aos="flip-right">
                    <img src={admin} className="func-pic"></img>
                    <span className="role-func">Administrator</span>
                    <span className="role-func2">Create company and department for other user</span>
                    <span className="role-func2"> Send verifly E-mail to user</span>
                    <span className="role-func2">Import user's information from excel and export schedule to
                  excel</span>
                    </div>
                </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Home;
