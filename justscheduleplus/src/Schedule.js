import React, { Component } from 'react';
import './Css/App.css';
import Header from './Header';
import './Css/Schedule.css';
import { Button, Table } from 'reactstrap';
import { Container } from 'react-grid-system';
import Filter from './Filter';
import Timepicker from './Timepicker';
import error from './Images/close.png';
import * as jwt_decode from 'jwt-decode';
import url from './url';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from 'reactstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function suffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

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
            countday: new Date().getDay(),
            months: ["Januray", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            dropdownOpen: false,
            userRequest: [],
            loading: true
        }
    }

    componentDidMount() {
        this.getDaysInMonth();
        this.setBlock();
        this.checkToken();
    }


    checkToken = () => {
        var token = localStorage.getItem('tk');
        if (token == null || token == "undefined") {
            window.location.href = "/";
        } else if (token != null && token != "undefined") {
            var decoded = jwt_decode(token);
            if (decoded.position !== "Manager" || decoded.position == "Admin") {
                window.location.href = "/User";
            } else {
                this.SelectDataFromDB();
            }
        }
    }

    getNameofMonth = (month) => {
        // this.getSchedules();
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[month]

    }

    SelectDataFromDB = async () => {
        var token = localStorage.getItem('tk');
        const othepram = {
            headers: {
                tkAuth: token
            },
            method: "GET"
        };
        let month = this.state.month;

        const otheprams = {
            headers: {
                tkAuth: token,
                month: month
            },
            method: "GET"
        };

        const data = await Promise.all([
            fetch(url + '/users', othepram)
                .then((response) => {
                    return response.json();
                }),
            fetch(url + '/company', othepram)
                .then((response) => {
                    return response.json();
                }),
            fetch(url + '/department', othepram)
                .then((response) => {
                    return response.json();
                }),
            fetch(url + "/showperiod", othepram)
                .then(response => {
                    return response.json();
                }),
            fetch(url + '/manager/notification/schedule', otheprams)
                .then((response) => {
                    return response.json();
                })
        ])

        const [user, company, department, showPeriod, userRequest] = data
        this.setState({ user, company, department, showPeriod, userRequest })
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
            fetch(url + '/showschedule', othepram)
                .then((response) => {
                    return response.json();
                })
        ])

        const [selectSchedule] = data;
        this.setState({ selectSchedule, loading: false })
    }

    getDaysInMonth() {
        const { month, year } = this.state
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

    setBlock() {
        const { month, year } = this.state
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
        } else {
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
        const Url = url + '/schedule';
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
                this.setState({ TestShow: [] })
                this.getSchedules();
            })
            .catch(error => console.log(error))
    }

    CloseDropdown = () => {
        this.setState({ showDropdown: -1, dropdownshouldclose: true })
    }

    DeletePeriodFromDB = (periodinschedule) => {
        const { userRequest } = this.state
        let hasRequest = []
        if (userRequest.length !== 0) {
            userRequest.map(userReq => {
                if (userReq.Schedule_ID === periodinschedule.Schedule_ID) {
                    hasRequest.push(userReq)
                }
            })
        }
        if (hasRequest.length !== 0) {
            if (!window.confirm("This period has Request!! Do you want to delete this period?")) return
            let token = localStorage.getItem('tk')
            const Url = url + '/schedule/deleted';

            const othepram = {
                headers: {
                    "content-type": "application/json; charset=UTF-8",
                    tkauth: token
                },
                body: JSON.stringify({
                    reject: hasRequest,
                    approve: hasRequest
                }),
                method: "POST"
            };
            fetch(Url, othepram)
                .then(data => { return data.json() })
                .then(res => {
                    alert("Delete Success!!")
                    window.location.href = "/Schedule"
                })
                .catch(error => console.log(error))
        } else {
            if (!window.confirm("Do you want to delete this period!!")) return
            let token = localStorage.getItem('tk')
            const Url = url + '/schedule/delete';

            const othepram = {
                headers: {
                    "content-type": "application/json; charset=UTF-8",
                    tkauth: token
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
    }
    
    toggle = () => {
        const { dropdownOpen } = this.state
        this.setState({ dropdownOpen: !dropdownOpen })
    }

    testGenerate = () => {
        const { month, year, user, showPeriod } = this.state

        var date = new Date(year, month, 1);
        let day = []
        let collectDay = ""
        let days = 0

        let personPerDay = [2]
        let dayOff = [1]
        let periodPerDay = [2]

        while (date.getMonth() === this.state.month) {
            collectDay = new Date(date).toDateString().substr("7", "4")
            days = parseInt(collectDay)
            date.setDate(date.getDate() + 1);
            day.push(days)
        }

        dayOff.map(e => {
            day.splice(day.indexOf(e), 1);
        })

        const users = user
        const periods = showPeriod
        const groupBy = (array, key) => {
            return array.reduce((result, currentValue) => {
                (result[currentValue[key]] = result[currentValue[key]] || []).push(
                    currentValue
                );
                return result;
            }, {});
        };

        const personGroupedByPosition = groupBy(users, 'Position_Name');

        const show = { ...this.state.TestShow }

        for (let i = 0; i < day.length; i++) {
            var b = suffleArray(periods)
            if (personPerDay.length !== 0) {
                var a = suffleArray(personGroupedByPosition["Doctor"])
                for (let x = 0; x < personPerDay[0]; x++) {
                    if (periods.length > 1) {
                        for (let y = 0; y < periodPerDay[0]; y++) {
                            const oldShow = show[`${a[x].User_ID},${day[i]}`]
                            if (Array.isArray(oldShow)) {
                                if (oldShow.findIndex(show => {
                                    return show.Period_Name == periods[y].Period_Name
                                }) === -1)
                                    show[`${a[x].User_ID},${day[i]}`] = [...oldShow, periods[y]].sort(function (a, b) {
                                        let t1 = parseInt(a.Period_Time_One.replace(':', ''));
                                        let t2 = parseInt(b.Period_Time_One.replace(':', ''));
                                        return t1 - t2;
                                    })
                            } else {
                                show[`${a[x].User_ID},${day[i]}`] = [periods[y]]
                            }
                        }
                    }
                }
            }
        }
        this.setState({ TestShow: show, loading: false })
    }


    render() {

        const { loading } = this.state
        let showperiod = []
        if (!loading) {
            showperiod = this.state.showPeriod.map((event) => {
                return <div style={{ display: 'flex' }}>
                    <div style={{ backgroundColor: event.Period_Color, marginLeft: 5 }} className="period-color">

                    </div>
                    <span style={{ marginLeft: 5 }}>{event.Period_Name}</span>
                    <span style={{ marginLeft: 5 }}>{event.Period_Time_One} - </span>
                    <span style={{ marginLeft: 5 }}>{event.Period_Time_Two}</span>
                </div>
            })
            console.log(this.state.TestShow)

        }

        return (
            <div className="Schedule">
                <Header Schedule={this.getSchedules} />
                {!loading &&
                    <Container className="Schedule" fluid>
                        <span className="show-position">MANAGER</span>
                        <div className="before-schedule">
                            <p className="stat"><b>STATISTIC</b></p>
                            <div className="stat-schedule">
                                <button className="b-filter" onClick={this.showPopup}>FILTER PERIOD</button>
                                <button onClick={this.testGenerate}>Generate</button>
                                <div className="managerperiod-description">
                                    {showperiod}
                                </div>
                                <Filter show={this.state.show} onClose={this.showPopup} userRequest={this.state.userRequest} >
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
                        <Table bordered responsive className="tests" id="table-to-xls">
                            <thead>
                                <tr id="tr1">
                                    <th colSpan={(this.state.block.length / 2)} >Company : {this.state.company.map(event => { return <span>{event.Company_Name}</span> })}</th>
                                    <th colSpan={(this.state.block.length / 2)}>Department : {this.state.department.map(event => { return <span>{event.Department_Name}</span> })} </th>
                                    <td colSpan={this.state.block.length == 31 ? 3 : 2} style={{ marginLeft: 10 }}><button id="edit-schedule" onClick={this.showButtonAfterEdit} disabled={this.state.disable}>Edit</button></td>
                                </tr>
                                <tr id="tr2">
                                    {/* <th colSpan={this.state.block.length + 2}>{this.getNameofMonth(this.state.month) + "  " + this.state.year} </th> */}
                                    <th colSpan={this.state.block.length + 2}>
                                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} direction='right' size="sm">
                                            <DropdownToggle tag="span">
                                                <span>{this.getNameofMonth(this.state.month) + " " + this.state.year}</span>
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                {this.state.months.map((event, i) => { return <DropdownItem onClick={() => this.getMonth(event, i)}>{this.state.dropdownOpen == false ? null : event} </DropdownItem> })}
                                            </DropdownMenu>
                                        </Dropdown>
                                    </th>
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
                                            return <td className="table-td" onClick={() => this.SendMultidimension(x, y)}>
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
                                                        </div>)
                                                }
                                            </td>
                                        })}
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                        <div style={{ display: "flex", float: 'right' }}>
                            {this.state.edit && <button className="b-save" onClick={this.finishEdit}>FINISH EDIT</button>}
                            {this.state.edit == false ? <div> <button className="b-save" style={{ marginRight: 10 }} onClick={() => this.InsertPeriodtoSchedule(this.state.TestShow)}>SAVE</button>
                                <ReactHTMLTableToExcel table="table-to-xls" filename="Schedule" sheet="sheet 2" buttonText="Export" className="b-save" /> </div> : ""}
                        </div>
                    </Container>
                }
            </div>
        );
    }
}

export default Schedule;
