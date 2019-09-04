import React, { Component } from 'react';
import './Css/App.css';
import TestComponent2 from './TestComponent2';
import Schedule from './Schedule';
import Home from './Home';
import CreateCompany from './CreateCompany';
import Department from './Department';





class App extends Component {
  render() {
    return (
      <div className="App">
      {/* <Schedule/>  */}
     {/* <TestComponent2/> */}
       {/* <Home/> */}
       {/* <CreateCompany/> */}
       <Department/>
       
      </div>
    );
  }
}

export default App;
