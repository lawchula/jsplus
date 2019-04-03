import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Schedule from './Schedule';
import Filter from './Filter';




class App extends Component {
  render() {
    return (
      <div className="App">
      <Schedule/>
      </div>
    );
  }
}

export default App;
