import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import CreateCompany from './CreateCompany';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CreateDepartment from './CreateDepartment';
import Request from './RequestPopup';
import RequestAbsent from './RequestAbsent';




class TestComponent2 extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showLogin: false,
      showregis: false,
      showcompany: false,
      showdepartment: false,
      showrequest: false,
      showrequestabsent: false
    }
  }

  componentDidMount(){
    AOS.init({
      duration : 2000
    })
  }

  showRequest = () => {
    this.setState({
      showrequest : !this.state.showrequest
    })
  }
  showRequestAbsent = () => {
    this.setState({
      showrequestabsent : !this.state.showrequestabsent
    })
  }

  showLogin = () => {
    this.setState({
      showLogin: !this.state.showLogin
    })
  }

  showRegister = () => {
    this.setState({
      showregis: !this.state.showregis
    })
  }

  showCreateCompany = () => {
    this.setState({
      showcompany: !this.state.showcompany
    })
  }

  showCreateDepartment = () => {
    this.setState({
      showdepartment: !this.state.showdepartment
    })
  }

 

  render() {


    return (
      <div>
        <button onClick={this.showLogin}>Test</button>
        <button onClick={this.showRegister}>Test</button>
        <button onClick={this.showCreateCompany}>Company</button>
        <button onClick={this.showCreateDepartment}>Department</button>
        <button onClick={this.showRequest}>Request</button>
        <button onClick={this.showRequestAbsent}>Request Absent</button>
        <RequestAbsent show={this.state.showrequestabsent} onClose={this.showRequestAbsent}></RequestAbsent>
        <Request show={this.state.showrequest} onClose={this.showRequest}></Request>
        <CreateCompany show={this.state.showcompany} onClose={this.showCreateCompany}></CreateCompany>
        <Login show={this.state.showLogin} onClose={this.showLogin}></Login>
        <Register show={this.state.showregis} onClose={this.showRegister}></Register>
        <CreateDepartment show={this.state.showdepartment} onClose={this.showCreateDepartment}></CreateDepartment>
        <div data-aos='fade-right' style={{height:300,width:300,backgroundColor:'red',marginTop:1000}}> 

        </div>
       
      </div>
    );
  }
}

export default TestComponent2