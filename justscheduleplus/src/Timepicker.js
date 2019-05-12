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
import error from './Images/error.png';
import './Timepicker.css';
import Schedule from './Schedule';

class Timepicker extends Component {

    constructor(props) {
        super(props)
        this.dropdownTest = this.dropdownTest.bind(this)
        // this.ClickPeriod = this.ClickPeriod.bind(this)
        this.state = {
            dropdownOpen: false,
            showperiod: [],
            ShowPeriodOnSchedule: [],
            Testadd: {},
            i: 0,
            open: true,
            closepicture: true,
        }
        this.toggle = this.toggle.bind(this)
    }

    componentDidMount() {
        fetch('http://localhost:8080/showperiod')
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.setState({ showperiod: myJson })
            });
    }

    toggle = () => {
        const { dropdownOpen } = this.state
        this.setState({ dropdownOpen: !dropdownOpen })
    }

    dropdownTest() {
        const { showperiod } = this.state
    }

    ClickPeriod(event,i) {
        // console.log("Print :" + event)
        this.setState({I: i})
        // console.log("I : "+this.state.i)
        // this.state.ShowPeriodOnSchedule([1])

        this.setState({ShowPeriodOnSchedule: event},()=>{
            // console.log(this.state.ShowPeriodOnSchedule)
            // console.log("I : "+this.state.i)
            this.props.AddPeriod(this.state.ShowPeriodOnSchedule)
        })
        // console.log(this.state.ShowPeriodOnSchedule)
    }

     CloseDropdown = ()  =>{
        this.setState({open: false})
        this.setState({closepicture: false})
    }

    render() {
        return (
            <div style={{zIndex:-1}}>
                <div className='dropdown'>
                {this.state.closepicture && (
                <img src={error} className='error' onClick={this.CloseDropdown}></img>
                )}
                {this.state.open && (
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} direction='down' style={{marginTop:-13,marginLeft:-12.5}} size="sm">
                    <DropdownToggle caret>
                    </DropdownToggle>
                    <DropdownMenu>
                        {/* <DropdownItem header>Header</DropdownItem> */}
                        {this.state.showperiod.map((event,i) => { return <DropdownItem onClick={() => this.ClickPeriod(event)}>{event.Period_Name + event.Period_Time_One + event.Period_Time_Two} </DropdownItem> })}
                        {/* <DropdownItem>Some Action</DropdownItem>
                        <DropdownItem disabled>Action (disabled)</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Foo Action</DropdownItem>
                        <DropdownItem>Bar Action</DropdownItem>
                        <DropdownItem>Quo Action</DropdownItem> */}
                    </DropdownMenu>
                </Dropdown>
                )}
                </div>
            </div>
        )
    }
}

export default Timepicker;