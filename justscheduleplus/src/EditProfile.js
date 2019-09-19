import React, { Component } from "react";
import Header from "./Header";
import "./Css/Editprofile.css";

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="EditProfile">
        <Header />
        <div className="bodypage">
          <div className="container">
            <div className="editbox ">
              <img
                src="https://i.ibb.co/Bfq9svj/back-arrow-1.png"
                className="return"
              ></img>
              <button className="edithead">EDIT PROFILE</button>

              <img
                src="https://i.ibb.co/r09kNbX/user-2.png"
                className="profilepic"
              ></img>
              <div className="d-flex edit">
                <span className="editlink">
                  <u>edit</u>
                  <img
                    className="camerapic"
                    src="https://i.ibb.co/hgsqcL7/photo-camera.png"
                  ></img>
                </span>
              </div>
              {/* <form onSubmit={this.handleSubmit}> */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: 1000,
                  position: "relative",
                  alignItems: "center"
                }}
              >
                <label className="edittextname">
                  Name:
                  <input
                    className="Name"
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                </label>
                <br></br>
                <label className="edittextsurname">
                  Surname:
                  <input
                    className="surname"
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                </label>
                <br></br>
                <label className="edittextemail">
                  E-mail:
                  <input
                    className="email"
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                </label>
                <br></br>
                <label className="edittextphone">
                  Phonenumber:
                  <input
                    className="phonenum"
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                </label>
                <br></br>
                <input className="submitbutton" type="submit" value="Submit" />
              </div>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminHome;
