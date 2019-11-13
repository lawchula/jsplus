import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"
import './Css/App.css';
import Schedule from './Schedule';
import User from './User';
import EditProfile from './EditProfile'
import TestComponent2 from './TestComponent2';
import Home from './Home';
import Company from './Company';
import Department from './Department';
import ManagerHowToUse from "./ManagerHowToUse";
import StaffHowToUse from "./StaffHowToUse";
import AdminHowToUse from "./AdminHowToUse";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Schedule" component={Schedule} />
            <Route path="/User" component={User} />
            <Route path="/EditProfile" component={EditProfile} />
            <Route path="/Company" component={Company} />
            <Route path="/Department" component={Department} />
            <Redirect to="/" />
          </Switch>
        </Router>
        {/* <TestComponent2></TestComponent2> */}
      </div>
    );
  }
}

export default App;
