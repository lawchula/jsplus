import React, { Component } from "react";
import Header from "./Header";
import "./Css/Editprofile.css";
import user from "./Images/user.png";
import * as firebase from "firebase";
import ApiKeys from "./ApiKeys";
import url from './url';

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
      telno: "",
      userDetail: null,
      loading: true,
      validate: "",
      format: "",
      submiited: false
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.checkToken()
  }

  async checkToken() {
    var token = localStorage.getItem('sc')
    var detailtk = localStorage.getItem('tk');

    if (token != null && token != "undefined") {
      this.getUserDetail(token);
    } else {
      window.location.href = '/'
    }
  }

  getUserDetail = async (token) => {
    const othepram = {
      headers: {
        tkAuth: token
      },
      method: "GET"
    };

    const data = await Promise.all([
      fetch(url + '/user/profile', othepram)
        .then((response) => {
          return response.json();
        }),
    ])

    const [userDetail] = data
    this.setState({ userDetail })
    this.setProfileDetail();

  }
  setProfileDetail = () => {
    let detail = this.state.userDetail
    this.setState({ name: detail[0].name, surname: detail[0].surname, email: detail[0].Email, telno: detail[0].PhoneNumber, userImg: detail[0].UserPicture, loading: false })
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    let { validate } = this.state;
    const validEmailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const phoneno = /^0[0-9]{8,9}$/i;

    this.setState({ submiited: true })
    if (this.state.name !== null && this.state.surname !== null) {
      if (validEmailRegex.test(this.state.email) && phoneno.test(this.state.telno)) {
        var token = localStorage.getItem('tk');
        var detailtk = localStorage.getItem('sc');
        if (token != null && token != "undefined") {
          const Url = url + '/insert/user/profile';
          const othepram = {
            headers: {
              "content-type": "application/json; charset=UTF-8",
              tkAuth: token
            },
            body: JSON.stringify({
              name: this.state.name,
              surname: this.state.surname,
              email: this.state.email,
              telno: this.state.telno,
              picture: this.state.userImg,
            }),
            method: "POST"
          };
          fetch(Url, othepram)
            .then(res => res.json())
            .then(json => {
              if (json === "Edit Profile Success") {
                window.location.href = "/"
              }
            })
        }else{
          const Url = url + '/insert/user/profile';
          const othepram = {
            headers: {
              "content-type": "application/json; charset=UTF-8",
              tkAuth: detailtk
            },
            body: JSON.stringify({
              name: this.state.name,
              surname: this.state.surname,
              email: this.state.email,
              telno: this.state.telno,
              picture: this.state.userImg,
            }),
            method: "POST"
          };
          fetch(Url, othepram)
            .then(res => res.json())
            .then(json => {
              if (json === "Edit Profile Success") {
                window.location.href = "/"
              }
            })
        }
      }else{
        this.setState({ format: "Please field the right format",validate: ""});
      }
    } else {
      this.setState({ validate: "This field is requried" });
    }
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
      const { userImg, userImgName, userImages, name, surname, email, telno, userDetail, loading, validate, submiited,format } = this.state;
      // const validEmailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      // const phoneno = /^0[0-9]{8,9}$/i;

      return (
        <div className="EditProfile">
          {!loading && <React.Fragment>
            <Header />
            <div className="bodypage">
              <div className="container">
                <div className="zindex"></div>

                <div className="edit-profile">
                  {userImg == "" ?  " " : (<img className="edit-userimg" src={userImg}></img>)}
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
                      <span className="span">Profile</span>
                      <input type="text" className="input-userinfor" name="name" placeholder="Name" value={name} onChange={this.handleChange} />

                      <span className="Editprofile-validate">
                        {submiited && !name && validate}
                      </span>

                      <input type="text" className="input-userinfor" name="surname" placeholder="Surname" value={surname} onChange={this.handleChange} />

                      <span className="Editprofile-validate">
                        {submiited && !surname && validate}
                      </span>

                      <input
                        type="text"
                        className="input-userinfor"
                        name="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={this.handleChange}
                      ></input>

                      <span className="Editprofile-validate">
                        {submiited && !email && validate || format}
                      </span>

                      <input
                        type="text"
                        className="input-userinfor"
                        name="telno"
                        placeholder="Telno."
                        imageURL="https://i.ibb.co/7JQ9XtS/call-answer.png"
                        value={telno}
                        onChange={this.handleChange}
                      />

                      <span className="Editprofile-validate">
                        {submiited && !telno && validate || format}
                      </span>

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
            {console.log(userImg)}
          </React.Fragment>
          
          }
        </div>
      );
      
    }
    
  }

  export default AdminHome;
