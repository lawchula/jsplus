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
            Visible: false
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

    onClose = (e) => {
        if (this.props.onClose != undefined) {
            this.props.onClose(e)
        }
    }

    ClickPeriod(event,i) {
        console.log("Print :" + event)
        this.setState({I: i})
        // console.log("I : "+this.state.i)
        // this.state.ShowPeriodOnSchedule([1])

        this.setState({ShowPeriodOnSchedule: event},()=>{
            console.log(this.state.ShowPeriodOnSchedule)
            // console.log("I : "+this.state.i)
            this.props.AddPeriod(this.state.ShowPeriodOnSchedule)
        })
        // console.log(this.state.ShowPeriodOnSchedule)
    }

    Test = () =>{
        this.setState({Visible: false})
    }

    render() {
        return (
            <div style={{zIndex:-1}}>
                <img src={error} className='test' onClick = {this.Test}></img>
                <div className='dropdown'>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} direction='down' style={{marginTop:-10}}>
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
                </div>
                {/* {console.log(this.state.showperiod)}  */}
            </div>
        )
    }
}

export default Timepicker;
// export function ClickPeriod(event);
    // showSlides(slideIndex += n);
    // export function ClickPeriod(event){
    //     // ClickPeriod(event);
    //     console.log(event)
    // }