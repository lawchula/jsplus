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


class Header extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      name: [],
      dropdownOpen: false,
    };
  }
  
  componentDidMount() {
    var token = localStorage.getItem('tk');
    if (token != null || token != "undefined") {
      const othepram = {
        headers: {
          tkAuth: token
        },
        method: "GET"
      };
      fetch('http://localhost:8080/name', othepram)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        this.setState({ name: myJson })
      });
    }
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
        dropdownOpen: !this.state.dropdownOpen
      });
    }
  
  Logout = () => {
    localStorage.removeItem('tk');
    window.location.href = "http://localhost:3000/";
  }
  
  render() {

    const { name } = this.state
    const showname = this.state.name.map((event, key) => {
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
              <img src={select} className="select"></img>
            </div>
          </DropdownToggle>
          <DropdownMenu id="user-dropdown">
            <div onClick={this.toggle}>
              <img src={edit} className="select2"></img>
              Edit profile
            </div>
            <hr className="hr"></hr>
            <div onClick={this.Logout}>
              <img src={signout} className="select2"></img>
              Sign out
            </div>
          </DropdownMenu>
        </Dropdown>
      </NavItem>
    })

    return (
      <div >
        <Navbar color="light" light expand="sm" style={{ height: 'auto' }} >
          <div className="JS" ><b>JS</b></div>
          <div className="Plus" ><b>+</b></div>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar >
              <div id="first-header">
                <NavItem>
                  <NavLink href="" style={{ color: '#07889B', fontSize: 15, marginTop: '4%' }} ><b>HOW TO USE</b></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="" style={{ color: '#07889B', fontSize: 15, marginTop: '7%' }}><b>ABOUT</b></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="" style={{ color: '#07889B', fontSize: 15, marginTop: '4%' }}><b>CONTRACT US</b></NavLink>
                </NavItem>
              </div>
              {name.length > 0 ?
                <div className="third-header">
                  <NavItem>
                    <NavLink id="second-header"><img src="https://i.ibb.co/FHGFrmD/001-notifications-button-1.png" width="25" height="25" ></img></NavLink>
                  </NavItem>
                  {showname}
                </div>
                :
                <div className="third-header">
                  <NavItem>
                    <NavLink id="second-header" onClick={this.showLogin} style={{ marginTop: 7 }}><span>Sign In</span></NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink id="second-header" onClick={this.showRegister} style={{ border: '1px solid #66b9bf', borderRadius: 5 }}><span>Sign Up</span></NavLink>
                  </NavItem>
                </div>}
            </Nav>
          </Collapse>
        </Navbar>
        <Login show={this.state.showLogin} onClose={this.showLogin} showRegis={this.showRegister}></Login>
        <Register show={this.state.showregis} onClose={this.showRegister} showLogin={this.showLogin}></Register>
      </div>
    );
  }
}

export default Header;
