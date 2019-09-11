import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import CreateCompany from './CreateCompany';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CreateDepartment from './CreateDepartment';




class TestComponent2 extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showLogin: false,
      showregis: false,
      showcompany: false,
      showdepartment: false,
    }
  }

  componentDidMount(){
    AOS.init({
      duration : 2000
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