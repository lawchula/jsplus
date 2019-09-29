import React, { Component } from 'react';
import './Css/RequestPopup.css';
import close from './Images/error.png';
import User from './User';
import change from './Images/refresh.png';
import url from './url';

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
            requestID: '',
            firstValue: '',
            checkRequest: [],
            checkValue: false,
            checkValues: true,
            checkValidate: true,
            allperiod: []
        }
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

    handleChange = (click) => {
        if (!this.state.checkValue) {
            this.setState({ firstCheckboxValue: click, checkValue: true })
            this.checkValidateRequest(click);
        } else {
            this.setState({ firstCheckboxValue: '', secondCheckboxValue: '', checkValue: false, checkValues: true, checkValidate: true })
        }
    }

    handleChange2 = (event) => {
        if (this.state.checkValue && this.state.checkValues) {
            this.setState({ secondCheckboxValue: event, checkValues: false })
        } else {
            this.setState({ secondCheckboxValue: '', checkValues: true })
        }
    }

    checkValidateRequest = (click) => {
        let periodUser = '';
        let periodUse = '';
        let firstArr = []
        let secondArr = []
        let totalArr = []
        let checkArr = [];
        let endArr = [];
        let valid = true;
        let validate = true;
        // let vali = true;
        // let allPeriod = this.props.showPeriod.length


        this.props.checkReq.map(e => {
            periodUser = e.Period_Time_One + "-" + e.Period_Time_Two
            firstArr.push(periodUser)
        })

        this.props.checkHasReq.map(n => {
            periodUse = n.Period_Time_One + "-" + n.Period_Time_Two
            secondArr.push(periodUse)
        })

        let period = firstArr.length
        let period2 = secondArr.length

        if (period !== 0) {
            if (period2 !== 0) {
                firstArr.map(e => {
                    secondArr.map(s => {
                        if (e === s) {
                            totalArr.push(e)
                        } else {
                            checkArr.push(e)
                            checkArr.push(s)
                        }
                    })
                })
            } else {
                firstArr.map(e => {
                    checkArr.push(e)
                })
            }
        } else {
            secondArr.map(s => {
                checkArr.push(s)
            })
        }

        if (checkArr !== 0) {
            checkArr.map(c => {
                if (c === click) {
                    totalArr.push(c)
                    valid = false;
                } else {
                    endArr.push(c)
                }
            })
        }

        secondArr.map(e => {
            if (e === click) {
                totalArr.push(e)
            } else {
                endArr.push(e)
            }
        })

        this.state.period.map(e => {
            secondArr.map(s => {
                if (e === s) {
                    this.state.newPeriod.map(x => {
                        if (click !== x) {
                            endArr.push(x)
                            validate = false;
                        }
                    })
                }
            })
        })

        this.state.newPeriod.map(e => {
            firstArr.map(s => {
                if (e === s) {
                    this.state.period.map(x => {
                        if (click !== x) {
                            endArr.push(x)
                            validate = false;
                        }
                    })
                }
            })
        })

        if (!valid && validate) {
            this.setState({ checkRequest: totalArr, checkValidate: false })
        } else if (validate) {
            this.setState({ checkRequest: endArr, checkValidate: false })
        } else {
            this.setState({ checkRequest: endArr, checkValidate: false })
        }
    }

    insertRequest = () => {
        if (this.state.firstCheckboxValue !== '' && this.state.secondCheckboxValue !== '') {
            if (!window.confirm("Do you want to Request to change Schedule?")) return
            let done = false;
            let check = true;
            let validate = '';
            let validates = '';
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
                    }
                })

                this.props.alreadyReq.map(e => {
                    if (e.Schedule_ID !== this.state.requestValue[0]) {
                        if (e.Schedule_ID !== this.state.requestValue[1]) {
                        } else {
                            validates = "Second Period has been request by other USER !!!!"
                            check = false;
                        }
                    } else {
                        validate = "First Period has been request by other USER !!!!"
                        check = false;
                    }
                })

                if (check) {
                    const Url = url + '/request';
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
                                this.setState({ requestID: json })
                                this.insertNotification();
                            }
                        })
                } else {
                    if (validate !== '' && validates !== '') {
                        alert("These Period has been request by other USER!!!")
                    } else if (validate !== '') {
                        alert(validate)
                    } else {
                        alert(validates)
                    }
                }
            }
        } else {
            alert("Please Select Period!!!!")
        }
    }


    insertNotification = () => {
        const Url = url + '/insert/notification/manager';

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
            this.setState({ requestUser: '', requestdate: '', userHasBeenReq: '', dateHasBeenReq: '', period: [], newPeriod: [], loading: true, firstCheckboxValue: '', secondCheckboxValue: '', requestValue: [] })
            this.props.onClose(e)
            this.props.schedule(e);
        }
    }

    render() {
        const { loading, firstCheckboxValue, checkRequest, checkValue, period, newPeriod, checkValidate, secondCheckboxValue } = this.state
        if (!this.props.show) {
            return null;
        }

        const showPeriod = period.map((click) => {
            return <div style={{ marginLeft: 20 }}>
                <input disabled={checkValue && click != firstCheckboxValue} type="checkbox" onClick={() => this.handleChange(click)}></input>
                <span style={{ marginLeft: 10 }} className="req-period">{click}</span>
            </div>
        })

        console.log("CheckRequest : ", checkRequest)
        const showNewPeriod = newPeriod.map((event) => {
            let valid = true;
            if (event !== secondCheckboxValue && secondCheckboxValue !== '') {
                valid = false;
            }
            return <div style={{ marginLeft: 20 }} >
                {checkValidate &&
                    <React.Fragment>
                        <input disabled={!checkValue} type="checkbox"></input>
                        <span style={{ marginLeft: 10 }} className="req-period" >{event}</span>
                    </React.Fragment>
                }
                {!checkValidate &&
                    <React.Fragment>
                        {checkRequest.map((e) => {
                            if (event === e) {
                                valid = false
                            }
                        })}
                        <input disabled={!valid} type="checkbox" name="secondCheckboxValue" onClick={() => this.handleChange2(event)} ></input>
                        <span style={{ marginLeft: 10 }} className="req-period" >{event}</span>
                    </React.Fragment>
                }
            </div>
        })

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
                                        {showPeriod}
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
                                        {showNewPeriod}
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