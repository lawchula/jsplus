import React, { Component } from "react";
import Admin from './AdminHowToUse';
import Staff from './StaffHowToUse';
import Manager from './ManagerHowToUse';
import Header from './Header';
import "./Css/Howtouse.css";

class HowToUse extends Component {
    constructor(props){
        super(props)
        this.state ={
            admin: true,
            manager:false,
            staff:false
        }
    }

    showAdmin = () =>{
        this.setState({
            admin:true,
            manager:false,
            staff:false
        })
    } 

    showManager = () =>{
        this.setState({
            admin:false,
            manager:true,
            staff:false
        })
    }

    showStaff = () =>{
        this.setState({
            admin:false,
            manager:false,
            staff:true
        })
    }

    render(){
        const {admin,manager,staff} = this.state

        return(
            <div style={{marginTop:62.5}}>
                <Header></Header>
                <div className="howtouse-header">
                    <span className="text-header">How to use:</span>
                    <span>  </span>
                  {admin == true ? <span className="click-howto" onClick={this.showAdmin}>Admin /</span> :<span className="text-header" onClick={this.showAdmin}> Admin /</span>}  
                  {manager == true ?  <span className="click-howto" onClick={this.showManager}> Manager /</span> : <span className="text-header" onClick={this.showManager}> Manager /</span> }
                  {staff == true ? <span className="click-howto" onClick={this.showStaff}> Staff</span> :<span className="text-header" onClick={this.showStaff}> Staff</span>} 
                </div>
              {admin == true ? <Admin></Admin> : null}  
              {manager == true ? <Manager></Manager> : null}  
              {staff == true ? <Staff></Staff> : null}  
            </div>
        )
    }
}

export default HowToUse