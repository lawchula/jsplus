import React, { Component } from 'react';
import './Css/RequestPopup2.css';
import close from './Images/error.png';

class RequestPopup2 extends Component {

    constructor(props){
        super(props)
        this.state={
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
                <div className='request-popup_inner2'>
                <div className='request-header2'>select only one period
                <img src={close} onClick={(e) => this.onClose(e)} className="close-create"></img>
                </div>
                    <div className='user-request1'>
                        <span className='request-name'>{this.state.user_request2}</span>
                        <span className='date'>{this.state.date_request2}</span>
                        <div style={{display:'flex',flexDirection:'row',marginTop:20,marginLeft:-15}}>
                        {period}
                        </div>
                        <button className="select-request2">Request</button>
                    </div>
                </div>
        )
    }

}

export default RequestPopup2