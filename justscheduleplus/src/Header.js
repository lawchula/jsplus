import React, { Component } from 'react';
import './App.css';
import { Button } from 'reactstrap';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Container, Row, Col } from 'react-grid-system';
import './Header.css';

class Header extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
            <Navbar color="light" light expand="md" >
              <div className="JS" ><b>JS</b></div>
              <div className="Plus" ><b>+</b></div>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink  href="" style={{color:'#07889B' ,fontSize:'15pt',marginTop:'4%'}} ><b>HOW TO USE</b></NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href=""  style={{color:'#07889B' ,fontSize:'15pt',marginTop:'7%'}}><b>ABOUT</b></NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href=""  style={{color:'#07889B' ,fontSize:'15pt',marginTop:'4%'}}><b>CONTRACT US</b></NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href=""><img src="https://i.ibb.co/FHGFrmD/001-notifications-button-1.png" width="30" height="30" style={{marginTop:'8%'}}></img></NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href=""><button className="button1"  ><b>Teetuch</b></button></NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        );
    }
}

export default Header;
