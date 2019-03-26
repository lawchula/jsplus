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
            <div className="">    
                    <Navbar color="light" light expand="md" className="header">
                        <NavbarBrand className="" href="">JS+</NavbarBrand>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="" >How to use</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="" color="">About</NavLink>
                            </NavItem>
                            <NavItem>
                            <NavLink href="">Contact</NavLink>
                            </NavItem>
                            <NavItem>
                            <Button color="warning">User</Button>{' '}
                            </NavItem>
                        </Nav>
                    </Navbar>
            </div>
        );
    }
}

export default Header;
