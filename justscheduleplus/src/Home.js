import React, { Component } from "react";
import Header from "./Header";
import "./Css/Home.css";
import AOS from 'aos';
import Login from './Login';
import Register from './Register';
import 'aos/dist/aos.css';
import coverimg from './Images/coverimg.png'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
      showregis: false,
    };
  }
  showLogin = () => {
    this.setState({
      showLogin: !this.state.showLogin
    })
  }

  showRegister = () => {
    this.setState({
      showregis: !this.state.showregis
    })
  }

  componentDidMount() {
    AOS.init({
      duration: 2500
    })
  }

  render() {
    return (
      <div className="Home">
        <Header />
<<<<<<< Updated upstream

        <div className="headhome">
          <div className="col-xl-7 col-12 .col-sm-12  headtext" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="p-1">WE ARE SCHEDULE MANAGEMENT WEBSITE</span>
            <span className="p-2">MAKE YOUR LIFE EASIER</span>
            <span className="p-3">GET STARTED NOW!</span>
            <div className="headbutt ">
              <button onClick={this.showLogin} className="signinbutt">Sign In</button>
              <button onClick={this.showRegister} className="regisbutt">Sign Up</button>
=======
      
          <div className="headhome">
            <div className="col-xl-7 col-12 .col-sm-12  headtext" style={{display:'flex',flexDirection:'column'}}>
              <span className="p-1">WE ARE SCHEDULE MANAGEMENT WEBSITE</span>
              <span className="p-2">MAKE YOUR LIFE EASIER</span>
              <span className="p-3">GET STARTED NOW!</span>
              <div className="headbutt ">
                <button className="signinbutt">Create Company</button>
                <button className="regisbutt">Join Company</button>
              </div>
            </div>
            <div className="col-sm-5 headpic d-flex" style={{backgroundColor:'#07889b',height:330}}>
              <img
                src={coverimg}
                className="managePic"
              />
>>>>>>> Stashed changes
            </div>
          </div>
          <Login show={this.state.showLogin} onClose={this.showLogin}></Login>
        <Register show={this.state.showregis} onClose={this.showRegister}></Register>
          <div className="col-sm-5 headpic d-flex" style={{ backgroundColor: '#07889b', height: 330 }}>
            <img
              src={coverimg}
              className="managePic"
            />
          </div>
        </div>
        <row>
          <div className="logotext">
            <span className="logotext1">JUST SCHEDULE</span>
            <span className="logotext2">PLUS </span>
          </div>
        </row>
        <row>
          <div className="description">
            <div className="roledes">
              <div data-aos='fade-right' className="role1pic col-6 ">
                {/* <img
                  src="https://i.ibb.co/7QkNCbV/staff.png"
                  className="staffpic"
                /> */}
                <img src='https://www.transamericacenter.org/images/default-source/employer-research-images/tcrs_employer_16th_web_image.png?sfvrsn=7f695d9b_2' className='staffpic' />
              </div>
              <div data-aos='fade-left' className="role1des col-6 ">
                <p className="p-title">STAFF</p>
                <p className="p-6">
                  {" "}
                  <img
                    src="https://i.ibb.co/566GQTF/eye-1.png"
                    className="despic"
                  />
                  View work schedule
                </p>
                <p className="p-6">
                  {" "}
                  <img
                    src="https://i.ibb.co/3r9thz6/exchange-arrows.png"
                    className="despic"
                  />
                  Able to request for changing schedule or personal leave
                </p>
                <p className="p-6">
                  {" "}
                  <img
                    src="https://i.ibb.co/wcGLtD8/statistics.png"
                    className="despic"
                  />
                  View work statistic
                </p>
              </div>

            </div>
            <br />
            <div className="roledes">
              <div data-aos="fade-right" className="role2des col-6">
                <p className="p-title">MANAGER</p>
                <p className="p-6">
                  {" "}
                  <img
                    src="https://i.ibb.co/k3TxSgd/management.png"
                    className="despic"
                  />
                  Able to manage staff's work schedule
                </p>
                <p className="p-6">
                  {" "}
                  <img
                    src="https://i.ibb.co/z7qL1YF/shuffle.png"
                    className="despic"
                  />
                  Able to change work schedule everytime
                </p>
                <p className="p-6">
                  {" "}
                  <img
                    src="https://i.ibb.co/8KT04bn/check-sign-in-a-rounded-black-square.png"
                    className="despic"
                  />
                  Able approve or reject staff's request for changing schedule
                  or personal leave
                </p>
              </div>

              <div data-aos='fade-left' className="role2pic col-6 ">
                <img
                  src="https://i.ibb.co/MBD4dNM/manager.jpg"
                  className="managerpic"
                />
              </div>
            </div>
            <br />
            <div className="roledes">
              <div data-aos='fade-right' className="role3des col-6 ">
                <img
                  src="https://i.ibb.co/SsXrhJJ/adm.jpg"
                  className="admpic"
                />
              </div>
              <div data-aos='fade-left' className="role3pic col-6 ">
                <p className="p-title">ADMINISTRATOR</p>
                <p className="p-6">
                  {" "}
                  <img
                    src="https://i.ibb.co/RpB0ZY8/department.png"
                    className="despic"
                  />
                  Create Department
                </p>
                <p className="p-6">
                  {" "}
                  <img
                    src="https://i.ibb.co/fXXW834/mail.png"
                    className="despic"
                  />
                  Send verifly E-mail to user
                </p>
                <p className="p-6">
                  {" "}
                  <img
                    src="https://i.ibb.co/Jmg3Xf5/man-with-company.png"
                    className="despic"
                  />
                  Create Company
                </p>
                <p className="p-6">
                  {" "}
                  <img
                    src="https://i.ibb.co/ydQ487z/icon.png"
                    className="despic"
                  />
                  Import user's information from excel and export schedule to
                  excel
                </p>
              </div>
            </div>
          </div>
        </row>
        <br />
        <br />

        <div className="footer">
          <div className="col-8 d-flex ftext1">

          </div>
          <div className="col-4  ftext2" />

        </div>
      </div>
    );
  }
}

export default Home;
