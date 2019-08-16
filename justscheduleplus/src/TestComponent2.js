import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';




class TestComponent2 extends Component {

  constructor(props) {
    super(props)
    this.state = {
      show: false,
      showregis: false
    }
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


  render() {


    return (
      <div>
        <button onClick={this.showLogin}>Test</button>
        <button onClick={this.showRegister}>Test</button>
        <Login show={this.state.show} onClose={this.showLogin}></Login>
        <Register show={this.state.showregis} onClose={this.showRegister}></Register>
       
      </div>
    );
  }
}

export default TestComponent2