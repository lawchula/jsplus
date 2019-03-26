import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import './Schedule.css';
import { Button, Table } from 'reactstrap';
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



class Schedule extends Component {
    constructor(props){
        super(props)
        this.state = {
            test : "test",
            day : [],
            year : new Date().getFullYear(),
            month : new Date().getMonth()
        }
    }
    test = () => {
        var day = new Date();
        day = day.getDate();
        return day;
    }

    componentDidMount(){
        this.getDaysInMonth(this.state.month,this.state.year)
    }

         getDaysInMonth = (month, year) => {
            var date = new Date(year, month, 1);
            var days = [];
            
            while (date.getMonth() === month) {
                
               days.push(new Date(date).toLocaleDateString("en-GB"));
               date.setDate(date.getDate() + 1);
            }
         this.setState({day: days})

   }
       

    render() {
        return (
            <div className="Schedule">
                <Header />
                <Container className="Schedule" fluid>

                    <Row>
                        <Col md={12}>
                            <p className="stat">statistic</p>
                        </Col>
                        <Col md={8}>
                            <Button color="btn btn-light" className="test">Filter</Button>{' '}
                            <Button color="btn btn-light" className="gbutton">Genarate</Button>{' '}
                        </Col>
                        <p className="p">Work Hour:</p>
                        <p className="p">Done: </p>
                        <p className="p">Remain: </p>
                    </Row>

                    <Table bordered responsive className="tests">
                        <thead>
                            <tr>
                                <th colSpan="30">Companyname</th>
                            </tr>
                            <tr>
                                <th colSpan="30">Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                {this.state.day.map(event => {return <th>{event}</th>})}
                            </tr>
                            <tr>
                            </tr>
                        </tbody>
                    </Table>          
                   
                </Container>
            </div>
        );
    }
}

export default Schedule;
