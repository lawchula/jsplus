import React, { Component } from 'react';
import './Css/User.css';
import { Button, Table } from 'reactstrap';
import { Container } from 'react-grid-system';
import Header from './Header';

class User extends Component{

    constructor(props){
        super(props)
        this.state={
            user:['test1','test2','test3'],
            day: [],
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            block:[]
        }
    }

    componentDidMount(){
        this.getDaysInMonth(this.state.month, this.state.year)
        this.setBlock(this.state.month, this.state.year)
    }

    getNameofMonth = (month) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[month]
    }

    ShowDayColorOnSchedule = (event) => {
        var dayStr = event.substr(event.length - 3)
        switch (dayStr) {
            case 'Sat':
                return "#eeaa7b"
            // break;
            case 'Sun':
                return "#eeaa7b"
        }
    }

    setBlock = (month, year) => {
        var count = new Date(year, month + 1, 0).getDate();
        var a = []
        for (var i = 1; i <= count; i++) {
            a.push(i)
        }
        this.setState({ block: a })
    }

    getDaysInMonth = (month, year) => {
        var date = new Date(year, month, 1);
        var days = [];
        var TestShowday = [];

        while (date.getMonth() === month) {
            TestShowday = new Date(date).toDateString().substr("0", "3");
            days.push(new Date(date).toDateString().substr("7", "4") + TestShowday);
            date.setDate(date.getDate() + 1);
        }
        this.setState({ day: days })

    }

    render(){

        //เอา user มาแสดง
        const users = this.state.user.map((event,x) => {return <tr className="test2">
                      <td colSpan="2">{event}</td>
                      {this.state.block.map((e,y) => {return <td style={{ backgroundColor: 'white'}}></td>})}
        </tr>})
        //เอา วันที่มาแสดง
        const date =  this.state.day.map((event,i) => { return <th style={{backgroundColor: this.ShowDayColorOnSchedule(event)}} className="day">{event} </th> })

        return(
            <div className="User">
                <Header></Header>
                 <Container className="Schedule" fluid>
                    <div className="before-schedule">
                        <div id="filter"> 
                            <Button color="btn btn-light" className="p1" style={{ color: '#E37222' }} ><b>WORK HOUR:</b></Button>
                            <Button color="btn btn-light" className="p2" style={{ color: '#E37222' }} ><b>DONE:</b></Button>
                            <Button color="btn btn-light" className="p3" style={{ color: '#E37222' }}><b>REMAIN:</b></Button>
                        </div>
                    </div>
                  <Table bordered responsive className="tests">
                    <thead>
                        <tr id="tr1"> 
                            <th colSpan="16">Company :</th>
                            <th colSpan="17">Department :</th>
                        </tr>
                        <tr id="tr2">
                            <th colSpan="33">{this.getNameofMonth(this.state.month)+"  "+this.state.year} </th>
                        </tr>
                    </thead>
                    <tbody>
                    <th className="name"  colSpan="2" id="name-schedule">NAME</th>
                        {date}
                        {users}
                    </tbody>
                  </Table>                   
                </Container>
            </div>
        );
    }

}

export default User