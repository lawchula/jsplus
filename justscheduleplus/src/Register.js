import React, { Component } from 'react';
import "./Css/Register.css";
import error from './Images/error.png';


class Register extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {
        username: '',
        password: '',
        confirmPass: ''
      },
      submitted: false,
      localUrl: 'http://localhost:8080/'
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
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state
    if (user.password == user.confirmPass) {
      if (user.username && user.password) {
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
          .then(data => { 
            return data.json() })
          .catch(error => console.log(error))
      }
    }
  }

  onClose = (e) => {
    if (this.props.onClose !== undefined) {
      this.props.onClose(e)
    }
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    const { user, submitted } = this.state;

    return (
      <div className="register-popup">
        <div className="register-popup_inner">
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
              {submitted && user.confirmPass != user.password &&
                <div className="help-block">Password is not same</div>
              }
               <button type="submit" className="signup">Sign Up</button>
            </div>
          </form>
          <div className="regis-footer">
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