import React, { Component } from 'react';
import './Css/User.css';
import { Button, Table } from 'reactstrap';
import { Container } from 'react-grid-system';
import Header from './Header';
import * as jwt_decode from 'jwt-decode';

class User extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: [],
            day: [],
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
<<<<<<< Updated upstream
            block: []
=======
            block:[],
            class: 'Schedule',
            request: true
>>>>>>> Stashed changes
        }
    }

    componentDidMount() {
        this.LoginAuthentication();
        var token = localStorage.getItem('tk');
        var decoded = jwt_decode(token);
        if (token == null || token == "undefined") {
            window.location.href = "http://localhost:3000/";
        }else if(token != null || token != "undefined") {
            if(decoded.position == "Manager" || decoded.position == "Admin"){
                window.location.href = "http://localhost:3000/Schedule";
            }
        }

        this.getDaysInMonth(this.state.month, this.state.year)
        this.setBlock(this.state.month, this.state.year)
    }

    LoginAuthentication = () => {
        const Url = 'http://localhost:8080/tk/auth';

        var token = localStorage.getItem('tk');
        const othepram = {
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                tkAuth: token
            }),
            method: "POST"
        };
        fetch(Url, othepram);
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

<<<<<<< Updated upstream
    render() {

        //เอา user มาแสดง
        const users = this.state.user.map((event, x) => {
            return <tr className="test2">
                <td colSpan="2">{event}</td>
                {this.state.block.map((e, y) => { return <td style={{ backgroundColor: 'white' }}></td> })}
            </tr>
        })
=======
    startRequest = () => {
        const {request} = this.state
        this.setState({
            request: !request
        })
    }

    render(){

        //เอา user มาแสดง
        const users = this.state.user.map((event,x) => {return <tr className="test2">
                      <td colSpan="2">{event}</td>
                      {this.state.block.map((e,y) => {return <td className="block"></td>})}
        </tr> })
>>>>>>> Stashed changes
        //เอา วันที่มาแสดง
        const date = this.state.day.map((event, i) => { return <th style={{ backgroundColor: this.ShowDayColorOnSchedule(event) }} className="day">{event} </th> })

        return (
            <div className="User">
                <Header></Header>
<<<<<<< Updated upstream
                <Container className="Schedule" fluid>
=======
                 <Container className="Schedule" fluid>
                 <Button color="btn btn-light" className="p1" style={{color:'#E37222',float:'left'}} onClick={this.startRequest}><b>REQUEST</b></Button>
>>>>>>> Stashed changes
                    <div className="before-schedule">
                        <div id="filter">
                            <Button color="btn btn-light" className="p1" style={{ color: '#E37222' }} ><b>WORK HOUR:</b></Button>
                            <Button color="btn btn-light" className="p2" style={{ color: '#E37222' }} ><b>DONE:</b></Button>
                            <Button color="btn btn-light" className="p3" style={{ color: '#E37222' }}><b>REMAIN:</b></Button>
                        </div>
                    </div>
<<<<<<< Updated upstream
                    <Table bordered responsive className="tests">
                        <thead>
                            <tr id="tr1">
                                <th colSpan="16">Company :</th>
                                <th colSpan="17">Department :</th>
                            </tr>
                            <tr id="tr2">
                                <th colSpan="33">{this.getNameofMonth(this.state.month) + "  " + this.state.year} </th>
                            </tr>
                        </thead>
                        <tbody>
                            <th className="name" colSpan="2" id="name-schedule">NAME</th>
                            {date}
                            {users}
                        </tbody>
                    </Table>
=======
                    <div className="request" hidden={this.state.request}>

                    </div>
                  <Table bordered responsive className="user-schedule">
                    <thead className='user-name'> 
                        <tr id="user-tr1"> 
                            <th colSpan="16">Company :</th>
                            <th colSpan="17">Department :</th>
                        </tr>
                        <tr id="user-tr2">
                            <th colSpan="33">{this.getNameofMonth(this.state.month)+"  "+this.state.year} </th>
                        </tr>
                    </thead>
                    <tbody className='user-name'>
                    <th className="user-name"  colSpan="2" id="name-schedule">NAME</th>
                        {date}
                        {users}
                    </tbody>
                  </Table>
>>>>>>> Stashed changes
                </Container>
            </div>
        );
    }

}

export default User