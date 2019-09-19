import React from 'react';
import "./Css/Login.css";
import error from './Images/error.png';
import * as jwt_decode from 'jwt-decode';


class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    var token = localStorage.getItem('tk');
    console.log(token);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    // this.setState({ submitted: true });
    // const { username, password } = this.state;
    // if (username && password) {
    //     this.props.login(username, password);
    // }
    
    const Url = 'http://localhost:8080/users/authenticate';
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
    fetch(Url,othepram)
    .then(res => res.json())
    .then(json => {
      localStorage.setItem('tk', json.tk);
      var token = localStorage.getItem('tk')

      if(token != "undefined" || token != null){
        var decoded = jwt_decode(token);
          if(decoded.position == "Manager"){
            window.location.href = "http://localhost:3000/Schedule";
          }else{
            window.location.href = "http://localhost:3000/User";
          }
        }
      }
    );
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

    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;
    
    return (
      <div className="login-popup">
        <div className="login-popup_inner">
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
              <input type="password" className="password" name="password" placeholder="Password" value={password} onChange={this.handleChange}></input>
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
                <span className="footer-text3">Sign up</span>
              </div>
            </div>
        </div>
      </div>
    );


  }
}

export default Login