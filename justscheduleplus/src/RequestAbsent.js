import React, { Component } from 'react';
import close from './Images/error.png';
import './Css/RequestAbsent.css';
import TextField from '@material-ui/core/TextField';;

class RequestAbsent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRequestAbsent: '',
            dateRequestAbsent: '',
            period: [],
            absentDescription: [],
            loading: true,
            requestValue: [],
            checkboxValue: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    componentDidMount = () => {
        this.receiveRequestAbsent();
    }

    receiveRequestAbsent = () => {
        let setDate = "";
        let setPeriod = "";
        let arr = [];

        if (this.props.scheduleAbsentDetail && this.props.userAbsent) {
            this.props.scheduleAbsentDetail.map(e => {
                setPeriod = e.Period_Time_One + "-" + e.Period_Time_Two
                arr.push(setPeriod)
                setPeriod = "";
            })
            setDate = this.props.scheduleAbsentDetail[0].Date + "/" + this.props.month + "/" + this.props.year
            this.setState({ userRequestAbsent: this.props.userAbsent.Name, dateRequestAbsent: setDate, period: arr })
            this.setState({ loading: false })
        }
    }

    insertRequest = () => {
        let arr = [];
        let a = '';
        let value = this.state.checkboxValue.substring(0, 5)
        let values = this.state.checkboxValue.substring(6, 11)
        arr.push(value, values)

        this.props.scheduleAbsentDetail.map(schedule => {
            if (arr[0] == schedule.Period_Time_One && arr[1] == schedule.Period_Time_Two) {
                a = schedule.Schedule_ID
                this.state.requestValue.push(a)

                const Url = 'http://localhost:8080/request/absent';
                const othepram = {
                    headers: {
                        "content-type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify({
                        request: this.state.requestValue,
                        description: this.state.absentDescription
                    }),
                    method: "POST"
                };
                fetch(Url, othepram)
                    .then(res => res.json())
                    .then(json => {
                        if (json != "null") {
                            this.setState({ requestID: json })
                            this.insertNotification();
                        }
                    })
            }
        })
    }

    insertNotification = () => {
        const Url = 'http://localhost:8080/insert/notification/manager';

        var token = localStorage.getItem('tk');
        const othepram = {
            headers: {
                "content-type": "application/json; charset=UTF-8",
                tkAuth: token
            },
            body: JSON.stringify({
                notification: this.state.requestID
            }),
            method: "POST"
        };
        fetch(Url, othepram)
            .then(res => res.json())
            .then(json => {
                if (json == "Request Success") {
                    this.onClose();
                }
            })
    }

    onClose = (e) => {
        if (this.props.onClose !== undefined) {
            this.setState({ userRequestAbsent: '', dateRequestAbsent: '', absentDescription: [], period: [], loading: true, checkboxValue: '', requestValue: [] })
            this.props.onClose(e)
        }
    }


    render() {
        const { loading, absentDescription } = this.state
        if (!this.props.show) {
            return null;
        }
        const period = this.state.period.map((event) => { return <div style={{ marginLeft: 20 }}><input type="checkbox" name="checkboxValue" value={event} onChange={this.handleChange} ></input><span style={{ marginLeft: 10 }}>{event}</span></div> })

        return (

            <div className="request-popup-absent">
                {
                    !loading && (
                        <div className='request-popup_inner1-absent'>
                            <div className='request-header2-absent'>able to select more than one period
                <img src={close} onClick={(e) => this.onClose(e)} className="close-create"></img>
                            </div>
                            <div className='user-request1-absent'>
                                <span className='request-name-absent'>{this.state.userRequestAbsent}</span>
                                <span className='date-absent'>{this.state.dateRequestAbsent}</span>
                                <div style={{ display: 'flex', flexDirection: 'row', marginTop: 20, marginLeft: -15 }}>
                                    {period}
                                </div>
                                <div style={{ display: 'flex', marginTop: 15 }}>
                                    <span className="givereason">Please specific reason :</span>
                                    {/* <select className="type">
                                        <option>Excused Absences</option>
                                        <option>Sick Time</option>
                                        <option>Personal Time</option>
                                        <option>Vacation Days</option>
                                        <option>Family and Medical Leave</option>
                                        <option>Bereavement or Sympathy Leave</option>
                                        <option>Jury Duty</option>
                                    </select> */}
                                </div>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Reason"
                                    multiline
                                    rowsMax="10"
                                    className="reason"
                                    margin="normal"
                                    variant="outlined"
                                    rowsMax="5"
                                    name="absentDescription"
                                    value={absentDescription}
                                    onChange={this.handleChange}
                                />
                                <button className="select-request2-absent" onClick={this.insertRequest}>Request</button>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }



}

export default RequestAbsent