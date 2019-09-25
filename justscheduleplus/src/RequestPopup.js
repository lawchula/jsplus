import React, { Component } from 'react';
import './Css/RequestPopup.css';
import close from './Images/error.png';
import User from './User';

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
            requesetpopup2: false,
            loading: true
        }
    }

    componentDidMount = () => {
        this.receiveRequest();
    }

    receiveRequest = () => {
        let setDate = "";
        let setPeriod = "";
        let arr = [];
        let SecondArray = [];

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
            this.setState({ userHasBeenReq: this.props.secondUser.Name, dateHasBeenReq: setDate, newPeriod: arr, loading: false})
            arr = [];
        }
    }

    onClose = (e) => {
        if (this.props.onClose !== undefined) {
            this.props.onClose(e)
        }
    }

    showRequestPopup2 = () => {
        this.setState({ requesetpopup2: !this.state.requesetpopup2 })
    }

    render() {
        const { loading } = this.state
        if (!this.props.show) {
            return null;
        }
        const period = this.state.period.map((event) => { return <div style={{ marginLeft: 20 }}><input type="checkbox" ></input><span style={{ marginLeft: 10 }}>{event}</span></div> })
        const newPeriod = this.state.newPeriod.map((event) => { return <div style={{ marginLeft: 20 }}><input type="checkbox" ></input><span style={{ marginLeft: 10 }}>{event}</span></div> })

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
                            <div className='request-popup_inner2'>
                                <div className='request-header2'>select only one period
                                </div>
                                <div className='user-request1'>
                                    <span className='request-name'>{this.state.userHasBeenReq}</span>
                                    <span className='date'>{this.state.dateHasBeenReq}</span>
                                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: 20, marginLeft: -15 }}>
                                        {newPeriod}
                                    </div>
                                    <button className="select-request2">Request</button>
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