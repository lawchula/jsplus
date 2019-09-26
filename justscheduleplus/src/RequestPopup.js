import React, { Component } from 'react';
import './Css/RequestPopup.css';
import close from './Images/error.png';
import User from './User';
import change from './Images/refresh.png';

class RequestPopup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            requestUser: '',
            requestdate: '',
            userHasBeenReq: '',
            dateHasBeenReq: '',
            period: [],
            newPeriod: [],
            loading: true,
            firstCheckboxValue: '',
            secondCheckboxValue: '',
            requestValue: [],
            requestID: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount = () => {
        this.receiveRequest();
    }

    receiveRequest = () => {
        let setDate = "";
        let setPeriod = "";
        let arr = [];

        if (this.props.firstScheduleDetail && this.props.firstUser) {
            {
                this.props.firstScheduleDetail.map(e => {
                    setPeriod = e.Period_Time_One + "-" + e.Period_Time_Two
                    arr.push(setPeriod)
                    setPeriod = "";
                })
            }
            setDate = this.props.firstScheduleDetail[0].Date + "/" + this.props.month + "/" + this.props.year
            this.setState({ requestUser: this.props.firstUser.Name, requestdate: setDate, period: arr })
            arr = [];
        }

        if (this.props.secondScheduleDetail && this.props.secondUser) {
            {
                this.props.secondScheduleDetail.map(e => {
                    setPeriod = e.Period_Time_One + "-" + e.Period_Time_Two
                    arr.push(setPeriod)
                })
            }
            setDate = this.props.secondScheduleDetail[0].Date + "/" + this.props.month + "/" + this.props.year
            this.setState({ userHasBeenReq: this.props.secondUser.Name, dateHasBeenReq: setDate, newPeriod: arr, loading: false })
            arr = [];
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }


    insertRequest = () => {
        if (!window.confirm("Do you want to delete this period!!")) return
        let done = false;
        let arr = [];
        let value = this.state.firstCheckboxValue.substring(0, 5)
        let values = this.state.firstCheckboxValue.substring(6, 11)
        let a = '';
        let b = '';
        arr.push(value, values)

        Boolean(done);

        this.props.firstScheduleDetail.map(schedule => {
            if (arr[0] == schedule.Period_Time_One && arr[1] == schedule.Period_Time_Two) {
                a = schedule.Schedule_ID
                done = true
            }
        })

        if (done) {
            arr = []
            value = this.state.secondCheckboxValue.substring(0, 5)
            values = this.state.secondCheckboxValue.substring(6, 11)
            arr.push(value, values)
            this.props.secondScheduleDetail.map(schedules => {
                if (arr[0] == schedules.Period_Time_One && arr[1] == schedules.Period_Time_Two) {
                    b = schedules.Schedule_ID
                    this.state.requestValue.push(a, b)

                    const Url = 'http://localhost:8080/request';
                    const othepram = {
                        headers: {
                            "content-type": "application/json; charset=UTF-8"
                        },
                        body: JSON.stringify({
                            request: this.state.requestValue
                        }),
                        method: "POST"
                    };
                    fetch(Url, othepram)
                        .then(res => res.json())
                        .then(json => {
                            if (json != "null") {
                                this.setState({requestID: json})
                                this.insertNotification();
                            }
                        })
                }
            })
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
            if(json == "Request Success"){
                this.onClose();
            }
        })
    }

    onClose = (e) => {
        if (this.props.onClose !== undefined) {
            this.setState({ requestUser: '', requestdate: '', userHasBeenReq: '', dateHasBeenReq: '', period: [], newPeriod: [], loading: false, firstCheckboxValue: '', secondCheckboxValue: '', requestValue: [] })
            this.props.onClose(e)
        }
    }

    render() {
        const { loading } = this.state
        if (!this.props.show) {
            return null;
        }
        const period = this.state.period.map((event) => { return <div style={{ marginLeft: 20 }}><input type="checkbox" name="firstCheckboxValue" value={event} onChange={this.handleChange}></input><span style={{ marginLeft: 10 }} className="req-period">{event}</span></div> })
        const newPeriod = this.state.newPeriod.map((event) => { return <div style={{ marginLeft: 20 }}><input type="checkbox" name="secondCheckboxValue" value={event} onChange={this.handleChange}></input><span style={{ marginLeft: 10 }} className="req-period" >{event}</span></div> })

        return (
            <div>
                {
                    !loading && (
                        <div className='request-popup'>
                            <div className='request-popup_inner1'>
                                <div className='request-header1'>select only one period
                                <img src={close} onClick={(e) => this.onClose(e)} className="close-create"></img>
                                </div>
                                <div className="user-request1">
                                    <span className='request-name'>{this.state.requestUser}</span>
                                    <span className='date'>{this.state.requestdate}</span>
                                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: 20, marginLeft: -15 }}>
                                        {period}
                                    </div>
                                </div>
                            </div>
                            <img src={change} className="change"></img>
                            <div className='request-popup_inner2'>
                                <div className='request-header2'>select only one period
                                </div>
                                <div className='user-request1'>
                                    <span className='request-name'>{this.state.userHasBeenReq}</span>
                                    <span className='date2'>{this.state.dateHasBeenReq}</span>
                                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: 20, marginLeft: -15 }}>
                                        {newPeriod}
                                    </div>
                                    <button className="select-request2" onClick={this.insertRequest}>Request</button>
                                </div>
                            </div>

                        </div>
                    )
                }
            </div>
        )
    }

}

export default RequestPopup