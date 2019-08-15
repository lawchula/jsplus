import React, { Component } from 'react';
import "./Css/Register.css";
import error from './Images/error.png';
 

class Register extends Component{
    
  constructor(props){
        super(props)
        this.state = {
          
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

        return(
           <div className="register-popup">
             <div className="register-popup_inner">
               <div className="regis-header">
                    <span className="header-text1">Regis</span>
                    <span className="header-text2">ter</span>
                    <div className="img-container">
                        <img src={error} className="img" onClick={(e) => { this.onClose(e) }}></img>
                    </div>
               </div>
               <div className="register-container">
                  <input className="username" placeholder="Email or Username"></input>
                  <input className="password" placeholder="Password"></input>
                  <input className="password" placeholder="Confirm Password"></input>
                  <button type="submit" className="signup">Sign Up</button>
               </div>
               <div  className="regis-footer">
                  <div>
                    <span className="footer-text1">Already have an account?</span>
                    <span className="footer-text2">Sign in</span>
                   </div>
              </div>
             </div>
           </div>   
      
        );
       

    }
}

export default Register