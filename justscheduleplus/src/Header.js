import React, { Component } from 'react';
import './Css/App.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import './Css/Header.css';
import Login from './Login';
import Register from './Register';
import Schedule from './Schedule';
import * as jwt_decode from 'jwt-decode';
import { DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from 'reactstrap';
import edit from './Images/edit.png';
import signout from './Images/signout.png';
import select from './Images/select.png';
import schedule1 from './Images/schedule1.png';
import Notification from './Images/notification.png';
import url from './url';


class Header extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      name: [],
      dropdownOpen: false,
      loading: true,
      haveNotification: true,
      haveAbsentNoti: true,
      notificationOpen: false,
      userhaveNoti: true,
      managerNoti: [],
      managerNotificationAbsent: [],
      userNotification: []
    };
  }

  componentDidMount() {
    this.checkToken();
  }

  checkToken = () => {
    let token = localStorage.getItem('sc');
    let detailtk = localStorage.getItem('tk');

    if (token != null && token != "undefined") {
      if (detailtk != null && detailtk != "undefined") {
        var decoded = jwt_decode(detailtk)
        if (decoded.position === "Manager") {
          this.getManagerNoti(token, detailtk)
        } else {
          this.getUserNoti(token, detailtk)
        }
      } else {
        this.getNewUser(token);
      }
    } else {
      this.setState({ loading: false })
    }
  }

  getNewUser = async (token) => {
    const othepram = {
      headers: {
        tkAuth: token
      },
      method: "GET"
    };

    const data = await Promise.all([
      fetch(url + '/name', othepram)
        .then((response) => {
          return response.json();
        })
    ])

    const [name] = data;
    this.setState({ name, loading: false })
  }

  getManagerNoti = async (token, detailtk) => {
    let userRequest = [];
    let userReq = [];

    const othepram = {
      headers: {
        tkAuth: token
      },
      method: "GET"
    };

    const otheprams = {
      headers: {
        tkAuth: detailtk
      },
      method: "GET"
    };

    const data = await Promise.all([
      fetch(url + '/name', othepram)
        .then((response) => {
          return response.json();
        }),
      fetch(url + '/manager/notification', otheprams)
        .then((response) => {
          return response.json();
        })
    ])

    const [name, managerNoti] = data;
    this.setState({ name, managerNoti })

    this.state.managerNoti.map(notification => {
      userRequest.push(notification)
      if (userRequest[0].name != notification.name && userRequest[0].Request_ID == notification.Request_ID) {
        userReq.push([userRequest[0], notification]);
        userRequest = []
        this.setState({ haveNotification: false })
      }
    })
    this.getManagerAbNoti(otheprams, userReq)
  }

  getManagerAbNoti = async (otheprams, userReq) => {
    await fetch(url + '/manager/notification/absent', otheprams)
      .then(res => res.json()
        .then(json => {
          this.setState({ managerNotificationAbsent: json, haveAbsentNoti: false })
        }))
    this.setState({ managerNoti: userReq, loading: false })
  }
  getUserNoti = async (token, detailtk) => {
    const othepram = {
      headers: {
        tkAuth: token
      },
      method: "GET"
    };

    const otheprams = {
      headers: {
        tkAuth: detailtk
      },
      method: "GET"
    };

    const data = await Promise.all([
      fetch(url + '/name', othepram)
        .then((response) => {
          return response.json();
        }),
      fetch(url + '/user/notification', otheprams)
        .then((response) => {
          return response.json();
        })
    ])

    const [name, userNotification] = data;
    this.setState({ name, userNotification, loading: false, userhaveNoti: false, managerNoti: "T" })

  }
  clickApproveExchangeNotification = (notification) => {
    if (!window.confirm("Do you want to approve this request?")) return
    const Url = url + '/notification/approve';

    const othepram = {
      headers: {
        "content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        approve: notification
      }),
      method: "POST"
    };
    fetch(Url, othepram)
      .then(data => { return data.json() })
      .then(res => {
        this.setState({ loading: true, haveNotification: true })
        this.checkToken();
        this.props.Schedule();
      })
      .catch(error => console.log(error))
  }

  clickRejectExchangeNotification = (notification) => {
    if (!window.confirm("Do you want to reject this request?")) return
    const Url = url + '/notification/reject';

    const othepram = {
      headers: {
        "content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        reject: notification
      }),
      method: "POST"
    };
    fetch(Url, othepram)
      .then(data => { return data.json() })
      .then(res => {
        this.setState({ loading: true, haveNotification: true })
        this.checkToken();
      })
      .catch(error => console.log(error))
  }

  clickApproveAbsentNotification = (notification) => {
    if (!window.confirm("Do you want to approve this absent request?")) return
    const Url = url + '/notification/absent/approve';

    const othepram = {
      headers: {
        "content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        approve: notification
      }),
      method: "POST"
    };
    fetch(Url, othepram)
      .then(data => { return data.json() })
      .then(res => {
        this.setState({ loading: true, haveNotification: true })
        this.checkToken();
        this.props.Schedule();
      })
      .catch(error => console.log(error))
  }

  clickRejectAbsentNotification = (notification) => {
    if (!window.confirm("Do you want to reject this absent request?")) return
    const Url = url + '/notification/absent/reject';

    const othepram = {
      headers: {
        "content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        reject: notification
      }),
      method: "POST"
    };
    fetch(Url, othepram)
      .then(data => { return data.json() })
      .then(res => {
        this.setState({ loading: true, haveNotification: true })
        this.checkToken();
      })
      .catch(error => console.log(error))
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

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  navbarOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  openNotification = () => {
    this.setState({
      notificationOpen: !this.state.notificationOpen
    })
  }

  Logout = () => {
    localStorage.removeItem('tk');
    localStorage.removeItem('sc');
    this.setState({ name: [] });
    window.location.href = "/";
  }

  editProifile = () => {
    window.location.href = "/EditProfile"
  }

  openSchedule = () => {
    var token = localStorage.getItem('tk');
    if (token != null && token != "undefined") {
      var decoded = jwt_decode(token);
      if (decoded.position != "Manager" || decoded.position == "Admin") {
        window.location.href = "/User";
      } else {
        window.location.href = "/Schedule";
      }
    }
  }

  homePage = () => {
    window.location.href = "/";
  }

  render() {

    const { name, managerNoti, loading, userNotification, haveNotification, userhaveNoti, managerNotificationAbsent, haveAbsentNoti } = this.state
    let showname;
    let notification;
    if (!loading) {
      showname = this.state.name.map((event, key) => {
        return <NavItem className="header-username">
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{ margin: 0, paddingTop: 2.5 }} id="user-dropdown">
            <DropdownToggle
              tag="span"
              onClick={this.toggle}
              data-toggle="dropdown"
              aria-expanded={this.state.dropdownOpen}
              modifiers={{
                setMaxHeight: {
                  enabled: true,
                  order: 890,
                  fn: (data) => {
                    return {
                      ...data,
                      styles: {
                        ...data.styles,
                        overflow: 'auto',
                        maxHeight: 100,
                      },
                    };
                  },
                },
              }}>
              <div style={{ display: 'flex' }} >
                {event.name}
                <img src={select} className="select" style={{ width: 15, height: 15 }}></img>
              </div>
            </DropdownToggle>
            <DropdownMenu id="user-dropdown-select">
              <div onClick={this.openSchedule} className="user-item">
                <img src={schedule1} className="select2"></img>
                Schedule
            </div>
              <hr className="hr"></hr>
              <div onClick={this.editProifile} className="user-item">
                <img src={edit} className="select2"></img>
                Edit profile
            </div>
              <hr className="hr"></hr>
              <div onClick={this.Logout} className="user-item">
                <img src={signout} className="select2" ></img>
                Sign out
            </div>
            </DropdownMenu>
          </Dropdown>

        </NavItem>
      })

      notification = <div>

        {!userhaveNoti && userNotification.length !== 0 ? <div className="count-notification2">
          {userNotification.length >= 100 ? '99+' : userNotification.length}
        </div> : null}

        {!haveNotification || !haveAbsentNoti && managerNoti.length !== 0 && managerNotificationAbsent.length !== 0 ?
          <div className="count-notification">
            {managerNoti.length + managerNotificationAbsent.length}
          </div> : null}

        <Dropdown isOpen={this.state.notificationOpen} toggle={this.openNotification} className="notification" direction="left" >
          <DropdownToggle
            tag="span"
            onClick={this.openNotification}
            data-toggle="dropdown"
            aria-expanded={this.state.notificationOpen}
            modifiers={{
              setMaxHeight: {
                enabled: true,
                order: 890,
                fn: (data) => {
                  return {
                    ...data,
                    styles: {
                      ...data.styles,
                      overflow: 'auto',
                      maxHeight: 100,
                    },
                  };
                },
              },
            }}>
            <img src={Notification} width="25" height="25" ></img>
          </DropdownToggle>
          <DropdownMenu tag="div" className="noti-box">
            {managerNoti.length == 0 && managerNotificationAbsent.length == 0 ? <span className="empty-noti">This notification box is empty</span> : null}
            {!haveNotification && <React.Fragment>
              <div className="noti-description">
                {managerNoti.map((notification) => {
                  return <div style={{ textAlign: 'center' }}>
                    <span>{notification[0].name} {notification[0].surname} request to change from {notification[0].Date} {notification[0].Period_Time_One}-{notification[0].Period_Time_Two} with {notification[1].name} {notification[1].surname} {notification[1].Date} {notification[1].Period_Time_One}-{notification[1].Period_Time_Two} </span>
                    <div style={{ display: 'flex', marginTop: 5, justifyContent: 'center', textAlign: 'center', marginBottom: 10 }}>
                      <button className="approve" onClick={() => this.clickApproveExchangeNotification(notification)}>Approve</button>
                      <button className="reject" onClick={() => this.clickRejectExchangeNotification(notification)}>Reject</button>
                    </div>
                    <hr style={{ margin: 0, width: 285, marginBottom: 5 }}></hr>
                  </div>
                })}
              </div>
            </React.Fragment>
            }
            {!haveAbsentNoti && <React.Fragment>
              <div className="noti-description">
                {managerNotificationAbsent.map((notification) => {
                  return <div style={{ textAlign: 'center' }}>
                    <span>{notification.name} {notification.surname} request to Absent {notification.Date} {notification.Period_Time_One}-{notification.Period_Time_Two} </span>
                    <div style={{ display: 'flex', marginTop: 5, justifyContent: 'center', textAlign: 'center', marginBottom: 10 }}>
                      <button className="approve" onClick={() => this.clickApproveAbsentNotification(notification)}>Approve</button>
                      <button className="reject" onClick={() => this.clickRejectAbsentNotification(notification)}>Reject</button>
                    </div>
                    <hr style={{ margin: 0, width: 285, marginBottom: 5 }}></hr>
                  </div>
                })}
              </div>
            </React.Fragment>}
            {!userhaveNoti && <React.Fragment>
              {userNotification.map((noti) => {
                return <div className="user-notification">
                  <span>Your {noti.Notification_Description} <br></br> Date {noti.Date}/{noti.Month + '/2019'} : {noti.Period_Time_One}-{noti.Period_Time_Two} </span>
                  <div style={{ display: 'flex', marginTop: 5, justifyContent: 'center', textAlign: 'center', marginBottom: 10 }}>
                  </div>
                  <hr style={{ margin: 0, width: 285, marginBottom: 5 }}></hr>
                </div>
              })}
            </React.Fragment>}
          </DropdownMenu>
        </Dropdown>
      </div>
    }

    return (
      <div >
        {
          !loading && (<React.Fragment>
            <Navbar color="light" light expand="sm" style={{ height: 'auto' }} className="top-header" >
              <div className="JS" onClick={this.homePage}><b>JS</b></div>
              <div className="Plus" ><b>+</b></div>
              <NavbarToggler onClick={this.navbarOpen} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar >
                  <div id="first-header">
                    <NavItem>
                      <NavLink href=""  ><b className="firstheader-item">HOW TO USE</b></NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="" ><b className="firstheader-item">ABOUT</b></NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="" ><b className="firstheader-item">CONTRACT US</b></NavLink>
                    </NavItem>
                  </div>
                  {name.length > 0 ?
                    <div className="third-header">
                      <NavItem>
                        {/* <NavLink id="second-header"><img src="https://i.ibb.co/FHGFrmD/001-notifications-button-1.png" width="25" height="25" ></img></NavLink> */}
                        {notification}
                      </NavItem>
                      {showname}
                    </div>
                    :
                    <div className="third-header">
                      <NavItem>
                        <NavLink id="second-header" onClick={this.showLogin} style={{ marginTop: 7 }}><span>Sign In</span></NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink id="second-header2" onClick={this.showRegister}><span>Sign Up</span></NavLink>
                      </NavItem>
                    </div>}
                </Nav>
              </Collapse>
            </Navbar>
            <Login show={this.state.showLogin} onClose={this.showLogin} showRegis={this.showRegister}></Login>
            <Register show={this.state.showregis} onClose={this.showRegister} showLogin={this.showLogin}></Register>
          </React.Fragment>
          )
        }
      </div>
    );
  }
}

export default Header;
