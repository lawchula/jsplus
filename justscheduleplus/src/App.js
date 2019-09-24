import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom"
import './Css/App.css';
import Schedule from './Schedule';
import Home from './Home';
import User from './User';
import EditProfile from './EditProfile'
import TestComponent2 from './TestComponent2';





class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/" component = {Home} />
          <Route path = "/Schedule" component = {Schedule} />
          <Route path = "/User" component = {User} />
          <Route path = "/EditProfile" component = {EditProfile} />
        </Router>
      {/* <Schedule/> 
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
