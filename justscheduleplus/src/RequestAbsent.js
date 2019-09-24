import React, { Component } from 'react';
import close from './Images/error.png';
import './Css/RequestAbsent.css';

class RequestAbsent extends Component {
   
    constructor(props){
        super(props);
        this.state = {
            user_request2:'Teetuch Jeeravarangkul',
            date_request2:'3/August/2019',
            period: ['08.00-12.00','13.00-18.00','19.00-23.00'],
        }
    }


    onClose = (e) => {
        if (this.props.onClose !== undefined) {
          this.props.onClose(e)
        }
    }


    render(){

        if(!this.props.show) {
            return null;
          }

          const period = this.state.period.map((event) => {return  <div style={{marginLeft:20}}><input type="checkbox" ></input><span style={{marginLeft:10}}>{event}</span></div> })

        return(
            <div className="request-popup-absent">
            <div className='request-popup_inner1'>
                <div className='request-header2-absent'>able to select more than one period
                <img src={close} onClick={(e) => this.onClose(e)} className="close-create"></img>
                </div>
                    <div className='user-request1-absent'>
                        <span className='request-name-absent'>{this.state.user_request2}</span>
                        <span className='date-absent'>{this.state.date_request2}</span>
                        <div style={{display:'flex',flexDirection:'row',marginTop:20,marginLeft:-15}}>
                        {period}
                        </div>
                        <div style={{display:'flex',marginTop:15}}> 
                        <span className="date-absent">Please specific reason :</span>
                        <select className="type">
                            <option>Excused Absences</option>
                            <option>Sick Time</option>
                            <option>Personal Time</option>
                            <option>Vacation Days</option>
                            <option>Family and Medical Leave</option>
                            <option>Bereavement or Sympathy Leave</option>
                            <option>Jury Duty</option>
                            </select>
                        </div>
                        <input type="text" className="reason" style={{marginTop:5}}></input>
                        <button className="select-request2-absent">Request</button>
                    </div>
                </div>
            </div>
        )
    }



}

export default RequestAbsent