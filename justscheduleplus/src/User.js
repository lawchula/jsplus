import React, { Component } from 'react';
import './Css/User.css';
import { Button, Table } from 'reactstrap';
import { Container } from 'react-grid-system';
import Header from './Header';
import * as jwt_decode from 'jwt-decode';
import RequestPopup from './RequestPopup';

class User extends Component {

    constructor(props) {
        super(props)
        this.state = {
            class: 'Schedule',
            user: [],
            day: [],
            department: [],
            company: [],
            schedule: [],
            block: [],
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            count: 0,
            zIndex: 6,
            zIndex2: 0,
            firstScheduleDetail: null,
            secondScheduleDetail: null,
            firstUser: null,
            secondUser: null,
            request: true,
            loading: true,
            showReqPopup: false
        }
    }

    async componentDidMount() {
        await this.checkToken();
        this.getDaysInMonth(this.state.month, this.state.year)
        this.setBlock(this.state.month, this.state.year)
    }

    async checkToken() {
        var token = localStorage.getItem('tk');
        if (token == null || token == "undefined") {
            window.location.href = "http://localhost:3000/";
        } else if (token != null && token != "undefined") {
            var decoded = jwt_decode(token);
            if (decoded.position == "Manager" || decoded.position == "Admin") {
                window.location.href = "http://localhost:3000/Schedule";
            } else {
                await this.SelectDataFromDB();
            }
        }
    }

    SelectDataFromDB = async () => {
        var token = localStorage.getItem('tk');
        const othepram = {
            headers: {
                tkAuth: token
            },
            method: "GET"
        };

        const data = await Promise.all([
            fetch('http://localhost:8080/users', othepram)
                .then((response) => {
                    return response.json();
                }),
            fetch('http://localhost:8080/company', othepram)
                .then((response) => {
                    return response.json();
                }),
            fetch('http://localhost:8080/department', othepram)
                .then((response) => {
                    return response.json();
                }),
        ])

        const [user, company, department] = data
        this.setState({ user, company, department })

        this.getSchedules();
    }

    getSchedules = () => {
        var token = localStorage.getItem('tk');
        const othepram = {
            headers: {
                tkAuth: token
            },
            method: "GET"
        };
        fetch('http://localhost:8080/showschedule', othepram)
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.setState({ schedule: myJson, loading: false })
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
        var Showday = [];

        while (date.getMonth() === month) {
            Showday = new Date(date).toDateString().substr("0", "3");
            days.push(new Date(date).toDateString().substr("7", "4") + Showday);
            date.setDate(date.getDate() + 1);
        }
        this.setState({ day: days })

    }
    request = () => {
        this.setState({
            request: !this.state.request, count: 0
        })
    }

    cancleRequest = () => {
        this.setState({
            request: true,
            firstScheduleDetail: null,
            secondScheduleDetail: null,
            firstUser: null,
            secondUser: null
        })
    }

    checkRequest(name, date) {
        const checkCount = this.state.count
        const request = this.state.request
        if (request != true) {
            if (checkCount == 0) {
                this.setFirstRequest(name, date);
            }
            else {
                this.setSecondRequest(name, date);
            }
        }
    }

    setFirstRequest(name, date) {
        const arr = []
        this.setState({ firstUser: name });
        this.state.schedule.map(e => {
            if (e.User_ID == name.User_ID && e.Date == date) {
                arr.push(e)
                this.setState({ firstScheduleDetail: arr, count: 1, zIndex2: 6 })
            }
        })
    }

    setSecondRequest(name,date) {
        const arr = []
        this.setState({ secondUser: name });
        this.state.schedule.map(e => {
            if (e.User_ID == name.User_ID && e.Date == date) {
                arr.push(e)
                this.setState({ secondScheduleDetail: arr, count: 2, request: false, zIndex: 6, zIndex2: 0 })
                this.showRequestPopup();
            }
        })
    }

    showRequestPopup = () => {
        this.setState({
            showReqPopup: !this.state.showReqPopup,
            request: true,
        })
    }


    render() {
        const { loading, count } = this.state
        const users = this.state.user.map((name, user) => {
            return <tr className="test2">
                <td colSpan="2"  style={{ zIndex: count === 0 && user < 1 ? this.state.zIndex : (count === 1 && user > 0 ? this.state.zIndex2 : 0) }} className="block">{name.Name}</td>
                {this.state.block.map((date, y) => {
                    return <td style={{ backgroundColor: 'white' }} className="block" style={{ zIndex: count === 0 && user < 1 ? this.state.zIndex : (count === 1 && user > 0 ? this.state.zIndex2 : 0) }} onClick={() => this.checkRequest(name, date)}>
                        {this.state.schedule.map(periodInSchedule => {
                            if (name.User_ID == periodInSchedule.User_ID && periodInSchedule.Date == date)
                                return <div id="period-container">
                                    <div style={{ backgroundColor: periodInSchedule.Period_Color }} id="period-time">{periodInSchedule.Period_Time_One + "-" + periodInSchedule.Period_Time_Two}</div>
                                </div>
                        })
                        }
                    </td>
                })}
            </tr>
        })

        const date = this.state.day.map((event, i) => { return <th style={{ backgroundColor: this.ShowDayColorOnSchedule(event) }} className="day">{event} </th> })
        return (
            <div className="User">
                {
                    !loading && (<React.Fragment>
                        <Header></Header>
                        <Container className="user-Schedule" fluid>
                            <button onClick={this.request}>test</button>
                            <div className="before-schedule">
                                <div id="filter">
                                    <Button color="btn btn-light" className="p1" style={{ color: '#E37222' }} ><b>WORK HOUR:</b></Button>
                                    <Button color="btn btn-light" className="p2" style={{ color: '#E37222' }} ><b>DONE:</b></Button>
                                    <Button color="btn btn-light" className="p3" style={{ color: '#E37222' }}><b>REMAIN:</b></Button>
                                </div>
                            </div>
                            <div className="request" hidden={this.state.request} onClick={this.cancleRequest}>

                            </div>
                            <Table bordered responsive className="user-schedule">
                                <thead className='user-name'>
                                    <tr id="user-tr1">
                                        <th colSpan="16" >Company : {this.state.company.map(event => { return <h20>{event.Company_Name}</h20> })}</th>
                                        <th colSpan="16">Department : {this.state.department.map(event => { return <h20>{event.Department_Name}</h20> })} </th>
                                    </tr>
                                    <tr id="user-tr2">
                                        <th colSpan="32">{this.getNameofMonth(this.state.month) + "  " + this.state.year} </th>
                                    </tr>
                                </thead>
                                <tbody className='user-name'>
                                    <th className="user-name" colSpan="2" id="name-schedule">NAME</th>
                                    {date}
                                    {users}
                                    {
                                        this.state.secondScheduleDetail &&
                                        <RequestPopup show={this.state.showReqPopup}
                                            firstScheduleDetail={this.state.firstScheduleDetail}
                                            secondScheduleDetail={this.state.secondScheduleDetail}
                                            firstUser={this.state.firstUser}
                                            secondUser={this.state.secondUser}
                                            month={this.state.month}
                                            year={this.state.year}
                                            onClose={this.showRequestPopup}></RequestPopup>
                                    }
                                </tbody>
                            </Table>
                        </Container>
                    </React.Fragment>
                    )
                }
            </div>
        );
    }

}

export default User