import React, { Component } from 'react';
import './Css/App.css';
import TestComponent2 from './TestComponent2';
import Schedule from './Schedule';





class App extends Component {
  render() {
    return (
      <div className="App">
      <Schedule/> 
      {/* <TestComponent2/> 
       {/* <Login/> <TestComponent2/> */}
      </div>
    );
  }
}

export default App;
