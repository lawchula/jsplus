import React, { Component } from "react";
import close from './Images/error.png';
import './Css/ExampleImport.css';
import example from './Images/example.png';

class ExampleImport extends Component {
    constructor(props){
        super(props)
    }

    
  onClose = e => {
    if (this.props.onClose != undefined) {
      this.props.onClose(e);
    }
  };


    render(){
        if (!this.props.show) {
            return null;
          }
        return(
            <div className="example-popup">
                <div className="example-popup_inner">
                <div className="example-header">
                    <span>Example</span>
                    <img src={close} onClick={(e) => this.onClose(e)} className="close-create"></img>
                 </div>
                 <div className="example-content">
                        <img src={example} style={{width:590,height:80,marginTop:10}}></img>
                        <span  className="exam-text">1. Column one is name</span>
                        <span  className="exam-text">2. Column two is surname</span>
                        <span  className="exam-text">3. Column three is email</span>
                        <span  className="exam-text">4. Column four is telephone number</span>
                        <span className="exam-text2">*** Your excel file must look like this template </span>
                 </div>
                  
                </div>
            </div>
        )
    }
}

export default ExampleImport