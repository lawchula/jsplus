import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import './Css/App.css';
// import TestComponent2 from './TestComponent2';
import Schedule from './Schedule';
import Home from './Home';
// import CreateCompany from './CreateCompany';
// import Department from './Department';
// import Register from './Register';
// import Login from './Login';
// import CreateDepartment from './CreateDepartment';
import User from './User';





class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/" component = {Home} />
          <Route path = "/Schedule" component = {Schedule} />
          <Route path = "/User" component = {User} />
        </Router>
      {/* <Schedule/>  */}
      {/* <User></User> */}
       {/* <TestComponent2/> */}
       {/* <Register/> */}
       {/* <Home></Home> */}
       {/* <Department></Department> */}
       {/* <CreateDepartment></CreateDepartment> */}
      </div>
    );
  }
}

export default App;
