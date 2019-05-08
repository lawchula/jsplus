import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import './Schedule.css';
import { Button, Table, Dropdown } from 'reactstrap';
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
import Filter from './Filter';
import Timepicker from './Timepicker';
import { array } from 'prop-types';
// import {ClickPeriod} from './Timepicker';
// console.log(ClickPeriod);



class Schedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: [],
            day: [],
            department: [],
            company: [],
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            countday: new Date().getDay(),
            show: false,
            block: [],
            showDropdown: -1,
            ShowPeriodAfterUserClick: [],
            dropdownshouldclose: false,
            TestShow: [],
            dayTest: []
        }
    }
    componentDidMount() {
        this.getDaysInMonth(this.state.month, this.state.year)
        this.setBlock(this.state.month, this.state.year)
        //this.test(this.state.block.length)
        fetch('http://localhost:8080/users')
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.setState({ user: myJson })
            });

        fetch('http://localhost:8080/company')
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.setState({ company: myJson })
            });

        fetch('http://localhost:8080/department')
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.setState({ department: myJson })
            });
    }

    // SelectDataFromDB = () => {
    //     fetch('http://localhost:8080/users')
    //         .then((response) => {
    //             return response.json();
    //         })
    //         .then((myJson) => {
    //             this.setState({ user: myJson })
    //         });

    //     fetch('http://localhost:8080/company')
    //         .then((response) => {
    //             return response.json();
    //         })
    //         .then((myJson) => {
    //             this.setState({ company: myJson })
    //         });

    //     fetch('http://localhost:8080/department')
    //         .then((response) => {
    //             return response.json();
    //         })
    //         .then((myJson) => {
    //             this.setState({ department: myJson })
    //         });

    // }

    getDaysInMonth = (month, year) => {
        var date = new Date(year, month, 1);
        var days = [];

        while (date.getMonth() === month) {
            days.push(new Date(date).toLocaleDateString("en-GB"));
            date.setDate(date.getDate() + 1);
        }
        this.setState({ day: days })
    }

    setBlock = (month, year) => {
        var count = new Date(year, month + 1, 0).getDate();
        var a = []
        for (var i = 1; i <= count; i++) {
            a.push(i)
        }
        this.setState({ block: a })
    }

    showPopup = () => {
        this.setState({
            show: !this.state.show
        });
    }

    SendMultidimension(x, y) {
        this.setState({ showDropdown: [x, y], dropdownshouldclose: false })
    }

    dropdownTest = () => {
        this.props.dropdownTest()
    }

    AddPeriod = async (PeriodUserClick, x, y) => {

        this.setState({ dropdownshouldclose: true })
        const show = { ...this.state.TestShow }
        // const show = {}
        const oldShow = show[`${x},${y}`]
        if (Array.isArray(oldShow)) {
            if (oldShow.findIndex(show => {
                return show.Period_Name == PeriodUserClick.Period_Name
            }) === -1)
                show[`${x},${y}`] = [...oldShow, PeriodUserClick]
        } else {

            show[`${x},${y}`] = [PeriodUserClick]
        }

        this.setState({ TestShow: show })

    }


    render() {
        return (
            <div className="Schedule">
                <Header />
                <Container className="Schedule" fluid>
                    <Row>
                        <Col md={12}>
                            <p className="stat"><b><i>STATISTIC</i></b></p>
                        </Col>
                        <Col md={8}>
                            <Button color="btn btn-light" className="test" onClick={this.showPopup} style={{ color: '#E37222' }}><b>FILTER</b></Button>{' '}
                            <Button color="btn btn-light" className="gbutton" style={{ color: '#E37222' }}><b>GENERATE</b></Button>{' '}
                            <Filter show={this.state.show} onClose={this.showPopup}>
                            </Filter>
                        </Col>
                        <Button color="btn btn-light" className="p1" style={{ color: '#E37222' }} ><b>WORK HOUR:</b></Button>
                        <Button color="btn btn-light" className="p2" style={{ color: '#E37222' }} ><b>DONE:</b></Button>
                        <Button color="btn btn-light" className="p3" style={{ color: '#E37222' }}><b>REMAIN:</b></Button>
                    </Row>

                    <Table bordered responsive className="tests">
                        <thead>
                            <tr style={{ 'backgroundColor': '#07889B', 'color': 'white' }}>
                                <th colSpan="32">Companyname : {this.state.company.map(event => { return <h20>{event.Company_Name}</h20> })}</th>
                            </tr>
                            <tr style={{ 'backgroundColor': '#E37222', 'color': 'white' }}>
                                <th colSpan="32">Department : {this.state.department.map(event => { return <h20>{event.Department_Name}</h20> })}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>NAME</th>
                                {this.state.day.map(event => { return <th>{event}</th> })}
                            </tr>
                            {this.state.user.map((event, x) => {
                                return <tr className="test2" style={{ backgroundColor: ' #E37222' }}>{event.Name}


                                    {this.state.block.map((e, y) => {
                                        return <td style={{ backgroundColor: 'white' }}
                                            onClick={() => this.SendMultidimension(x, y)}>
                                            {this.state.showDropdown[0] === x && this.state.showDropdown[1] === y && !this.state.dropdownshouldclose &&
                                                <Timepicker AddPeriod={(PeriodUserClick) => this.AddPeriod(PeriodUserClick, x, y)} />}
                                            {Array.isArray(this.state.TestShow[`${x},${y}`])
                                                &&
                                                this.state.TestShow[`${x},${y}`].map(show => <div style={{ backgroundColor: 'red' }}>{show.Period_Time_One + "-" + show.Period_Time_Two}</div>)
                                            }
                                        </td>
                                    })} </tr>



                            })}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default Schedule;






// var user = {
//     test1love:[{30:"Morning"},{21:"Night"}]

// }