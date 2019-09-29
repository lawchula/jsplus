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
            block: [],
            ShowPeriodAfterUserClick: [],
            TestShow: [],
            addperiodscheduletodb: [],
            showPeriod: [],
            showDropdown: -1,
            show: false,
            dropdownshouldclose: false,
            edit: false,
            disable: false,
            currentDay: new Date().getDate(),
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            countday: new Date().getDay()
        }
    }

    async componentDidMount() {
        this.getDaysInMonth(this.state.month, this.state.year)
        this.setBlock(this.state.month, this.state.year)
        await this.checkToken();
    }


    checkToken = () => {
        var token = localStorage.getItem('tk');
        if (token == null || token == "undefined") {
            window.location.href = "http://localhost:3000/";
        } else if (token != null && token != "undefined") {
            var decoded = jwt_decode(token);
            if (decoded.position != "Manager" || decoded.position == "Admin") {
                window.location.href = "http://localhost:3000/User";
            } else {
                this.SelectDataFromDB();
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
            fetch("http://localhost:8080/showperiod", othepram)
                .then(response => {
                    return response.json();
                })
        ])

        const [user, company, department,showPeriod] = data
        this.setState({ user, company, department,showPeriod })

        this.getSchedules();
    }

    getSchedules = () => {
        var token = localStorage.getItem('tk');
        let month = this.state.month;
        const othepram = {
            headers: {
                tkAuth: token,
                month: month
            },
            method: "GET"
        };
        fetch('http://localhost:8080/showschedule', othepram)
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

    ShowUserColorOnSchedule = (x) => {
        if (x == 0) {
            return "userloggedcolor"
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
                addperiodscheduletodb: this.state.TestShow,
                month: this.state.month
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
        console.log(this.props.managerNotificationAbsent)
        console.log(this.props.managerNoti)
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

        const showperiod = this.state.showPeriod.map((event) => {return <div style={{display:'flex'}}>
             <div style={{backgroundColor: event.Period_Color,marginLeft:5}} className="period-color">
                
             </div>
             <span style={{marginLeft:5}}>{event.Period_Name}</span>
             <span style={{marginLeft:5}}>{event.Period_Time_One} - </span>
             <span style={{marginLeft:5}}>{event.Period_Time_Two}</span>
        </div>})

        return (
            <div className="Schedule">
                <Header Schedule={this.getSchedules} />
                <Container className="Schedule" fluid>
                    <span className="show-position">MANAGER</span>
                    <div className="before-schedule">
                        <p className="stat"><b>STATISTIC</b></p>
                        <div className="stat-schedule">
                            <button className="b-filter" onClick={this.showPopup}>FILTER PERIOD</button>
                            <div className="managerperiod-description">
                            {showperiod}
                            </div>
                            <Filter show={this.state.show} onClose={this.showPopup} getSchedule={this.getSchedules.bind(this)}>
                            </Filter>
                        </div>
                        <div id="filter">
                            {/* <Button color="btn btn-light" className="p1" style={{ color: '#E37222' }} ><b>WORK HOUR:</b></Button>
                            <Button color="btn btn-light" className="p2" style={{ color: '#E37222' }} ><b>DONE:</b></Button>
                            <Button color="btn btn-light" className="p3" style={{ color: '#E37222' }}><b>REMAIN:</b></Button> */}
                            <div className="b-static">WORK HOUR:</div>
                            <div className="b-static">DONE:</div>
                            <div className="b-static">REMAIN:</div>
                        </div>
                    </div>
                    <Table bordered responsive className="tests">
                        <thead>
                            <tr id="tr1">
                                <th colSpan={this.state.block.length / 2} >Company : {this.state.company.map(event => { return <span>{event.Company_Name}</span> })}</th>
                                <th colSpan={this.state.block.length / 2}>Department : {this.state.department.map(event => { return <span>{event.Department_Name}</span> })} </th>
                                <td colSpan="2" style={{ marginLeft: 10 }}><button id="edit-schedule" onClick={this.showButtonAfterEdit} disabled={this.state.disable}>Edit</button></td>
                            </tr>
                            <tr id="tr2">
                                <th colSpan={this.state.block.length + 2}>{this.getNameofMonth(this.state.month) + "  " + this.state.year} </th>
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
                                    <td colSpan="2" className={this.ShowUserColorOnSchedule(x)} >{event.Name}</td>
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
                        {this.state.edit && <button className="b-save" onClick={this.finishEdit}>FINISH EDIT</button>}
                        {this.state.edit == false ? <button className="b-save" onClick={() => this.InsertPeriodtoSchedule(this.state.TestShow)}>SAVE</button> : ""}
                    </div>
                </Container>
            </div>
        );
    }
}

export default Schedule;
