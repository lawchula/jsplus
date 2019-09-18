import React, { Component } from 'react';
import './Css/App.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import './Css/Header.css';

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
            <Navbar color="light" light expand="sm" style={{height:'auto'}} >
              <div className="JS" ><b>JS</b></div>
              <div className="Plus" ><b>+</b></div>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar >
                <div id="first-header">
                  <NavItem>
                    <NavLink  href="" style={{color:'#07889B' ,fontSize:15,marginTop:'4%'}} ><b>HOW TO USE</b></NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href=""  style={{color:'#07889B' ,fontSize:15,marginTop:'7%'}}><b>ABOUT</b></NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href=""  style={{color:'#07889B' ,fontSize:15,marginTop:'4%'}}><b>CONTRACT US</b></NavLink>
                  </NavItem>
                  </div>
                  <NavItem>
                    {/* <NavLink href=""><img src="https://i.ibb.co/FHGFrmD/001-notifications-button-1.png" width="25" height="25" style={{marginTop:'25%'}}></img></NavLink> */}
                  </NavItem>
                  <NavItem>  
                    <NavLink href="" id="second-header" style={{marginTop:7}}><span>Sign In</span></NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="" id="second-header" style={{border:'1px solid #66b9bf',borderRadius:5}}><span>Sign Up</span></NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        );
    }
}

export default Header;
