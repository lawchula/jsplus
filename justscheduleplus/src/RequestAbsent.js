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
            absentDescription: '',
            loading: true,
            checkValue: true,
            requestValue: [],
            checkboxValue: ''
        }
        this.handleChanges = this.handleChanges.bind(this);
    }

    handleChange(event) {
        let check = this.state.checkValue
        if (check) {
            this.setState({ checkboxValue: event, checkValue: false })
        } else {
            this.setState({ checkboxValue: '', checkValue: true })
        }
    }

    handleChanges(e) {
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
        if (this.state.checkboxValue !== '' && this.state.absentDescription !== '') {
            if (!window.confirm("Do you want to Request to absent?")) return
            let arr = [];
            let a = '';
            let value = this.state.checkboxValue.substring(0, 5)
            let values = this.state.checkboxValue.substring(6, 11)
            let validate = ''
            let check = true;
            arr.push(value, values)

            this.props.scheduleAbsentDetail.map(schedule => {
                if (arr[0] == schedule.Period_Time_One && arr[1] == schedule.Period_Time_Two) {
                    a = schedule.Schedule_ID
                    this.state.requestValue.push(a)
                }
            })

            this.props.alreadyReq.map(e => {
                if (e.Schedule_ID === this.state.requestValue[0]) {
                    validate = "Period has been request to Manager Already!!!!"
                    check = false;
                }
            })

            if (check) {
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
            } else {
                alert(validate)
            }
        } else {
            alert("Please select Period to Absent!!!")
        }
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
                    alert("Request Success")
                    this.onClose();
                }
            })
    }

    onClose = (e) => {
        if (this.props.onClose !== undefined) {
            this.setState({ userRequestAbsent: '', dateRequestAbsent: '', absentDescription: [], period: [], loading: true, checkboxValue: '', requestValue: [] })
            this.props.onClose(e)
            this.props.schedule(e);
        }
    }


    render() {
        const { loading, absentDescription, period, dateRequestAbsent, userRequestAbsent, checkboxValue, checkValue } = this.state
        if (!this.props.show) {
            return null;
        }
        const showPeriod = period.map((event) => { return <div style={{ marginLeft: 20 }}><input disabled={!checkValue && event !== checkboxValue} type="checkbox" onClick={() => this.handleChange(event)} ></input><span style={{ marginLeft: 10 }}>{event}</span></div> })

        return (

            <div className="request-popup-absent">
                {
                    !loading && (
                        <div className='request-popup_inner1-absent'>
                            <div className='request-header2-absent'>able to select more than one period
                <img src={close} onClick={(e) => this.onClose(e)} className="close-create"></img>
                            </div>
                            <div className='user-request1-absent'>
                                <span className='request-name-absent'>{userRequestAbsent}</span>
                                <span className='date-absent'>{dateRequestAbsent}</span>
                                <div style={{ display: 'flex', flexDirection: 'row', marginTop: 20, marginLeft: -15 }}>
                                    {showPeriod}
                                </div>
                                <div style={{ display: 'flex', marginTop: 15 }}>
                                    <span className="givereason">Please specific reason :</span>
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
                                    onChange={this.handleChanges}
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