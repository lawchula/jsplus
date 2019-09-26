import React, { Component } from "react";
import Header from "./Header";
import "./Css/Editprofile.css";
import user from "./Images/user.png";
import * as firebase from "firebase";
import ApiKeys from "./ApiKeys";

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userImg: "",
      userImgName: "",
      userImages: "",
      name: "",
      surname: "",
      email: "",
      telno: ""
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
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

  fileSelectedHandler = event => {
    this.setState({
      userImages: URL.createObjectURL(event.target.files[0]),
      userImgName: event.target.files[0].name
    });
  };

  uploadImages = async (event, imgname) => {
    const response = await fetch(event);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("userImages/" + imgname);
    return ref.put(blob);
  };

  confirmUploadImage = () => {
    this.uploadImages(this.state.userImages, this.state.userImgName)
      .then(() => {
        firebase
          .storage()
          .ref()
          .child("userImages/" + this.state.userImgName)
          .getDownloadURL()
          .then(imageURL => {
            this.setState({
              userImg: imageURL
            });
          });
      })
      .catch(error => {
        console.log("Fail to upload" + error);
      });
  };

  render() {
    const {
      userImg,
      userImgName,
      userImages,
      name,
      surname,
      email,
      telno
    } = this.state;
    return (
      <div className="EditProfile">
        <Header />
        <div className="bodypage">
          <div className="container">
            <div className="zindex"></div>

            <div className="edit-profile">
              {userImg == "" ? (
                <img className="edit-userimg" src={user}></img>
              ) : (
                <img className="edit-userimg" src={userImg}></img>
              )}
            </div>

            <label htmlFor="upload-photo">
              <img
                className="camerapic"
                src="https://i.ibb.co/MGrq4Mt/camera.png"
              ></img>
            </label>
            <span className="selectedfile2">
              {userImages == null ? "no file selected" : userImgName}
            </span>

            <input
              type="file"
              name="photo"
              id="upload-photo"
              accept="image/*"
              onChange={this.fileSelectedHandler}
            />
            <button className="upload-image" onClick={this.confirmUploadImage}>
              Upload
            </button>

            <form name="form" onSubmit={this.handleSubmit}>
              <div className="under">
                <div className="user-information">
                  <span className="span">profile</span>
                  <input
                    type="text"
                    className="input-userinfor"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={this.handleChange}
                  />

                  <input
                    type="text"
                    className="input-userinfor"
                    name="surname"
                    placeholder="Surname"
                    value={surname}
                    onChange={this.handleChange}
                  />

                  <input
                    type="text"
                    className="input-userinfor"
                    name="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={this.handleChange}
                  />

                  <input
                    type="text"
                    className="input-userinfor"
                    name="telno"
                    placeholder="Telno."
                    imageURL="https://i.ibb.co/7JQ9XtS/call-answer.png"
                    value={telno}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <br></br>
              <br></br>
              <button type="submit" className="confirmbutt">
                Confirm
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminHome;
