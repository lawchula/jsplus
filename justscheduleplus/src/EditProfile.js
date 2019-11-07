import React, { Component } from "react";
import Header from "./Header";
import "./Css/Editprofile.css";
import user from "./Images/user.png";
import * as firebase from "firebase";
import ApiKeys from "./ApiKeys";
import url from './url';
import cartoon from './Images/cartoon.png';

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
      password:"",
      userDetail: null,
      loading: true,
      validate: "",
      format: "",
      submiited: false,
      changepassword: false,
      oldpass:"",
      newpass:"",
      conpass:"",
      val:{val1:"",val2:"",val3:""}
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
    console.log(userDetail)

  }
  setProfileDetail = () => {
    let detail = this.state.userDetail
    this.setState({ name: detail[0].name, surname: detail[0].surname, email: detail[0].Email, telno: detail[0].PhoneNumber, userImg: detail[0].UserPicture, password: detail[0].Password,loading: false })
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.setState({val:{val1:"",val2:"",val3:""}})
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
          const Url = url + '/user/profile/update';
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
        } else {
          const Url = url + '/user/profile/update';
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
      } else {
        this.setState({ format: "Please field the right format", validate: "" });
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
    if (event !== null) {
      this.uploadImages()
      this.confirmUploadImage()
    }
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

  changepassword = () => {
    this.setState({
      changepassword:true
    })
  }

  updatePassword = () => {
    const validatenewpass = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,}$/

    if(this.state.oldpass.trim() !== "" && this.state.newpass.trim() !=="" && this.state.conpass.trim() !== "") {
         if(this.state.oldpass !== this.state.password){
          this.setState({val:{val1:"Old password is incorrect"}})
        }else if(this.state.newpass === this.state.password){
          this.setState({val:{val2:"Invalid password"}})
        }else if(!validatenewpass.test(this.state.newpass)){
          this.setState({val:{val2:"Password must be at least 8 characters and contain at least 1 Uppercase"}})
        } else if(this.state.newpass !==  this.state.conpass){
            this.setState({val:{val3:"This confirm password does not match"}})
        }else{
          const Url = url + '/user/password/update';
          const { newpass } = this.state
          const othepram = {
              headers: {
                  "content-type": "application/json; charset=UTF-8",
              },
              body: JSON.stringify({
                  userid: this.state.userDetail[0].User_ID,
                  newpassword: newpass
              }),
              method: "POST"
          };
          fetch(Url, othepram)
              .then(res => {
                window.location.href = "/"
              })
              // .then(json => {
              //   if (json === "Edit Password Success") {
                 
              //   }
              // })
              .catch(error => console.log(error));
        }
    }else{
          this.setState({val:{val4:"This field is requried"}})
     }

  


  }

  render() {
    const { userImg, userImgName, userImages, name, surname, email, telno, userDetail, loading, validate, submiited, format, changepassword } = this.state;
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
                {userImg == "" ? " " : (<img className="edit-userimg" src={userImg}></img>)}
              </div>
              <span className="selectedfile2">
                {userImages == null ? "no file selected" : userImgName}
              </span>
              <label htmlFor="upload-photo" className="confirmbutt2">Browse
                </label>
              <input
                type="file"
                name="photo"
                id="upload-photo"
                accept="image/*"
                onChange={this.fileSelectedHandler}
              />

                <div className="under">
                  <div className="user-information">
                    <div style={{ display: "flex" }}>
                      <span className="span">Profile</span>
                      <span className="span" style={{ marginLeft: 130 }} onClick={this.changepassword}>Change Password</span>
                    </div>
                    {this.state.changepassword == true  ?
                      <div style={{ display: "flex", flexDirection: "column" }}>
                           <span className="span" >Old password</span>
                           <input value={this.state.oldpass} type="password" name="oldpass" className="input-userinfor" onChange={this.handleChange}></input>
                           <span className="Editprofile-validate">
                            {this.state.oldpass == "" ? this.state.val.val4 : this.state.val.val1}
                            </span>

                           <span className="span" >New password</span>
                           <input value={this.state.newpass} type="password" name="newpass" className="input-userinfor" onChange={this.handleChange} ></input>
                           <span className="Editprofile-validate">
                           {this.state.newpass == "" ? this.state.val.val4 : this.state.val.val2}
                           </span>

                           <span className="span">Confirm password</span>
                           <input value={this.state.conpass} type="password" name="conpass" className="input-userinfor" onChange={this.handleChange}></input>
                           <span className="Editprofile-validate">
                           {this.state.conpass == "" ? this.state.val.val4 : this.state.val.val3}
                           </span>
                      </div>
                      :
                      <form name="form" onSubmit={this.handleSubmit}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
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
                      <button type="submit" className="confirmbutt">
                        Update Profile
                    </button>
                      </form>
                    }

                  </div>
                </div>
              {changepassword == true ? <div><button className="confirmbutt3" onClick={this.updatePassword}>
                  Update Password
              </button>
              <br></br>
              <button className="confirmbutt3" onClick={() => this.setState({changepassword:false})}>
                  Cancle
          </button>
          </div> : null}  
            </div>
            {/* <div className="col-10">
                  <img src={cartoon}></img>
              </div> */}
          </div>
          {console.log(userImg)}
        </React.Fragment>
        }
      </div> 
    );

  }

}

export default AdminHome;
