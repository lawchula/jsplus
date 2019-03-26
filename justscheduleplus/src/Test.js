import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Schedule from './Schedule';



class Test extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            test : "test",
            days : []
        }
    }
    test = () => {
        var day = new Date();
        day = day.getDate();
        return day;
    }

    getDaysInMonth = (month, year) => {
        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() === month) {
           days.push(new Date(date).toLocaleDateString("en-GB"));
           date.setDate(date.getDate() + 1);
        }
        return days;
   }
  render() {
    
    return (
      <div className="App">
        <p>{console.log(this.getDaysInMonth(1,2019))}</p>
      </div>
    );
  }
}

export default Test;
