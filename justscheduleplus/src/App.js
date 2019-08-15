import React, { Component } from 'react';
import logo from './logo.svg';
import './Css/App.css';
import Header from './Header';
import Schedule from './Schedule';
import Filter from './Filter';
import Timepicker from './Timepicker';
import TestComponent2 from './TestComponent2';
import Login from './Login';




class App extends Component {
  render() {
    return (
      <div className="App">
      {/* <Schedule/>  */}
       <TestComponent2/>
       {/* <Login/> */}
      </div>
    );
  }
}

export default App;
