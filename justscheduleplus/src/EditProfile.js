import React, { Component } from "react";
import Header from "./Header";
import "./Css/Editprofile.css";
import user from './Images/user.png';

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
              <div className="zindex">
        
              </div>
                <div className="edit-profile">
                    <img src={user} className="edit-userimg"></img>
                </div>
                <div style={{display:'flex',marginTop:10}}>
                    <label htmlFor="upload-photo"  className="upload-picture">Browse...</label>
                    <input type="file" name="photo" id="upload-photo"  onChange={this.fileSelectedHandler}/>
                    <button className="upload-picture" onClick={this.confirmUploadImage}>Upload</button>
                </div>
                <div className="user-information">
                <span className="span">USERNAME</span>
                <input  type="text" className="input-userinfor" />
                <span className="span">NAME</span>
                <input  type="text" className="input-userinfor" />
                <span className="span">SURNAME</span>
                <input  type="text" className="input-userinfor" />
                <span className="span">EMAIL</span>
                <input  type="text" className="input-userinfor" />
                <span className="span">TEL</span>
                <input  type="text" className="input-userinfor" />
                </div>
                <div className="edit-profilefooter">
                    <button type="submit" className="confirm-create" >Confirm</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminHome;
