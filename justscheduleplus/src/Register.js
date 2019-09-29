import React, { Component } from 'react';
import "./Css/Register.css";
import error from './Images/error.png';
import Login from './Login';


class Register extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {
        username: '',
        password: '',
        confirmPass: '',
      },
      showlogin: false,
      userAlreadyHave: [],
      submitted: false,
      submitConfirm: false,
      localUrl: 'http://localhost:8080/',
      shake: 'register-popup_inner'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    })
  }

  handleSubmit(event) {
    this.setState({ shake: 'register-popup_inner', submitted: true, submitConfirm: false, userAlreadyHave: [] });
    event.preventDefault();

    const { user } = this.state
    if (user.username && user.password) {
      if (user.password === user.confirmPass) {
        const Url = this.state.localUrl + 'register';
        const othepram = {
          headers: {
            "content-type": "application/json; charset=UTF-8"
          },
          body: JSON.stringify({
            register: this.state.user
          }),
          method: "POST"
        };
        fetch(Url, othepram)
          .then(res => res.json())
          .then(json => {
            if (json == "Username is already exists!!!") {
              this.setState({ userAlreadyHave: json, user: { username: '', password: '', confirmPass: '' }, shake: 'register-popup_inner-shake', submitted: false })
            } else {
              this.setState({ user: { username: '', password: '', confirmPass: '' }, submitted: false, userAlreadyHave: [] });
              alert("Register Success")
              this.popUpLogin();
            }
          })
      } else {
        this.setState({ shake: 'register-popup_inner-shake', user: { username: '', password: '', confirmPass: '' }, submitted: false, submitConfirm: true })
      }
    } else {
      this.setState({ shake: 'register-popup_inner-shake', submitted: true })
    }
  }

  onClose = (e) => {
    if (this.props.onClose !== undefined) {
      this.props.onClose(e)
    }
  }

  popUpLogin = (e) => {
    this.onClose();
    this.props.showLogin(e);
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    const { user, submitted, userAlreadyHave, shake, submitConfirm } = this.state;

    return (
      <div className="register-popup">
        <div className={shake}>
          <div className="regis-header">
            <span className="header-text1">Regis</span>
            <span className="header-text2">ter</span>
            <div className="img-container">
              <img src={error} className="img" onClick={(e) => { this.onClose(e) }}></img>
            </div>
          </div>
          <form name="form" onSubmit={this.handleSubmit}>
            <div className="register-container">
              <input placeholder="Email or Username" type="text" className="username" name="username" value={user.username} onChange={this.handleChange} />
              {submitted && !user.username &&
                <div className="help-block">Username is required</div>
              }
              <input placeholder="Password" type="password" className="password" name="password" value={user.password} onChange={this.handleChange} />
              {submitted && !user.password &&
                <div className="help-block">Password is required</div>
              }
              <input placeholder="ConfirmPassword" type="password" className="password" name="confirmPass" value={user.confirmPass} onChange={this.handleChange} />
              {submitConfirm && !user.confirmPass && !user.password &&
                <div className="help-block">Password is not the same</div>
              }
              {userAlreadyHave.length > 0 && !user.username && <div className="help-block">This username is already exists</div>}
              <button type="submit" className="signup">Sign Up</button>
            </div>
          </form>
          <div className="regis-footer">
            <div>
              <span className="footer-text1">Already have an account?</span>
              <span className="footer-text2" onClick={this.popUpLogin}>Sign in</span>
            </div>
          </div>
          <Login onClose={this.register}></Login>
        </div>
      </div>

    );


  }
}
export default Register