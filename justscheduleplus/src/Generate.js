import React, { Component } from "react";
import './Css/Generate.css';
import close from './Images/error.png';
import remove from './Images/close.png';
import { DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from 'reactstrap';
import { Table } from "reactstrap";
import down from "./Images/down.png";
import url from './url'



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
            positions: [],
            periodperDay: null,
            personperDay: null,
            conditon: [],
            test:null,
            validate:""
        }
    }

    componentDidMount() {
        this.getDate()
        this.selectConditionFromDB()
    }

    selectConditionFromDB = async () =>{
        let token = localStorage.getItem('tk');

        const othepram = {
            headers: {
                tkAuth: token
            },
            method: "GET"
        };
        const data = await Promise.all([
            fetch(url + '/position/generate/condition', othepram)
                .then((response) => {
                    return response.json();
                })
        ])
        const [conditon] = data
        this.setState({conditon})
    }

    getDate = () => {
        const { year, month } = this.state
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

    handleChange = (event) => {
        event.preventDefault()
        let { holiday } = this.state
        holiday[event.target.name] = event.target.value
        this.setState({ holiday })
        this.setState({
            validate:""
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        let { holiday, holidays } = this.state
        if(holiday.reason.trim() === ""){
            this.setState({
                validate:"Please specific reason"
            })
        }else{
            holidays.push(holiday)
            this.setState({
                holiday: {
                    date: "select",
                    reason: " "
                }
            })
        }
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

    remove = key => {
        this.state.holidays.splice(key, 1);
        this.forceUpdate()
    };

    selectDate = (event) => {
        let a = parseInt(event.target.innerText)
        this.setState({
            holiday: { date: a }
        })
    }

    selectPeriodperDay = (event) => {
        let a = parseInt(event.target.innerText)
        this.setState({
            periodperDay: a
        })
    }

    selectPersonperDay = (event) => {
        let a = parseInt(event.target.innerText)
        this.setState({
            personperDay: a
        })
    }

    clickPosition = (event) => {
        this.setState({
            positions: event.target.innerText
        })
        let click = event.target.innerText
        this.getPersonInPosition(click)
    }

    getPersonInPosition = (click) => {

        const { conditon } = this.state
        const { user } = this.props
        let arr = []

        conditon.map(c => {
            if(c.Position_Name === click){
                arr.push(c)
            }
        })

        if(arr.length !== 0){
            let holiday = []
            arr.map(d => {
                holiday.push({date: d.Day, reason: d.PositionDayOff_Reason})
            })
            this.setState({periodperDay: arr[0].PeriodPerDay, personperDay: arr[0].PersonPerDay, holidays: holiday})
        }else{
            const groupBy = (array, key) => {
                return array.reduce((result, currentValue) => {
                    (result[currentValue[key]] = result[currentValue[key]] || []).push(
                        currentValue
                    );
                    return result;
                }, {});
            };
    
            const personGroupedByPosition = groupBy(user, 'Position_Name');
            let person = personGroupedByPosition[click]
            if (person !== undefined) {
                this.genCondition(person)
            }
        }
    }

    genCondition(person) {
        this.state.periodperDays = []
        this.state.personperDays = []
        for (let i = 0; i < this.props.period; i++) {
            this.state.periodperDays.push(i + 1)
        }
        for (let x = 0; x < person.length; x++) {
            this.state.personperDays.push(x + 1)
        }
        this.setState({periodperDay: [], personperDay: []})
    }

    insertToCondition = () => {
        const {position } = this.props
        const {holidays, personperDay, periodperDay, positions} = this.state
        let positionID = []
        let month = new Date().getMonth() +1 

        position.map(p => {
            if(p.Position_Name === positions){
                positionID.push(p.Position_ID)
            }
        })
        const Url = url + '/position/generate/insert';
        const othepram = {
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                holiday: holidays,
                month: month,
                personPerDay: personperDay,
                periodPerDay: periodperDay,
                positionID: positionID
            }),
            method: "POST"
        };
        fetch(Url, othepram)
            .then(data => { return data.json() })
            .then(res => {
                alert('Insert Success')
                this.forceUpdate();
            })
            .catch(error => console.log(error))
    }

    generate = () => {
        const {holidays,periodperDay,personperDay, positions} = this.state
        this.props.testGenerate(holidays,periodperDay,personperDay,positions);
    }


    render() {

        if (!this.props.show) {
            return null;
        }
        const { day, holiday, holidays, periodperDays, personperDays, periodperDay, personperDay, positions } = this.state
        const { position } = this.props
    
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
                                        {positions}
                                        <img className="down" src={down}></img>
                                    </div>
                                </DropdownToggle>
                                <DropdownMenu>
                                    {position.map((po) => {
                                        return <DropdownItem onClick={(event) => this.clickPosition(event)} >
                                            {po.Position_Name}
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
                            <div>
                            <input type="text" name="reason" className="input-holi" value={this.state.holiday.reason} onChange={event => this.handleChange(event)}></input>
                            <span className="valgenerate">{this.state.validate}</span>
                            </div>
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
                            <button className="manage-gen" onClick = {this.insertToCondition}>save</button>
                            <button className="manage-gen" onClick = {this.generate}>generate</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Generate