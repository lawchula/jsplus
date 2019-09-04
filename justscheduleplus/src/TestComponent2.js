import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import CreateCompany from './CreateCompany';
import AOS from 'aos';
import 'aos/dist/aos.css';




class TestComponent2 extends Component {

  constructor(props) {
    super(props)
    this.state = {
      show: false,
      showregis: false,
      showcompany: false
    }
  }

  componentDidMount(){
    AOS.init({
      duration : 2000
    })
  }


  showLogin = () => {
    this.setState({
      show: !this.state.show
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

 

  render() {


    return (
      <div>
        <button onClick={this.showLogin}>Test</button>
        <button onClick={this.showRegister}>Test</button>
        <button onClick={this.showCreateCompany}>Company</button>
        <CreateCompany show={this.state.showcompany} onClose={this.showCreateCompany}></CreateCompany>
        <Login show={this.state.show} onClose={this.showLogin}></Login>
        <Register show={this.state.showregis} onClose={this.showRegister}></Register>
        <div data-aos='fade-right' style={{height:300,width:300,backgroundColor:'red',marginTop:1000}}> 

        </div>
       
      </div>
    );
  }
}

export default TestComponent2