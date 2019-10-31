import React from 'react';
import "./Css/Login.css";
import error from './Images/error.png';
import * as jwt_decode from 'jwt-decode';
import Register from './Register';
import url from './url';


class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      submitted: false,
      showregis: false,
      loginFail: [],
      shake: 'login-popup_inner',
      submittedValid: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { username, password } = this.state;
    this.setState({ shake: 'login-popup_inner' })
    if (username !== '' && password !== '') {
      this.setState({ submitted: false, submittedValid: false })

      //(/user/login/authenticate)
      const Url = url + '/user/login/authenticate';
      const othepram = {
        headers: {
          "content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        }),
        method: "POST"
      };
      fetch(Url, othepram)
        .then(res => res.json())
        .then(json => {
          if (json == "Wrong Username or Password") {
            this.setState({ loginFail: json, shake: 'login-popup_inner-shake', username: '', password: '', submittedValid: true })
          } else {
            localStorage.setItem('sc', json.sc);
            this.requestToken();
          }
        });
    } else {
      this.setState({ submitted: true, shake: 'login-popup_inner-shake' })
    }
  }

  requestToken = () => {
    //(/user/login/authenticated)
    const Url = url + '/user/login/authenticated';
    const othepram = {
      headers: {
        "content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
      method: "POST"
    };
    fetch(Url, othepram)
      .then(res => res.json())
      .then(json => {
        if (json == "Not have Profile") {
          window.location.href = "/EditProfile";
        }
        else if (json == "Not have Position") {
          window.location.href = "/";
        } else {
          localStorage.setItem('tk', json.tk);
          var token = localStorage.getItem('tk')
          if (token != "undefined" || token != null) {
            this.setState({ loginFail: [] });
            var decoded = jwt_decode(token);
            if (decoded.position == "Manager") {
              window.location.href = "/Schedule";
            } else if(decoded.position === "Admin"){
              window.location.href = "/Company";
            }else{
              window.location.href = "/User";
            }
          }
        }
      })
  }

  onClose = (e) => {
    if (this.props.onClose !== undefined) {
      this.props.onClose(e)
    }
    this.setState({ loginFail: [], shake: 'login-popup_inner', submitted: false })
  }

  popUpRegister = (e) => {
    this.onClose();
    this.props.showRegis(e);
  }

  render() {

    if (!this.props.show) {
      return null;
    }
    const { username, password, submitted, loginFail, submittedValid } = this.state;

    return (
      <div className="login-popup">
        <div className={this.state.shake}>
          <div className="login-header">
            <span className="login-header-text1">Sign</span>&nbsp;
                    <span className="login-header-text2">In</span>
            <div className="close-container">
              <img src={error} id="img" onClick={(e) => { this.onClose(e) }}></img>
            </div>
          </div>
          <form name="form" onSubmit={this.handleSubmit}>
            <div className="login">
              <input type="text" className="username" name="username" placeholder="Username or Email" value={username} onChange={this.handleChange}></input>
              {submitted && !username &&
                <div className="help-block">Username is required</div>
              }
              <input type="password" className="password" name="password" placeholder="Password" value={password} onChange={this.handleChange}></input>
              {submitted && password == '' ?
                <div className="help-block">Password is required</div> : ''
              }
              {submittedValid && loginFail.length > 0 && !username && <div className="help-block">Username or password is incorrect</div>}
              <div className="remember">
                <input type="checkbox"  ></input>
                <span className="remember-text">Remember me</span>
              </div>
              <button type="submit" className="sign-in">Sign In</button>
            </div>
          </form>
          <div className="login-footer">
            <span className="footer-text1">Forgot Password ?</span>
            <div>
              <span className="footer-text2" >Don't have an account?</span>
              <span className="footer-text3" onClick={this.popUpRegister}>Sign up</span>
            </div>
          </div>
          <Register onClose={this.popUpRegister}></Register>
        </div>
      </div>
    );


  }
}

export default Login