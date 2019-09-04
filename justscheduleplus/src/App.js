import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import './Css/App.css';
import TestComponent2 from './TestComponent2';
import Home from './Home';
import Schedule from './Schedule';





class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/" component = {TestComponent2} />
          <Route path = "/Schedule" component = {Schedule} />
        </Router>
      {/* <Schedule/>  */}
      {/* { <TestComponent2/> } */}
       {/* <Login/> <TestComponent2/> */}
      </div>
    );
  }
}

export default App;
