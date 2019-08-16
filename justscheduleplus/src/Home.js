import React, { Component } from "react";

import "./App.css";
import Header from "./Header";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Home">
        <Header />
        <row>
          <div className="headhome">
            <div className="col-6  headtext">
              <p className="p-1">WE ARE SCHEDULE MANAGEMENT WEBSITE</p>

              <p className="p-2">MAKE YOUR LIFE EASIER</p>

              <p className="p-3">GET START NOW!</p>

              <div className="headbutt ">
                <button className="signinbutt">
                  <p className="p-4">sign-in</p>
                </button>
                <button className="regisbutt">
                  <p className="p-4">register</p>
                </button>
              </div>
            </div>
            <div className="col-6 headpic d-flex">
              <img
                src="https://i.ibb.co/Q90F1Yn/mnghome.png"
                className="managePic"
              />
            </div>
          </div>
        </row>
        <row>
          <p className="logotext d-flex">
            <b>JUST SCHEDULE </b>
            <p className="logotext2">
              {" "}
              <b>PLUS</b>
            </p>
          </p>
        </row>
        <row>
          <div className="description">
            <div className="roledes">
              <div className="col-0.5 " />
              <div className="role1des col-5 ">
                <img
                  src="https://i.ibb.co/7QkNCbV/staff.png"
                  className="staffpic"
                />
              </div>
              <div className="role1pic col-6 ">
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
              <div className="col-0.5 " />
            </div>
            <br />
            <div className="roledes">
              <div className="col-0.5 " />
              <div className="role2des col-6 ">
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

              <div className="role2pic col-5 ">
                <img
                  src="https://i.ibb.co/MBD4dNM/manager.jpg"
                  className="managerpic"
                />
              </div>
              <div className="col-0.5 " />
            </div>
            <br />
            <div className="roledes">
              <div className="col-0.5 " />
              <div className="role3des col-5 ">
                <img
                  src="https://i.ibb.co/SsXrhJJ/adm.jpg"
                  className="admpic"
                />
              </div>
              <div className="role3pic col-6 ">
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
              <div className="col-0.5 " />
            </div>
          </div>
        </row>
        <br />
        <br />

        <div className="footer">
          <div className="col-8 d-flex ftext1">
            <p>123</p>
          </div>
          <div className="col-4  ftext2" />
          <p>123</p>
        </div>
      </div>
    );
  }
}

export default Home;
