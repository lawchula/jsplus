import React, { Component } from 'react';
import "./Css/Login.css";
import error from './Images/error.png';
 

class Login extends Component{
    
  constructor(props){
        super(props)
        this.state = {
          
        }
    }
    
    onClose = (e) => {
      if (this.props.onClose != undefined) {
        this.props.onClose(e)
      }
    }
  

    render(){
      if(!this.props.show) {
        return null;
      }

        return(
           <div className="login-popup">
             <div className="login-popup_inner">
               <div className="login-header">
                    <span className="login-header-text1">Sign</span>&nbsp;
                    <span className="login-header-text2">In</span>
                    <div className="close-container">
                        <img src={error} id="img" onClick={(e) => { this.onClose(e) }}></img>
                    </div>
               </div>
               <div className="login">
                  <input className="username-login" placeholder="Username or Email"></input>
                  <input className="password-login" placeholder="Password"></input>
                  <div className="remember">
                  <input type="checkbox"  ></input>
                  <span className="remember-text">Remember me</span>
                  </div>
                  <button type="submit" className="sign-in">Sign In</button>
               </div>
               <div  className="login-footer">
                  <span className="footer-text1">Forgot Password ?</span>
                  <div>
                    <span className="footer-text2" >Don't have an account?</span>
                    <span className="footer-text3">Sign up</span>
                   </div>
              </div>
             </div>
           </div>   
      
        );
       

    }
}

export default Login