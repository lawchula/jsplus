import React, { Component } from 'react';
import './Css/App.css';
import Header from './Header';
import './Css/Schedule.css';
import { Button, Table } from 'reactstrap';
import { Container } from 'react-grid-system';
import Filter from './Filter';
import Timepicker from './Timepicker';
import error from './Images/error.png';
import * as jwt_decode from 'jwt-decode';

class Schedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: [],
            day: [],
            department: [],
            company: [],
            selectSchedule: [],
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            countday: new Date().getDay(),
            show: false,
            block: [],
            showDropdown: -1,
            ShowPeriodAfterUserClick: [],
            dropdownshouldclose: false,
            TestShow: [],
            edit: false,
            disable: false,
            addperiodscheduletodb: []
        }
    }
    componentDidMount() {
        var token = localStorage.getItem('tk');
        if (token == null || token == "undefined") {
            window.location.href = "http://localhost:3000/";
        } else if (token != null || token != "undefined") {
            var decoded = jwt_decode(token);
            if (decoded.position != "Manager") {
                window.location.href = "http://localhost:3000/User";
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
                this.setState({ user: myJson })
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

        this.getSchedules();

    }

    getSchedules = () => {
        fetch('http://localhost:8080/showschedule')
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.setState({ selectSchedule: myJson })
            });
    }

    getDaysInMonth = (month, year) => {
        var date = new Date(year, month, 1);
        var days = [];
        var numofday = [];
        var TestColorAgain = [];
        var TestShowday = [];

        while (date.getMonth() === month) {
            TestShowday = new Date(date).toDateString().substr("0", "3");
            days.push(new Date(date).toDateString().substr("7", "4") + TestShowday);
            date.setDate(date.getDate() + 1);
        }
        this.setState({ day: days })

    }

    getNameofMonth = (month) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[month]
    }

    setBlock = (month, year) => {
        var count = new Date(year, month + 1, 0).getDate();
        var a = []
        for (var i = 1; i <= count; i++) {
            a.push(i)
        }
        this.setState({ block: a })
    }

    showPopup = () => {
        this.setState({
            show: !this.state.show
        });
    }

    SendMultidimension(x, y, User_ID) {
        if (this.state.edit === false) {
            if (this.state.showDropdown[0] != x || this.state.showDropdown[1] != y) {
                this.setState({ showDropdown: [x, y], dropdownshouldclose: false })
            }
        } else {
            this.setState({ dropdownshouldclose: true })
        }
    }

    dropdownTest = () => {
        this.props.dropdownTest()
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

    showButtonAfterEdit = () => {
        const { edit } = this.state
        this.setState({ edit: !edit, disable: true })
    }

    finishEdit = () => {
        const { edit } = this.state
        this.setState({ edit: !edit, disable: false })
    }

    AddPeriod = async (PeriodUserClick, x, y, event, e) => {
        this.CloseDropdown();

        const checkSelectedPeriod = this.state.selectSchedule.findIndex(period => {
            return period.Period_ID == PeriodUserClick.Period_ID &&
                period.User_ID == event.User_ID &&
                period.Date == e
        })

        if (checkSelectedPeriod > -1) {
            alert('Selected')
            return;
        }
        const show = { ...this.state.TestShow }
        var countarray = 0;

        const oldShow = show[`${event.User_ID},${e}`]
        if (Array.isArray(oldShow)) {
            if (oldShow.findIndex(show => {
                return show.Period_Name == PeriodUserClick.Period_Name
            }) === -1)
                show[`${event.User_ID},${e}`] = [...oldShow, PeriodUserClick].sort(function (a, b) {
                    let t1 = parseInt(a.Period_Time_One.replace(':', ''));
                    let t2 = parseInt(b.Period_Time_One.replace(':', ''));
                    return t1 - t2;
                })
        } else {
            show[`${event.User_ID},${e}`] = [PeriodUserClick]
        }
        this.setState({ TestShow: show })
    }

    DeletePeriodInSchedule(show, event, e) {
        const key = `${event.User_ID},${e}`;
        const DeletePeriod = this.state.TestShow[key].filter(value => {
            return value.Period_Name != show.Period_Name
        })
        this.state.TestShow[key] = DeletePeriod;
        if (!this.state.TestShow[key].length) {
            let testShow = this.state.TestShow;
            delete testShow[key];
            this.setState({ TestShow: testShow })
        }
    }

    InsertPeriodtoSchedule = () => {
        const Url = 'http://localhost:8080/schedule';
        const othepram = {
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                addperiodscheduletodb: this.state.TestShow
            }),
            method: "POST"
        };
        fetch(Url, othepram)
            .then(data => { return data.json() })
            .then(res => {
                console.log(res)
                this.setState({ TestShow: [] })
                this.getSchedules();
            })
            .catch(error => console.log(error))
    }

    CloseDropdown = () => {
        this.setState({ showDropdown: -1, dropdownshouldclose: true })
    }

    DeletePeriodFromDB = (periodinschedule) => {
        if (!window.confirm("Do you want to delete this period!!")) return
        const Url = 'http://localhost:8080/schedule/delete';

        const othepram = {
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                DeletePeriodDB: periodinschedule
            }),
            method: "POST"
        };
        fetch(Url, othepram)
            .then(data => { return data.json() })
            .then(res => {
                this.getSchedules();
            })
            .catch(error => console.log(error))
    }

    render() {

        return (
            <div className="Schedule">
                <Header />
                <Container className="Schedule" fluid>
                    <div className="before-schedule">
                        <p className="stat"><b><i>STATISTIC</i></b></p>
                        <div className="stat-schedule">
                            <Button color="btn btn-light" className="gbutton" onClick={this.showPopup} style={{ color: '#E37222' }}><b>FILTER</b></Button>{' '}
                            <Filter show={this.state.show} onClose={this.showPopup} getSchedule={this.getSchedules.bind(this)}>
                            </Filter>
                        </div>
                        <div id="filter">
                            <Button color="btn btn-light" className="p1" style={{ color: '#E37222' }} ><b>WORK HOUR:</b></Button>
                            <Button color="btn btn-light" className="p2" style={{ color: '#E37222' }} ><b>DONE:</b></Button>
                            <Button color="btn btn-light" className="p3" style={{ color: '#E37222' }}><b>REMAIN:</b></Button>
                        </div>
                    </div>
                    <Table bordered responsive className="tests">
                        <thead>
                            <tr id="tr1">
                                <th colSpan="16" >Company : {this.state.company.map(event => { return <h20>{event.Company_Name}</h20> })}</th>
                                <th colSpan="15">Department : {this.state.department.map(event => { return <h20>{event.Department_Name}</h20> })} </th>
                                <td colSpan="2" style={{ marginLeft: 10 }}><button id="edit-schedule" onClick={this.showButtonAfterEdit} disabled={this.state.disable}>Edit</button></td>
                            </tr>
                            <tr id="tr2">
                                <th colSpan="33">{this.getNameofMonth(this.state.month) + "  " + this.state.year} </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className="name" colSpan="2" id="name-schedule">NAME</th>
                                {this.state.day.map((event, i) => { return <th style={{ backgroundColor: this.ShowDayColorOnSchedule(event) }} className="day">{event} </th> })}
                            </tr>
                            {this.state.user.map((event, x) => {
                                return <tr className="test2">
                                    {/* เอาค่า username มาแสดง*/}
                                    <td colSpan="2">{event.Name}</td>
                                    {/* เอาค่าวันที่มา set เป็นช่อง */}
                                    {this.state.block.map((e, y) => {
                                        return <td style={{ backgroundColor: 'white' }} onClick={() => this.SendMultidimension(x, y)}>
                                            {/* เอาค่า period จาก db มาแสดง */}
                                            {this.state.selectSchedule.map(periodinschedule => {
                                                if (event.User_ID == periodinschedule.User_ID && periodinschedule.Date == e)
                                                    return <div id="period-container">
                                                        <div style={{ backgroundColor: periodinschedule.Period_Color }} id="period-time">{periodinschedule.Period_Time_One + "-" + periodinschedule.Period_Time_Two}</div>
                                                        <div id="edit">
                                                            {this.state.edit ?
                                                                <div>
                                                                    <img src={error} id="edit-icon" onClick={() => this.DeletePeriodFromDB(periodinschedule)}></img>
                                                                </div>
                                                                :
                                                                <div id="wtf"></div>}
                                                        </div>
                                                    </div>
                                            })}
                                            {/* เรียกปุ่ม dropdown มา set เวลาลง ตาราง  */}
                                            {this.state.edit === false ?
                                                this.state.showDropdown[0] === x &&
                                                this.state.showDropdown[1] === y &&
                                                !this.state.dropdownshouldclose &&
                                                <Timepicker CloseDropdown={this.CloseDropdown.bind(this)} AddPeriod={(PeriodUserClick) => this.AddPeriod(PeriodUserClick, x, y, event, e)} />
                                                :
                                                false}
                                            {/* เอาค่า period จาก state มาแสดง */}
                                            {Array.isArray(this.state.TestShow[`${event.User_ID},${e}`])
                                                &&
                                                this.state.TestShow[`${event.User_ID},${e}`].map((show) =>
                                                    <div id="period-container">
                                                        <div style={{ width: 35, backgroundColor: show.Period_Color }} id="period-time">{show.Period_Time_One + "-" + show.Period_Time_Two}</div>
                                                        {this.state.edit ?
                                                            <div>
                                                                <img src={error} id="edit-icon2" onClick={() => this.DeletePeriodInSchedule(show, event, e)}></img>
                                                            </div>
                                                            :
                                                            <div id="wtf"></div>}
                                                    </div>)}
                                        </td>
                                    })}
                                </tr>
                            })}
                        </tbody>
                    </Table>
                    <div style={{ display: "flex", float: 'right' }}>
                        {this.state.edit && <Button color="btn btn-light" style={{ color: '#E37222', marginRight: 10, marginTop: 20 }} onClick={this.finishEdit}><b>OK</b></Button>}
                        <Button color="btn btn-light" style={{ color: '#E37222', marginTop: 20, marginRight: 10 }} onClick={() => this.InsertPeriodtoSchedule(this.state.TestShow)}><b>SAVE</b></Button>{' '}
                    </div>
                </Container>
            </div>
        );
    }
}

export default Schedule;
