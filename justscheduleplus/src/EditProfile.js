import React, { Component } from "react";
import Header from "./Header";
import "./Css/Editprofile.css";
import user from './Images/user.png';
import * as firebase from 'firebase';
import ApiKeys from './ApiKeys';

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userImg: '',
      userImgName: '',
      userImages: '',
      name: '',
      surname: '',
      email: '',
      telno: ''
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig)
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log(this.state.name);
    console.log(this.state.surname);
    console.log(this.state.email);
    console.log(this.state.telno);
    console.log(this.state.userImg);
  }

  fileSelectedHandler = (event) => {
    this.setState({
      userImages: URL.createObjectURL(event.target.files[0]),
      userImgName: event.target.files[0].name
    })
  }

  uploadImages = async (event, imgname) => {
    const response = await fetch(event);
    const blob = await response.blob();

    var ref = firebase.storage().ref().child('userImages/' + imgname);
    return ref.put(blob)
  }

  confirmUploadImage = () => {
    this.uploadImages(this.state.userImages, this.state.userImgName)
      .then(() => {
        firebase.storage().ref().child('userImages/' + this.state.userImgName).getDownloadURL()
          .then((imageURL) => {
            this.setState({
              userImg: imageURL
            })
          })
      })
      .catch((error) => {
        console.log("Fail to upload" + error);
      })
  }



  render() {

    const { userImg, userImgName, userImages, name, surname, email, telno } = this.state
    return (
      <div className="EditProfile">
        <Header />
        <div className="bodypage">
          <div className="container">
            <div className="editbox ">
              <div className="zindex">

              </div>
              <div className="edit-profile">
                {userImg == "" ? <img className="edit-userimg" src={user}></img> : <img className="edit-userimg" src={userImg}></img>}
              </div>
              <span className="selectedfile">{userImages == null ? 'no file selected' : userImgName}</span>
              <div style={{ display: 'flex', marginTop: 10 }}>
                <label htmlFor="upload-photo" className="upload-picture" >Browse...</label>
                <input type="file" name="photo" id="upload-photo" accept="image/*" onChange={this.fileSelectedHandler} />
                <button className="upload-picture" onClick={this.confirmUploadImage}>Upload</button>
              </div>
              <form name="form" onSubmit={this.handleSubmit}>
              <div className="user-information">
                <span className="span">NAME</span>
                <input type="text" className="input-userinfor" name="name" value={name} onChange={this.handleChange}/>
                <span className="span">SURNAME</span>
                <input type="text" className="input-userinfor" name="surname" value={surname} onChange={this.handleChange}/>
                <span className="span">EMAIL</span>
                <input type="text" className="input-userinfor" name="email" value={email} onChange={this.handleChange}/>
                <span className="span">TEL</span>
                <input type="text" className="input-userinfor" name="telno" value={telno} onChange={this.handleChange}/>
              </div>
              <div className="edit-profilefooter">
                <button type="submit" className="confirm-create" >Confirm</button>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminHome;
