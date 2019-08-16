import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./Header";
import Schedule from "./Schedule";
import Filter from "./Filter";
import Timepicker from "./Timepicker";
import TestComponent from "./TestComponent";
import Home from "./Home";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App;
