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
import { DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from 'reactstrap';
import edit from './Images/edit.png';
import signout from './Images/signout.png';
import select from './Images/select.png';
import schedule1 from './Images/schedule1.png';
import Notification from './Images/notification.png';


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
      notificationOpen: false,
      notification1: null,
      notificationAbsent: []
    };
  }

  componentDidMount() {
    this.checkToken();
  }

  checkToken = async () => {
    let token = localStorage.getItem('sc');
    let detailtk = localStorage.getItem('tk');

    if (token != null && token != "undefined") {
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
        fetch('http://localhost:8080/name', othepram)
          .then((response) => {
            return response.json();
          }),
        fetch('http://localhost:8080/notification', otheprams)
          .then((response) => {
            return response.json();
          })
      ])
      fetch('http://localhost:8080/notification/absent', otheprams)
        .then(res => res.json().then(json => {
          console.log(json)
          this.setState({notificationAbsent: json})
        }))

      const [name, notification1] = data;
      this.setState({ name, notification1 })
      let userRequest = [];
      let userReq = [];
      this.state.notification1.map(notification => {
        userRequest.push(notification)
        if (userRequest[0].name != notification.name && userRequest[0].Request_ID == notification.Request_ID) {
          userReq.push([userRequest[0], notification]);
          userRequest = []
        }
      })
      this.setState({ notification1: userReq, loading: false, haveNotification: false })
    } else {
      this.setState({ loading: false })
    }
  }

  clickApproveExchangeNotification = (notification) => {
    const Url = 'http://localhost:8080/notification/approve';

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
    const Url = 'http://localhost:8080/notification/reject';

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
    const Url = 'http://localhost:8080/notification/absent/approve';

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
    const Url = 'http://localhost:8080/notification/absent/reject';

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
    window.location.href = "http://localhost:3000/";
  }

  render() {

    const { name, notification1, loading, haveNotification, notificationAbsent } = this.state
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
              <div onClick={this.toggle} className="user-item">
                <img src={schedule1} className="select2"></img>
                Schedule
            </div>
              <hr className="hr"></hr>
              <div onClick={this.toggle} className="user-item">
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
        <div className="count-notification">
          1
    </div>
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

            {!haveNotification && <React.Fragment>
              <div className="noti-description">
                {notification1.map((notification, x) => {
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
              <div className="noti-description">
                {notificationAbsent.map((notification, x) => {
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
            </React.Fragment>
            }
          </DropdownMenu>
        </Dropdown>
      </div>
    }

    return (
      <div >
        {
          !loading && (<React.Fragment>
            <Navbar color="light" light expand="sm" style={{ height: 'auto' }} className="top-header" >
              <div className="JS" ><b>JS</b></div>
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
