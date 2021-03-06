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
import Generate from './Generate';
import { css } from '@emotion/core';
import FadeLoader from 'react-spinners/FadeLoader';


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

function calulateStatisticByToey(array) {
    let limit = 24;

    if (array[1] === 0) {
        array[1] = 24
        const a = array[1] - array[0]
        array = a
        return array;
    } else if (array[1] < 1 && array[1] > 0) {
        let result = limit + array[1]
        const a = result - array[0]
        array = a
        return array;
    } else if (array[0] > array[1]) {
        const a = (limit - array[0]) + array[1]
        array = a
        return array;
    } else {
        const a = array[1] - array[0]
        array = a
        return array
    }
}

function calulateWorkHour(array) {
    let sum = 0
    for (let i = 0; i < array.length; i++) {
        sum += array[i]
    }
    array = sum
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
            loading: true,
            showGenerate: false,
            daysname: [],
            position: [],
            check: true,
            workHour: 0,
            doneHour: 0,
            remainHour: 0
        }
    }

    componentDidMount() {
        this.getDaysInMonth();
        this.setBlock();
        this.checkToken();
    }

    checkToken = () => {
        var token = localStorage.getItem('tk');
        if (token === null || token === undefined) {
            alert("Please Login")
            window.location.href = '/'
        } else if (token !== null && token !== undefined) {
            var decoded = jwt_decode(token);
            if (decoded.position === "Admin") {
                alert("Not have Permission")
                window.location.href = "/Company";
            } else if (decoded.position !== "Manager") {
                alert("Not have Permission")
                window.location.href = "/User";
            } else {
                this.SelectDataFromDB();
            }
        }
    }

    getNameofMonth = (month) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[month]
        this.getSchedules();
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
            fetch(url + '/user', othepram)
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
            fetch(url + "/period", othepram)
                .then(response => {
                    return response.json();
                }),
            fetch(url + '/schedule/manager/notification/', otheprams)
                .then((response) => {
                    return response.json();
                }),
            fetch(url + '/position/generate', othepram)
                .then((response) => {
                    return response.json();
                })
        ])

        const [user, company, department, showPeriod, userRequest, position] = data
        this.setState({ user, company, department, showPeriod, userRequest, position })
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
            fetch(url + '/schedule', othepram)
                .then((response) => {
                    return response.json();
                })
        ])

        const [selectSchedule] = data;
        this.getStatistic(selectSchedule);
        this.setState({ selectSchedule, loading: false })
    }
    getStatistic = (selectSchedule) => {
        const { user, currentDay } = this.state
        let allWorkHour = []
        let doneWorkHour = []

        selectSchedule.map(s => {
            if (s.User_ID === user[0].User_ID) {
                let statistic = []
                let a = s.Period_Time_One.replace(":", ".");
                let b = s.Period_Time_Two.replace(":", ".");

                let resultA = parseFloat(a)
                let resultB = parseFloat(b)

                statistic.push(resultA, resultB)
                const workhour = calulateStatisticByToey(statistic);
                allWorkHour.push(workhour)
            }
        })

        selectSchedule.map(s => {
            if (s.User_ID === user[0].User_ID && s.Date < currentDay) {
                let statistic = []
                let a = s.Period_Time_One.replace(":", ".");
                let b = s.Period_Time_Two.replace(":", ".");

                let resultA = parseFloat(a)
                let resultB = parseFloat(b)

                statistic.push(resultA, resultB)
                const workhour = calulateStatisticByToey(statistic);
                doneWorkHour.push(workhour)
            }
        })

        const userWorkHour = calulateWorkHour(allWorkHour)
        const userDoneWorkHour = calulateWorkHour(doneWorkHour)
        const userRemain = userWorkHour - userDoneWorkHour
        this.setState({ workHour: userWorkHour, doneHour: userDoneWorkHour, remainHour: userRemain })
    }

    getDaysInMonth() {
        const { month, year } = this.state
        var date = new Date(year, month, 1);
        var days = [];
        var Showday = [];

        while (date.getMonth() === month) {
            Showday = new Date(date).toDateString().substr("0", "3");
            days.push(new Date(date).toDateString().substr("7", "4"));
            date.setDate(date.getDate() + 1);
            this.state.daysname.push(Showday)
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

    ShowDayColorOnSchedule = (num, name) => {
        var dayStr = name
        var dayStr1 = num
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
        const Url = url + '/schedule/insert';
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
            const Url = url + '/schedule/delete/autoreject';

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
                    alert("Delete Success!!")
                    this.getSchedules();
                })
                .catch(error => console.log(error))
        }
    }

    toggle = () => {
        const { dropdownOpen } = this.state
        this.setState({ dropdownOpen: !dropdownOpen })
    }

    testGenerate = (holidays, periodperDay, personperDay, positions) => {
        const { month, year, user, showPeriod } = this.state

        var date = new Date(year, month, 1);
        let day = []
        let collectDay = ""
        let days = 0

        let dayOff = []
        holidays.map(h => {
            dayOff.push(h.date)
        })
        let personPerDay = [personperDay]
        let periodPerDay = [periodperDay]

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
                var a = suffleArray(personGroupedByPosition[positions])
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

    showGenerate = () => {
        this.setState({
            showGenerate: !this.state.showGenerate, check: !this.state.check
        })
    }

    getMonth = (event, i) => {
        this.setState({
            month: i
        })
        this.componentDidMount()
    }

    clearSchedule = () => {
        this.setState({
            TestShow: []
        })
    }


    render() {

        const { loading, check, workHour, remainHour, doneHour } = this.state
        const override = css`
                display: block;
                left: 50%;
                top: 40%;
                margin-left: -4em;
                position:fixed;
            `;

        const daysname = this.state.daysname.map((event1, i) => { return event1 })
        let showperiod = []
        if (!loading) {
            showperiod = this.state.showPeriod.map((event) => {
                return <div className="show_period">
                    <div style={{ backgroundColor: event.Period_Color, marginLeft: 5 }} className="period-color">

                    </div>
                    <span style={{ marginLeft: 5, marginTop: 3 }}>{event.Period_Name}</span>
                    <span style={{ marginLeft: 5, marginTop: 3 }}>{event.Period_Time_One} - </span>
                    <span style={{ marginLeft: 5, marginTop: 3 }}>{event.Period_Time_Two}</span>
                </div>
            })
        }

        return (
            <div className="Schedule">
                <FadeLoader
                    css={override}
                    sizeUnit={"px"}
                    size={150}
                    color={'#ffffff'}
                    loading={this.state.loading}
                />
                <Header Schedule={this.getSchedules} />
                {!loading &&
                    <Container className="Schedule" fluid>
                        <span className="show-position">MANAGER</span>
                        <div className="before-schedule">
                            <div className="stat-schedule">
                                <button className="b-filter" onClick={this.showPopup}>CREATE PERIOD</button>
                                <button className="b-filter" style={{ marginLeft: 10 }} onClick={this.showGenerate}>GENERATE</button>
                                <div className="managerperiod-description">
                                    {showperiod}
                                </div>
                                <Filter show={this.state.show} onClose={this.showPopup} SelectDataFromDB = {this.SelectDataFromDB} userRequest={this.state.userRequest} Schedule={this.getSchedules}>
                                </Filter>
                                {!check && <Generate show={this.state.showGenerate} onClose={this.showGenerate} period={this.state.showPeriod.length} position={this.state.position} user={this.state.user} testGenerate={this.testGenerate}></Generate>}
                            </div>
                            <div id="filter">

                                <p className="stat"><b>STATISTIC</b></p>
                                <div style={{ display: 'flex' }}>
                                    <div className="b-static">WORK HOUR: {workHour} hr.</div>
                                    <div className="b-static">DONE: {doneHour} hr.</div>
                                    <div className="b-static">REMAIN: {remainHour} hr.</div>
                                </div>
                            </div>
                        </div>
                        <div className="responsive">
                            <Table bordered responsive className="tests" id="table-to-xls">
                                <thead>
                                    <tr id="tr1">
                                        <th colSpan={(this.state.block.length / 2)} >Company : {this.state.company.map(event => { return <span>{event.Company_Name}</span> })}</th>
                                        <th colSpan={(this.state.block.length / 2)}>Department : {this.state.department.map(event => { return <span>{event.Department_Name}</span> })} </th>
                                        <td colSpan={this.state.block.length == 31 ? 3 : 2} style={{ marginLeft: 10, paddingLeft: 5 }}>
                                            {this.state.edit == false ? <button id="edit-schedule" onClick={this.showButtonAfterEdit} disabled={this.state.disable}>Edit</button> :
                                                <button id="edit-schedule" onClick={this.clearSchedule} >Clear</button>
                                            }
                                        </td>
                                    </tr>
                                    <tr id="tr2">
                                        {/* <th colSpan={this.state.block.length + 2}>{this.getNameofMonth(this.state.month) + "  " + this.state.year} </th> */}
                                        <th colSpan={this.state.block.length + 2}>
                                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} direction='down' size="sm">
                                                <DropdownToggle tag="span" style={{cursor:'pointer'}}  >
                                                    <span>{this.getNameofMonth(this.state.month) + " " + this.state.year}</span>
                                                </DropdownToggle>
                                                <DropdownMenu className="dd-mm" >
                                                    {this.state.months.map((event, i) => { return <DropdownItem onClick={() => this.getMonth(event, i)}><div >
                                                    <span>{this.state.dropdownOpen == false ? null : event}</span></div></DropdownItem> })}
                                                </DropdownMenu>
                                            </Dropdown>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th className="name" colSpan="2" id="name-schedule">NAME</th>
                                        {this.state.day.map((event, i) => {
                                            return <th style={{ backgroundColor: this.ShowDayColorOnSchedule(event, daysname[i]) }} className="day">
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span>{event}</span>
                                                    <span>{daysname[i]}</span>
                                                </div></th>
                                        })}
                                    </tr>
                                    {this.state.user.map((event, x) => {
                                        return <tr className="test2">
                                            {/* เอาค่า username มาแสดง*/}
                                            <td colSpan="2" style={{ wordWrap: 'break-word', paddingTop: 10, paddingLeft: 4, paddingRight: 0 }} className={this.ShowUserColorOnSchedule(x)} >{event.Name}</td>
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
                                                        <Timepicker CloseDropdown={this.CloseDropdown.bind(this)} period={this.state.showPeriod} AddPeriod={(PeriodUserClick) => this.AddPeriod(PeriodUserClick, x, y, event, e)} />
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
                        </div>
                        <div style={{ display: "flex", float: 'right' }}>
                            {this.state.edit && <button className="b-save" onClick={this.finishEdit}>FINISH EDIT</button>}
                            {this.state.edit == false && Object.keys(this.state.TestShow).length > 0 ? <div> <button className="b-save" onClick={() => this.InsertPeriodtoSchedule(this.state.TestShow)}>SAVE</button>
                            </div> : ""}
                            <ReactHTMLTableToExcel table="table-to-xls" filename="Schedule" sheet="sheet 2" buttonText="EXPORT" className="b-save" />
                        </div>
                    </Container>
                }
            </div>
        );
    }
}

export default Schedule;
