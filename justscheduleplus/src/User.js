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
            department: [],
            company: [],
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            block: [],
            class: 'Schedule',
            request: true,
            users:['kuy1','kuy2','kuy3']
        }
    }

    componentDidMount() {
        var token = localStorage.getItem('tk');
        if (token == null || token == "undefined") {
            window.location.href = "http://localhost:3000/";
        } else if (token != null || token != "undefined") {
            var decoded = jwt_decode(token);
            if (decoded.position == "Manager" || decoded.position == "Admin") {
                window.location.href = "http://localhost:3000/Schedule";
            }
        }
        this.SelectDataFromDB();

        this.getDaysInMonth(this.state.month, this.state.year)
        this.setBlock(this.state.month, this.state.year)
    }

    SelectDataFromDB = () => {
        var token = localStorage.getItem('tk');
        const othepram = {
            headers: {
                tkAuth: token
            },
            method: "GET"
        };

        fetch('http://localhost:8080/users', othepram)
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                console.log(myJson)
                this.setState({ user: myJson })
                console.log(this.state.user)
                
            });

        fetch('http://localhost:8080/company', othepram)
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.setState({ company: myJson })
            });

        fetch('http://localhost:8080/department', othepram)
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.setState({ department: myJson })
            });

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

    render() {

        //เอา user มาแสดง
        const users = this.state.user.map((event, x) => {
            return <tr className="test2">
                <td colSpan="2">{event.Name}</td>
                {this.state.block.map((e, y) => { return <td style={{ backgroundColor: 'white' }}></td> })}
            </tr>
        })
        // //เอา วันที่มาแสดง
        const date = this.state.day.map((event, i) => { return <th style={{ backgroundColor: this.ShowDayColorOnSchedule(event) }} className="day">{event} </th> })

        return (
            <div className="User">
                <Header></Header>

                <Container className="user-Schedule" fluid>
                    <div className="before-schedule">
                        <div id="filter">
                            <Button color="btn btn-light" className="p1" style={{ color: '#E37222' }} ><b>WORK HOUR:</b></Button>
                            <Button color="btn btn-light" className="p2" style={{ color: '#E37222' }} ><b>DONE:</b></Button>
                            <Button color="btn btn-light" className="p3" style={{ color: '#E37222' }}><b>REMAIN:</b></Button>
                        </div>
                    </div>
                    <div className="request" hidden={this.state.request}>

                    </div>
                    <Table bordered responsive className="user-schedule">
                        <thead className='user-name'>
                            <tr id="user-tr1">
                                <th colSpan="16" >Company : {this.state.company.map(event => { return <h20>{event.Company_Name}</h20> })}</th>
                                <th colSpan="15">Department : {this.state.department.map(event => { return <h20>{event.Department_Name}</h20> })} </th>
                            </tr>
                            <tr id="user-tr2">
                                <th colSpan="33">{this.getNameofMonth(this.state.month) + "  " + this.state.year} </th>
                            </tr>
                        </thead>
                        <tbody className='user-name'>
                            <th className="user-name" colSpan="2" id="name-schedule">NAME</th>
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