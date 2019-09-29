import React, { Component } from 'react';
import './Css/User.css';
import { Button, Table } from 'reactstrap';
import { Container } from 'react-grid-system';
import Header from './Header';
import * as jwt_decode from 'jwt-decode';
import RequestPopup from './RequestPopup';
import RequestAbsent from './RequestAbsent';

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
            alreadyReq: [],
            block: [],
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            count: 0,
            zIndex: 6,
            zIndex2: 0,
            firstScheduleDetail: null,
            secondScheduleDetail: null,
            userAbsent: null,
            scheduleAbsentDetail: null,
            firstUser: null,
            secondUser: null,
            request: true,
            requestAbsent: true,
            loading: true,
            showReqAbsentPopup: false,
            showReqPopup: false,
            showPeriod: [],
            currentDay: new Date().getDate(),
            checkReq: [],
            checkHasReq: []
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
            window.location.href = "/";
        } else if (token != null && token != "undefined") {
            var decoded = jwt_decode(token);
            if (decoded.position == "Manager" || decoded.position == "Admin") {
                window.location.href = "/Schedule";
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

    getSchedules = async () => {
        var token = localStorage.getItem('tk');
        let month = this.state.month;
        const othepram = {
            headers: {
                tkAuth: token,
                month: month
            },
            method: "GET"
        };

        const data = await Promise.all([
            fetch('http://localhost:8080/showschedule', othepram)
                .then((response) => {
                    return response.json();
                }),
            fetch('http://localhost:8080/already/request', othepram)
                .then((response) => {
                    return response.json();
                }),
            fetch("http://localhost:8080/showperiod", othepram)
                .then(response => {
                    return response.json();
                })
        ])

        const [schedule, alreadyReq, showPeriod] = data
        this.setState({ schedule, alreadyReq, showPeriod, loading: false })
    }


    getNameofMonth = (month) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[month]
    }

    ShowDayColorOnSchedule = (event) => {
        var dayStr = event.substr(event.length - 3)
        var dayStr1 = event.substr(1, 2)
        if (dayStr1 == this.state.currentDay) {
            return "#15da88"
          }else{
            switch (dayStr) {
                case 'Sat':
                    return "#A9A9A9"
                case 'Sun':
                    return "#A9A9A9"
            }
        }
    }

    ShowUserColorOnSchedule = (user) => {
        if (user == 0) {
            return "userloggedcolor"
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

    clickRequestAbsent = () => {
        this.setState({
            requestAbsent: !this.state.requestAbsent, count: 0
        })
    }

    showRequestPopup = () => {
        this.setState({
            showReqPopup: !this.state.showReqPopup,
            request: true
        })
    }

    showRequestAbsentPopup = () => {
        this.setState({
            showReqAbsentPopup: !this.state.showReqAbsentPopup,
            requestAbsent: true
        })
    }

    cancleRequest = () => {
        this.setState({
            firstScheduleDetail: null,
            secondScheduleDetail: null,
            firstUser: null,
            secondUser: null,
            count: 0,
            showReqPopup: false,
            request: true
        })
    }

    cancleAbsentRequest = () => {
        this.setState({
            userAbsent: null,
            scheduleAbsentDetail: null,
            count: 0,
            showReqAbsentPopup: false,
            requestAbsent: true
        })
    }
    checkRequest(name, date, y) {
        const checkCount = this.state.count
        const request = this.state.request
        // if(y < this.state.currentDay){
        //     alert('Error')
        //     this.setState({
        //         request: !this.state.request
        //     })
        // }else{
        if (request != true) {
            if (checkCount == 0) {
                this.setFirstRequest(name, date);
            }
            else {
                this.setSecondRequest(name, date);
            }
        } else if (this.state.requestAbsent != true) {
            this.userRequestAbsent(name, date)
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

    setSecondRequest(name, date) {
        const arr = []
        this.setState({ secondUser: name });
        this.state.schedule.map(e => {
            if (e.User_ID == name.User_ID && e.Date == date) {
                arr.push(e)
                this.setState({ secondScheduleDetail: arr})
            }
        })

        this.getPeriodForChange(arr);
    }

    getPeriodForChange(arr){
        let userID = this.state.firstScheduleDetail[0].User_ID;
        let date = arr[0].Date
        let reqDate = this.state.firstScheduleDetail[0].Date;
        let reqUserID = arr[0].User_ID
        let arrays = [];
        let array = [];

        this.state.schedule.map(period => {
            if(period.User_ID === userID && period.Date === date){
                array.push(period)
            }
        })

        this.state.schedule.map(period => {
            if(period.User_ID === reqUserID && period.Date === reqDate){
                arrays.push(period)
            }
        })

        this.setState({ checkReq: array, checkHasReq: arrays,count: 0, request: false, zIndex: 6, zIndex2: 0 })
        this.showRequestPopup();
    }

    userRequestAbsent(name, date) {
        const arr = []
        this.setState({ userAbsent: name });
        this.state.schedule.map(e => {
            if (e.User_ID == name.User_ID && e.Date == date) {
                arr.push(e)
                this.setState({ scheduleAbsentDetail: arr, count: 0, zIndex2: 6 })
                this.showRequestAbsentPopup();
            }
        })

    }

    render() {
        const { loading, count, alreadyReq } = this.state
        const users = this.state.user.map((name, user) => {
            return <tr className="test2">
                <td colSpan="2" className={"block" && this.ShowUserColorOnSchedule(user)} style={{ zIndex: count === 0 && user < 1 ? this.state.zIndex : (count === 1 && user > 0 ? this.state.zIndex2 : 0) }} >{name.Name}</td>
                {this.state.block.map((date, y) => {
                    return <td style={{ backgroundColor: 'white' }} className="block" style={{ zIndex: count === 0 && user < 1 ? this.state.zIndex : (count === 1 && user > 0 ? this.state.zIndex2 : 0) }} onClick={() => this.checkRequest(name, date, y)}>
                        {this.state.schedule.map(periodInSchedule => {
                            if (name.User_ID == periodInSchedule.User_ID && periodInSchedule.Date == date)
                                return <div id="period-container">
                                    <div style={{ backgroundColor: periodInSchedule.Period_Color }} id="period-time">{periodInSchedule.Period_Time_One + "-" + periodInSchedule.Period_Time_Two}</div>
                                    <div id="wtf"></div>
                                </div>
                        })
                        }
                    </td>
                })}
            </tr>
        })

        const date = this.state.day.map((event, i) => { return <th style={{ backgroundColor: this.ShowDayColorOnSchedule(event) }} className="day">{event} </th> })

        const showperiod = this.state.showPeriod.map((event) => {return <div style={{display:'flex'}}>
             <div style={{backgroundColor: event.Period_Color,marginLeft:5}} className="period-color">
                
             </div>
             <span style={{marginLeft:5}}>{event.Period_Name}</span>
             <span style={{marginLeft:5}}>{event.Period_Time_One} - </span>
             <span style={{marginLeft:5}}>{event.Period_Time_Two}</span>
        </div>})

        return (
            <div className="User">
                {
                    !loading && (<React.Fragment>
                        <Header Schedule={this.getSchedules}></Header>
                        <Container className="User" fluid>
                            <span className="show-position">STAFF</span>
                            <div className="before-schedule">
                                <p className="stat"><b>STATISTIC</b></p>
                                <div className="request-schedule">
                                    <button className="b-request" onClick={this.request}>Request</button>
                                    <button className="b-request" onClick={this.clickRequestAbsent} style={{ marginLeft: 10 }}>ABSENCE</button>
                                    <div className="period-description">
                                    {showperiod}
                                    </div>
                                </div>
                                <div id="filter">
                                    <div className="b-static">WORK HOUR:</div>
                                    <div className="b-static">DONE:</div>
                                    <div className="b-static">REMAIN:</div>
                                </div>
                            </div>
                            <div className="request" hidden={this.state.request} onClick={this.cancleRequest}>

                            </div>
                            <div className="request" hidden={this.state.requestAbsent} onClick={this.cancleAbsentRequest}>

                            </div>
                            <Table bordered responsive className="user-schedule">
                                <thead className='user-name'>
                                    <tr id="user-tr1">
                                        <th colSpan={this.state.block.length / 2 + 1} >Company : {this.state.company.map(event => { return <h20>{event.Company_Name}</h20> })}</th>
                                        <th colSpan={this.state.block.length / 2 + 1}>Department : {this.state.department.map(event => { return <h20>{event.Department_Name}</h20> })} </th>
                                    </tr>
                                    <tr id="user-tr2">
                                        <th colSpan={this.state.block.length + 2}>{this.getNameofMonth(this.state.month) + "  " + this.state.year} </th>
                                    </tr>
                                </thead>
                                <tbody className='user-name'>
                                    <th className="user-name" colSpan="2" id="name-schedule">NAME</th>
                                    {date}
                                    {users}
                                    {
                                        this.state.secondScheduleDetail &&
                                        <RequestPopup show={this.state.showReqPopup}
                                            alreadyReq={this.state.alreadyReq}
                                            firstScheduleDetail={this.state.firstScheduleDetail}
                                            secondScheduleDetail={this.state.secondScheduleDetail}
                                            firstUser={this.state.firstUser}
                                            secondUser={this.state.secondUser}
                                            month={this.state.month}
                                            year={this.state.year}
                                            showPeriod={this.state.showPeriod}
                                            checkReq = {this.state.checkReq} 
                                            checkHasReq = {this.state.checkHasReq}
                                            onClose={this.cancleRequest}
                                            schedule={this.getSchedules}></RequestPopup>
                                    }
                                    {
                                        this.state.scheduleAbsentDetail &&
                                        <RequestAbsent show={this.state.showReqAbsentPopup} alreadyReq={this.state.alreadyReq} userAbsent={this.state.userAbsent} scheduleAbsentDetail={this.state.scheduleAbsentDetail} month={this.state.month}
                                            year={this.state.year} onClose={this.cancleAbsentRequest} schedule={this.getSchedules}></RequestAbsent>}
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