import React, { Component } from 'react';
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
    DropdownItem,
    Dropdown
} from 'reactstrap';

class Timepicker extends Component {

    constructor(props) {
        super(props)
        this.dropdownTest = this.dropdownTest.bind(this)
        this.state = {
            dropdownOpen: false,
            showperiod: []
        }
        this.toggle = this.toggle.bind(this)
    }

    componentDidMount() {
        fetch('http://localhost:8080/showperiod')
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                console.log(myJson)
                this.setState({ showperiod: myJson })
                console.log("Users", this.state.showperiod)
            });
    }

    toggle = () => {
        const {dropdownOpen} = this.state
        this.setState({ dropdownOpen: !dropdownOpen })
    }

    dropdownTest() {
        console.log("test")
        const{showperiod} = this.state
        console.log(showperiod)
    }


    render() {
        return (
            <div>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} direction='down'>
                    <DropdownToggle caret>
                        Dropdown
        </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>Header</DropdownItem>
                       {this.state.showperiod.map((e) => {return <DropdownItem onClick={this.dropdownTest}>{e.Period_Name + e.Period_Time_One + e.Period_Time_Two}</DropdownItem>})}
                        {/* <DropdownItem>Some Action</DropdownItem>
                        <DropdownItem disabled>Action (disabled)</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Foo Action</DropdownItem>
                        <DropdownItem>Bar Action</DropdownItem>
                        <DropdownItem>Quo Action</DropdownItem> */}
                    </DropdownMenu>
                </Dropdown>
       {console.log(this.state.showperiod)} 

            </div>
        )
    }
}

export default Timepicker ;