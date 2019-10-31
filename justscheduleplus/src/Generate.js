import React, { Component } from "react";
import './Css/Generate.css';
import close from './Images/error.png';
import remove from './Images/close.png';
import { DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from 'reactstrap';
import { Table } from "reactstrap";
import down from "./Images/down.png";



class Generate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dropdownPeriod: false,
            dropdownPerson: false,
            dropdownHoliday: false,
            dropdownPosition: false,
            holiday: { date: "select", reason: "" },
            holidays: [],
            day: [],
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            periodperDays: [],
            personperDays: [],
            positions:[],
            position:null,
            periodperDay: null,
            personperDay: null,
        }
    }

    componentDidMount() {
        this.getDate(this.state.month, this.state.year)
        this.genCondition()
    }

    onClose = e => {
        if (this.props.onClose != undefined) {
            this.props.onClose(e);
        }
    };

    selectPosition = () => {
        this.setState({
            dropdownPosition: !this.state.dropdownPosition,
        })
    }


    selectPeriodTimes = () => {
        this.setState({
            dropdownPeriod: !this.state.dropdownPeriod,
        })
    }

    selectPersons = () => {
        this.setState({
            dropdownPerson: !this.state.dropdownPerson,
        })
    }

    selectHolidays = () => {
        this.setState({
            dropdownHoliday: !this.state.dropdownHoliday,
        })
    }

    handleChange = (event) => {
        event.preventDefault()
        let { holiday } = this.state
        holiday[event.target.name] = event.target.value
        this.setState({ holiday })
    }

    handleSubmit = event => {
        event.preventDefault();
        let { holiday, holidays } = this.state
        holidays.push(this.state.holiday)
        this.setState({
            holiday: {
                date: "select",
                reason: " "
            }
        })
    }

    remove = key => {
        this.state.holidays.splice(key, 1);
        this.forceUpdate()
    };

    selectDate = (event) => {
        this.setState({
            holiday: { date: event.target.innerText }
        })
    }

    selectPeriodperDay = (event) => {
        this.setState({
            periodperDay: event.target.innerText
        })
    }

    selectPersonperDay = (event) => {
        this.setState({
            personperDay: event.target.innerText
        })
    }

    changePosition = (event) => {
        this.setState({
            position:event.target.innerText
        })
    }

    getDate = (month, year) => {
        var date = new Date(year, month, 1);
        let collectDay = ""
        let days = 0

        while (date.getMonth() === this.state.month) {
            collectDay = new Date(date).toDateString().substr("7", "4")
            days = parseInt(collectDay)
            date.setDate(date.getDate() + 1);
            this.state.day.push(days)
        }

    }

    genCondition() {
        console.log(this.props.period, this.props.user)
        for (let i = 0; i < this.props.period; i++) {
            this.state.periodperDays.push(i + 1)
        }
        for (let j = 0; j < this.props.user; j++) {
            this.state.personperDays.push(j + 1)
        }
    }


    render() {

        if (!this.props.show) {
            return null;
        }
        const { day, holiday, holidays, periodperDays, personperDays, periodperDay, personperDay,position,positions } = this.state
        console.log(this.state.periodperDay, this.state.personperDay)
        return (
            <div className="generate_popup">
                <div className="generate_popup_inner">
                    <div className="generate-header">
                        <img src={close} onClick={(e) => this.onClose(e)} className="close-create"></img>
                        <span>Create generate conditon</span>
                        <hr></hr>
                    </div>
                    <div className="generate-content">
                    <div style={{ display: "flex", marginTop: 15, marginLeft: 40 }}>
                            <span>Select position  :</span>
                            <Dropdown className="select_gen" isOpen={this.state.dropdownPosition} toggle={this.selectPosition} direction='down' size="sm">
                                <DropdownToggle tag="div">
                                    <div className="dropdown_gen">
                                        {position}
                                        <img className="down" src={down}></img>
                                    </div>
                                </DropdownToggle>
                                <DropdownMenu>
                                    {positions.map((po) => {
                                        return <DropdownItem onClick={(event) => this.changePosition(event)} >
                                            {po}
                                        </DropdownItem>
                                    })}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div style={{ display: "flex", marginTop: 10, marginLeft: 40 }}>
                            <span>Select period times per days :</span>
                            <Dropdown className="select_gen" isOpen={this.state.dropdownPeriod} toggle={this.selectPeriodTimes} direction='down' size="sm">
                                <DropdownToggle tag="div">
                                    <div className="dropdown_gen">
                                        {periodperDay}
                                        <img className="down" src={down}></img>
                                    </div>
                                </DropdownToggle>
                                <DropdownMenu>
                                    {periodperDays.map((pd) => {
                                        return <DropdownItem onClick={(event) => this.selectPeriodperDay(event)} >
                                            {pd}
                                        </DropdownItem>
                                    })}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div style={{ display: "flex", marginTop: 10, marginLeft: 40 }}>
                            <span>Select work persons per days :</span>
                            <Dropdown className="select_gen" isOpen={this.state.dropdownPerson} toggle={this.selectPersons} direction='down' size="sm">
                                <DropdownToggle tag="div">
                                    <div className="dropdown_gen">
                                        {personperDay}
                                        <img className="down" src={down}></img>
                                    </div>
                                </DropdownToggle>
                                <DropdownMenu>
                                    {personperDays.map((psd) => {
                                        return <DropdownItem onClick={(event) => this.selectPersonperDay(event)}>
                                            {psd}
                                        </DropdownItem>
                                    })}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div style={{ display: "flex", marginTop: 10, marginLeft: 40 }}>
                            <span>Add your company holidays in this month :</span>
                            <Dropdown className="select_gen" isOpen={this.state.dropdownHoliday} toggle={this.selectHolidays} direction='down' size="sm">
                                <DropdownToggle tag="div">
                                    <div className="dropdown_gen">{holiday.date}
                                        <img className="down" src={down}></img>
                                    </div>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown_item">
                                    {day.map((days) => { return <DropdownItem onClick={(event) => this.selectDate(event)}>{days}</DropdownItem> })}
                                </DropdownMenu>
                            </Dropdown>
                            <input type="text" name="reason" className="input-holi" value={this.state.holiday.reason} onChange={event => this.handleChange(event)}></input>
                            <button className="manage-gen" onClick={(event) => this.handleSubmit(event)}>Add</button>
                        </div>
                        <Table responsive className="table-gen" style={{ marginTop: 70, marginLeft: 40 }}>
                            <tbody>
                                <tr style={{ position: "fixed", marginTop: -47 }}>
                                    <td className="td11">No.</td>
                                    <td className="td11">Date</td>
                                    <td className="td12">Reason</td>
                                    <td className="td11">Manage</td>
                                </tr>
                                {holidays.map((h, key) => {
                                    return <tr>
                                        <td className="td14">{key + 1}</td>
                                        <td className="td14">{h.date}</td>
                                        <td className="td13">{h.reason}</td>
                                        <td className="td14"><img src={remove} style={{ width: 15, height: 15, marginTop: 0, marginLeft: 55 }} onClick={() => this.remove(key)} />
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                        <div style={{ display: 'flex', marginLeft: 600, marginTop: 10 }}>
                            <button className="manage-gen">save</button>
                            <button className="manage-gen">generate</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Generate