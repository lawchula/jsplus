import React, { Component } from 'react';
import './Css/RequestPopup.css';
import close from './Images/error.png';
import RequestPopup2 from './RequestPopup2';

class RequestPopup extends Component {

    constructor(props){
        super(props)
        this.state={
            user_request1: 'Kanniphit Buawan-ngam',
            user_request2:'Teetuch Jeeravarangkul',
            date_request1:'2/August/2019',
            date_request2:'3/August/2019',
            period: ['08.00-12.00','13.00-18.00','19.00-23.00'],
            requesetpopup2:false
        }
    }


    onClose = (e) => {
        if (this.props.onClose !== undefined) {
          this.props.onClose(e)
        }
      }
      
      showRequestPopup2 = () => {
        this.setState({requesetpopup2: !this.state.requesetpopup2})
      }
      
    

    render(){
        if(!this.props.show) {
            return null;
          }

          const period = this.state.period.map((event) => {return  <div style={{marginLeft:20}}><input type="checkbox" ></input><span style={{marginLeft:10}}>{event}</span></div> })
          
        return(
            <div className='request-popup'>
                <div className='request-popup_inner1'>
                     <div className='request-header1'>select only one period
                     <img src={close} onClick={(e) => this.onClose(e)} className="close-create"></img>
                     </div>
                    <div className="user-request1">
                        <span className='request-name'>{this.state.user_request1}</span>
                        <span className='date'>{this.state.date_request1}</span>
                        <div style={{display:'flex',flexDirection:'row',marginTop:20,marginLeft:-15}}>
                        {period}
                        </div>
                        <button className="select-request2" onClick={this.showRequestPopup2}>Select</button>
                    </div>
                </div>
                <RequestPopup2 show={this.state.requesetpopup2} onClose={this.showRequestPopup2}></RequestPopup2>
            </div>
        )
    }

}

export default RequestPopup