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
import error from './Images/error.png';
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
            dayTest: [],
            TestColor: [],
            edit: false,
            disable: false
            
        }
    }
    componentDidMount() {
        this.getDaysInMonth(this.state.month, this.state.year)
        this.setBlock(this.state.month, this.state.year)
        this.SelectDataFromDB()
    }

    SelectDataFromDB = () => {
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


    getDaysInMonth = (month, year) => {
        var date = new Date(year, month,1);
        var days = [];
        var numofday = [];
        var TestColorAgain = [];
        var TestShowday = [];

        while (date.getMonth() === month) {
            TestShowday = new Date(date).toDateString().substr("0","3");
            days.push(new Date(date).toDateString().substr("7","4")+TestShowday);
            date.setDate(date.getDate() +1);
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
        if(this.state.edit === false){
        this.setState({ showDropdown: [x, y], dropdownshouldclose: false })
        }else{
            this.setState({dropdownshouldclose: true})
        }
    }

    dropdownTest = () => {
        this.props.dropdownTest()
    }

    ShowDayColorOnSchedule = (event) => {
        var dayStr = event.substr(event.length - 3)
        switch (dayStr) {
            case 'Sat':
                return "#9933FF"
                // break;
            case 'Sun':
                return "#FF0000"
            case 'Mon':
                return "yellow"
            case 'Tue':
                return "pink"
            case 'Wed':
                return "#00CC00"
            case 'Thu':
                return "orange"
            case 'Fri':
                return "#99FFFF"
                // break;
        }
    }
    showPeriodColorOnScedule = (show,i,x,y) =>{
        console.log(show)
        if(i === 0){
            return "red"
        }else if(i === 1){
            return "yellow"
        }else{
            return "green"
        }        

    }
    showButtonAfterEdit = () => {
        const{edit} = this.state
        this.setState({edit: !edit,disable: true})
    }

    finishEdit = () => {
        const {edit} = this.state
        this.setState({edit: !edit,disable: false})
    }

    AddPeriod = async (PeriodUserClick, x, y) => {

        this.setState({ dropdownshouldclose: true })
        const show = { ...this.state.TestShow }
        var countarray = 0;

        const oldShow = show[`${x},${y}`]
        if (Array.isArray(oldShow)) {
            if (oldShow.findIndex(show => {
                return show.Period_Name == PeriodUserClick.Period_Name
            }) === -1)
                show[`${x},${y}`] = [...oldShow, PeriodUserClick]
        } else {
            show[`${x},${y}`] = [PeriodUserClick]
        }

        if(show[`${x},${y}`] > show[`${x},${y}`][0]){
            if(show[`${x},${y}`][1].Period_Time_One < show[`${x},${y}`][0].Period_Time_One){
            var a = show[`${x},${y}`][1]
            show[`${x},${y}`][1] = show[`${x},${y}`][0]
            show[`${x},${y}`][0] = a
            this.setState({TestShow: show})
            }else{
                console.log(show)
            }
        }else{
            console.log("")
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
                            <Button color="btn btn-light" className="gbutton" onClick={this.showPopup} style={{ color: '#E37222' }}><b>FILTER</b></Button>{' '}
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
                                <th colSpan="31">Companyname : {this.state.company.map(event => { return <h20>{event.Company_Name}</h20> })}</th>
                                <td colSpan="2" style={{marginLeft:10}}><button onClick={this.showButtonAfterEdit} disabled={this.state.disable}>Edit</button></td>
                            </tr>
                            <tr style={{ 'backgroundColor': '#E37222', 'color': 'white' }}>
                                <th colSpan="33">Department : {this.state.department.map(event => { return <h20>{event.Department_Name}</h20> })}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className="name" colSpan="2">NAME</th>
                                {this.state.day.map((event,i) => { return <th style={{backgroundColor: this.ShowDayColorOnSchedule(event)}} className="day">{event} </th> })}
                            </tr>
                            {this.state.user.map((event, x) => {
                                return <tr className="test2" style={{ backgroundColor: ' #E37222',fontSize:13 }}> <td colSpan="2">{event.Name}</td>
                                    {this.state.block.map((e, y) => {
                                        return <td style={{ backgroundColor: 'white'}}
                                            onClick={() => this.SendMultidimension(x, y)}>
                                          {this.state.edit ===  false  ? 
                                          this.state.showDropdown[0] === x && 
                                          this.state.showDropdown[1] === y && 
                                          !this.state.dropdownshouldclose &&
                                                <Timepicker AddPeriod={(PeriodUserClick) => this.AddPeriod(PeriodUserClick, x, y) } /> : false }
                                            {Array.isArray(this.state.TestShow[`${x},${y}`])
                                                &&
                                                this.state.TestShow[`${x},${y}`].map((show,i)=> 
                                                <div style={{marginBottom:-15,marginTop:-8,marginRight:-10}}>
                                                <div style={{ width:35,backgroundColor: this.showPeriodColorOnScedule(show,i) ,fontSize:9,borderRadius:5,paddingLeft:2,marginLeft:-10,marginRight:0,marginTop:3,marginBottom:0}}>{show.Period_Time_One + "-" + show.Period_Time_Two}</div>
                                            {this.state.edit ? 
                                            <div>
                                                <img src={error} style={{ width: 10, height: 10,marginTop:-73,marginLeft:18}}>
                                                </img>
                                            </div>
                                            : <div style={{ width: 10, height: 10,marginTop:8,marginLeft:18}}></div> }</div> )}
                                        </td>
                                    })} </tr>
                            })}
                        </tbody>
                    </Table>
                    {this.state.edit && <button onClick={this.finishEdit}>OK</button>}
                            
                </Container>
            </div>
            
        );
    }
}

export default Schedule;






// var user = {
//     test1love:[{30:"Morning"},{21:"Night"}]

// }