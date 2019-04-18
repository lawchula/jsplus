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
            user : [],
            day : [],
            department : [],
            company : [],
            year : new Date().getFullYear(),
            month : new Date().getMonth(),
            countday : new Date().getDay(),
            show : false,
            countd : 0,
            block : []
            
        }
    }
    componentDidMount(){
        
        this.getDaysInMonth(this.state.month,this.state.year)
        this.setBlock(this.state.month,this.state.year)
        //console.log(this.state.month)
        //console.log(this.state.year)
        //console.log(this.test(this.state.month,this.state.year)

        this.getDaysInMonth(this.state.month,this.state.year)
        fetch('http://localhost:8080/users')
        .then( (response) =>  {
            return response.json();
        })
        .then((myJson) => {
            console.log(myJson)
            this.setState({user: myJson})
            console.log("Users",this.state.user)
        });
        fetch('http://localhost:8080/company')
        .then( (response) =>  {
            return response.json();
        })
        .then((myJson) => {
            console.log(myJson)
            this.setState({company: myJson})
            console.log("company",this.state.company)
        });

        fetch('http://localhost:8080/department')
        .then( (response) =>  {
            return response.json();
        })
        .then((myJson) => {
            console.log(myJson)
            this.setState({department: myJson})
            console.log("department",this.state.department)
        });
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

   setBlock = (month,year) => {
      var count = new Date(year,month+1,0).getDate();
      var a =[]
      for(var i=1; i <= count; i++){
         a.push(i)
      }
      this.setState({block: a}) 
   }

   showPopup = () =>{
       this.setState({
        show: !this.state.show
       });
   }

    render() {
        // console.log(this.state.countd)
        return (
            <div className="Schedule">
                <Header />
                <Container className="Schedule" fluid>
                    <Row>
                        <Col md={12}>
                            <p className="stat"><b><i>STATISTIC</i></b></p>
                        </Col>
                        <Col md={8}>
                            <Button color="btn btn-light" className="test" onClick={this.showPopup} style={{color:'#E37222'}}><b>FILTER</b></Button>{' '}
                            <Button color="btn btn-light" className="gbutton" style={{color:'#E37222'}}><b>GENERATE</b></Button>{' '}
                            <Filter show={this.state.show} onClose={this.showPopup}>
                            </Filter>
                        </Col>
                        <Button color="btn btn-light" className="p1" style={{color:'#E37222'}} ><b>WORK HOUR:</b></Button>
                        <Button color="btn btn-light" className="p2" style={{color:'#E37222'}} ><b>DONE:</b></Button>
                        <Button  color="btn btn-light" className="p3" style={{color:'#E37222'}}><b>REMAIN:</b></Button>
                    </Row>

                    <Table bordered responsive className="tests">
                        <thead>
                            <tr style={{'backgroundColor':'#07889B','color':'white'}}>
                                <th colSpan="32">Companyname : {this.state.company.map(event => {return <h20>{event.Company_Name}</h20>})}</th>
                            </tr>
                            <tr style={{'backgroundColor':'#E37222','color':'white'}}>
                                <th colSpan="32">Department : {this.state.department.map(event => {return <h20>{event.Department_Name}</h20>})}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>NAME</th>
                                {this.state.day.map(event => {return <th>{event}</th>})}
                            </tr> 
                            {this.state.user.map(event => {return <tr className="test2" style={{backgroundColor:' #E37222'}}>{event.Name} {this.state.block.map((e,i) => {return <td style={{backgroundColor:'white'}}></td>})} </tr>})}
                        </tbody>
                    </Table>    
                </Container>
                {/* {console.log(this.test(this.state.month,this.state.year))} */}
            </div>
        );
    }
}

export default Schedule;


