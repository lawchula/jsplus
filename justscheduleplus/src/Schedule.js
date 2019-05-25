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
            selectSchedule: [],
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            countday: new Date().getDay(),
            show: false,
            block: [],
            showDropdown: -1,
            ShowPeriodAfterUserClick: [],
            dropdownshouldclose: false,
            TestShow: [],
            edit: false,
            disable: false,
            addperiodscheduletodb: []
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

        this.getSchedules();

    }

    getSchedules = () => {
        fetch('http://localhost:8080/showschedule')
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.setState({ selectSchedule: myJson })
            });
    }

    getDaysInMonth = (month, year) => {
        var date = new Date(year, month, 1);
        var days = [];
        var numofday = [];
        var TestColorAgain = [];
        var TestShowday = [];

        while (date.getMonth() === month) {
            TestShowday = new Date(date).toDateString().substr("0", "3");
            days.push(new Date(date).toDateString().substr("7", "4") + TestShowday);
            date.setDate(date.getDate() + 1);
        }
        this.setState({ day: days })

    }

    getNameofMonth = (month) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[month]
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

    SendMultidimension(x, y, User_ID) {
        if (this.state.edit === false) {
            if (this.state.showDropdown[0] != x || this.state.showDropdown[1] != y) {
                this.setState({ showDropdown: [x, y], dropdownshouldclose: false })
            }
        } else {
            this.setState({ dropdownshouldclose: true })
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
        }
    }

    showButtonAfterEdit = () => {
        const { edit } = this.state
        this.setState({ edit: !edit, disable: true })
    }

    finishEdit = () => {
        const { edit } = this.state
        this.setState({ edit: !edit, disable: false })
    }

    AddPeriod = async (PeriodUserClick, x, y, event, e) => {
        this.CloseDropdown();

        // const schedules = this.state.TestShow;

        const show = { ...this.state.TestShow }
        var countarray = 0;

        const oldShow = show[`${event.User_ID},${e}`]
        if (Array.isArray(oldShow)) {
            if (oldShow.findIndex(show => {
                return show.Period_Name == PeriodUserClick.Period_Name
            }) === -1)
                show[`${event.User_ID},${e}`] = [...oldShow, PeriodUserClick].sort(function (a, b) {
                    let t1 = parseInt(a.Period_Time_One.replace(':', ''));
                    let t2 = parseInt(b.Period_Time_One.replace(':', ''));
                    console.log(t1)
                    return t1 - t2;
                })
        } else {
            show[`${event.User_ID},${e}`] = [PeriodUserClick]
        }
        this.setState({ TestShow: show })
    }

    DeletePeriodInSchedule(show, event, e) {
        const key = `${event.User_ID},${e}`;
        const DeletePeriod = this.state.TestShow[key].filter(value => {
            return value.Period_Name != show.Period_Name
        })
        this.state.TestShow[key] = DeletePeriod;
        if (!this.state.TestShow[key].length) {
            let testShow = this.state.TestShow;
            delete testShow[key];
            this.setState({ TestShow: testShow })
        }
    }

    InsertPeriodtoSchedule = () => {
        const Url = 'http://localhost:8080/schedule';
        console.log(this.state.TestShow)

        const othepram = {
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                addperiodscheduletodb: this.state.TestShow
            }),
            method: "POST"
        };
        fetch(Url, othepram)
            .then(data => { return data.json() })
            .then(res => {
                console.log(res)
                this.setState({ TestShow: [] })
                this.getSchedules();
            })
            .catch(error => console.log(error))
    }

    CloseDropdown = () => {
        this.setState({ showDropdown: -1, dropdownshouldclose: true })
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
                            <tr style={{ 'backgroundColor': '#07889b', 'color': 'white' }}>
                                <th colSpan="16">Company : {this.state.company.map(event => { return <h1>{event.Company_Name}</h1> })}</th>
                                <th colSpan="15">Department : {this.state.department.map(event => { return <h1>{event.Department_Name}</h1> }) } </th>
                                {/* <Button color="btn btn-light" onClick={this.showButtonAfterEdit} disabled={this.state.disable} style={{marginLeft:400,color: '#E37222',fontSize:20}}>Edit</Button> </th> */}
                                <td colSpan="2" style={{marginLeft:10}}><button style={{backgroundColor:"white",color:"#E37222",border:0,borderRadius:5,fontWeight:"bold",marginLeft:7}} onClick={this.showButtonAfterEdit} disabled={this.state.disable}>Edit</button></td>
                            </tr>
                            <tr style={{ 'backgroundColor': '#E37222', 'color': 'white',textAlign:"center" }}>
                                <th colSpan="33">{this.getNameofMonth(this.state.month)+"  "+this.state.year} </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className="name" colSpan="2">NAME</th>
                                {this.state.day.map((event,i) => { return <th style={{backgroundColor: this.ShowDayColorOnSchedule(event)}} className="day">{event} </th> })}
                            </tr>
                            {this.state.user.map((event, x) => {
                                return <tr className="test2" style={{ backgroundColor: 'white',fontSize:13,color:"black"}}> <td colSpan="2">{event.Name}</td>
                                    {this.state.block.map((e, y) => {
                                        return <td style={{ backgroundColor: 'white'}}
                                            onClick={() => this.SendMultidimension(x, y)}>
                                                {this.state.selectSchedule.map(periodinschedule => {
                                                if (event.User_ID == periodinschedule.User_ID && periodinschedule.Date == e)
                                                    return <tr style={{ backgroundColor: periodinschedule.Period_Color }}><td>{periodinschedule.Period_Time_One + "-" + periodinschedule.Period_Time_Two}</td></tr>
                                            })}
                                          {this.state.edit ===  false  ? 
                                          this.state.showDropdown[0] === x && 
                                          this.state.showDropdown[1] === y && 
                                          !this.state.dropdownshouldclose &&
                                                <Timepicker CloseDropdown={this.CloseDropdown.bind(this)} AddPeriod={(PeriodUserClick) => this.AddPeriod(PeriodUserClick, x, y,event,e) } /> : false }
                                            {Array.isArray(this.state.TestShow[`${event.User_ID},${e}`])
                                                &&
                                                this.state.TestShow[`${event.User_ID},${e}`].map((show)=> 
                                                <div style={{marginBottom:-15,marginTop:-8,marginRight:-10}}>
                                                <div style={{ width:35,backgroundColor: show.Period_Color,fontSize:9,borderRadius:5,paddingLeft:2,marginLeft:-10,marginRight:0,marginTop:3,marginBottom:0,color:"white"}}>{show.Period_Time_One + "-" + show.Period_Time_Two}</div>
                                            {this.state.edit ? 
                                            <div>
                                                <img src={error} style={{ width: 10, height: 10,marginTop:-73,marginLeft:18}} onClick={() => this.DeletePeriodInSchedule(show, x, y)}>
                                                </img>
                                            </div>
                                            : <div style={{ width: 10, height: 10,marginTop:8,marginLeft:18}}></div> }</div> )}
                                        </td>
                                    })} </tr>
                            })}
                        </tbody>
                    </Table>
                    <div style={{display:"flex"}}>
                    {this.state.edit &&  <Button color="btn btn-light" style={{ color: '#E37222', marginLeft:1300,marginTop:20,}} onClick={this.finishEdit}><b>OK</b></Button>}
                    <Button color="btn btn-light" style={{ color: '#E37222', marginLeft:1300,marginTop:20 }} onClick={() => this.InsertPeriodtoSchedule(this.state.TestShow)}><b>SAVE</b></Button>{' '}
                    </div>
                </Container>
            </div>
            
        );
    }
}

export default Schedule;






// var user = {
//     test1love:[{30:"Morning"},{21:"Night"}]

// }