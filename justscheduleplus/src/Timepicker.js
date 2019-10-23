import React, { Component } from 'react';
import { DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from 'reactstrap';
import error from './Images/close.png';
import insert from './Images/insert.png';
import './Css/Timepicker.css';
import url from './url';


class Timepicker extends Component {

    constructor(props) {
        super(props)
        this.dropdownTest = this.dropdownTest.bind(this)
        this.state = {
            dropdownOpen: true,
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
        var token = localStorage.getItem('tk');
        const othepram = {
            headers: {
                tkAuth: token
            },
            method: "GET"
        };
        fetch(url + '/showperiod', othepram)
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

    ClickPeriod(event, i) {
        this.setState({ I: i })

        this.setState({ ShowPeriodOnSchedule: event }, () => {
            this.props.AddPeriod(this.state.ShowPeriodOnSchedule)
        })
    }


    render() {
        return (
            <div>
                {this.state.open ?
                    (
                        <div className='dropdown1'>
                            <div style={{ marginBottom: -15, marginTop: -10, marginRight: -10 }}>
                                <img src={error} className='error' style={{ width: 11, height: 11, }} onClick={() => this.props.CloseDropdown()}></img>
                                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} direction='down' style={{ marginTop: -12, marginLeft: -13 }} size="sm">
                                    <DropdownToggle tag="span">
                                        <img src={insert} style={{ width: 25, height: 25, marginLeft: 5 }}></img>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {/* <DropdownItem header>Header</DropdownItem> */}
                                        {this.state.showperiod.map((event, i) => { return <DropdownItem onClick={() => this.ClickPeriod(event)}>{event.Period_Name + " " + event.Period_Time_One + " - " + event.Period_Time_Two} </DropdownItem> })}
                                    </DropdownMenu>
                                </Dropdown>
                                <div style={{ width: 10, height: 10, marginTop: 8, marginLeft: 18 }}></div>
                            </div>
                        </div>
                    ) : (<div></div>)
                }
            </div>
        )
    }
}
export default Timepicker;