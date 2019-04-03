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
import Filter from './Filter';


class Schedule extends Component {
    constructor(props){
        super(props)
        this.state = {
            user : ["fifa","chin","toey"],
            day : [],
            year : new Date().getFullYear(),
            month : new Date().getMonth(),
            countday : new Date().getDay(),
            show : false
        }
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

   showPopup = () =>{
       this.setState({
        show: !this.state.show
       });
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
                            <Button color="btn btn-light" className="test" onClick={this.showPopup}>Filter</Button>{' '}
                            <Button color="btn btn-light" className="gbutton">Genarate</Button>{' '}
                            <Filter show={this.state.show} onClose={this.showPopup}>

                            </Filter>
                        </Col>
                        <p className="p">Work Hour:</p>
                        <p className="p">Done: </p>
                        <p className="p">Remain: </p>
                    </Row>

                    <Table bordered responsive className="tests">
                        <thead>
                            <tr>
                                <th colSpan="32">Companyname</th>
                            </tr>
                            <tr>
                                <th colSpan="32">Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                {this.state.day.map(event => {return <th>{event}</th>})}
                            </tr>
                        </tbody>
                    </Table>    
                </Container>
            </div>
        );
    }
}

export default Schedule;


