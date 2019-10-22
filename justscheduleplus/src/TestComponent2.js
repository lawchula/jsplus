import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import CreateCompany from './CreateCompany';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CreateDepartment from './CreateDepartment';
import Request from './RequestPopup';
import RequestAbsent from './RequestAbsent';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,Dropdown } from 'reactstrap';




class TestComponent2 extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showLogin: false,
      showregis: false,
      showcompany: false,
      showdepartment: false,
      showrequest: false,
      showrequestabsent: false,
      months:["Januray","February","March","April","May","June","July","August","September","October","November","December"],  
      dropdownOpen: false,
      month: 0,
      nameofmonth: "test"
    }
  }

  componentDidMount(){
    AOS.init({
      duration : 2000
    })
  }

  showRequest = () => {
    this.setState({
      showrequest : !this.state.showrequest
    })
  }
  showRequestAbsent = () => {
    this.setState({
      showrequestabsent : !this.state.showrequestabsent
    })
  }

  showLogin = () => {
    this.setState({
      showLogin: !this.state.showLogin
    })
  }

  showRegister = () => {
    this.setState({
      showregis: !this.state.showregis
    })
  }

  showCreateCompany = () => {
    this.setState({
      showcompany: !this.state.showcompany
    })
  }

  showCreateDepartment = () => {
    this.setState({
      showdepartment: !this.state.showdepartment
    })
  }

  toggle = () => {
    const { dropdownOpen } = this.state
    this.setState({ dropdownOpen: !dropdownOpen })
}

 getMonth = (event) =>{
    console.log(event)
    let check = 0
    if(event == "Januray"){
      check = 1
    }else if(event == "February"){
      check = 2
    }else if(event ==  "March"){
      check = 3
    }else if(event ==  "April"){
      check = 4
    }
    else if(event ==  "May"){
      check = 5
    }
    else if(event ==  "June"){
      check = 6
    }
    else if(event ==  "July"){
      check = 7
    }
    else if(event ==  "August"){
      check = 8
    }
    else if(event ==  "September"){
      check = 9
    }
    else if(event ==  "October"){
      check = 10
    }
    else if(event ==  "November"){
      check = 11
    }else{
      check =12
    }
    
    this.setState({nameofmonth: event})
    
    console.log(check)
    
   
 }

  render() {


    return (
      <div>
        <button onClick={this.showLogin}>Test</button>
        <button onClick={this.showRegister}>Test</button>
        <button onClick={this.showCreateCompany}>Company</button>
        <button onClick={this.showCreateDepartment}>Department</button>
        <button onClick={this.showRequest}>Request</button>
        <button onClick={this.showRequestAbsent}>Request Absent</button>
        <RequestAbsent show={this.state.showrequestabsent} onClose={this.showRequestAbsent}></RequestAbsent>
        <Request show={this.state.showrequest} onClose={this.showRequest}></Request>
        <CreateCompany show={this.state.showcompany} onClose={this.showCreateCompany}></CreateCompany>
        <Login show={this.state.showLogin} onClose={this.showLogin}></Login>
        <Register show={this.state.showregis} onClose={this.showRegister}></Register>
        <CreateDepartment show={this.state.showdepartment} onClose={this.showCreateDepartment}></CreateDepartment>
        {/* <div data-aos='fade-right' style={{height:300,width:300,backgroundColor:'red',marginTop:1000}}> 

        </div> */}

        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} direction='down' style={{ marginTop: -12, marginLeft: -13 }} size="sm">
            <DropdownToggle tag="span">
             <span>{this.state.nameofmonth}</span>
               </DropdownToggle>
               <DropdownMenu>
               {this.state.months.map((event, i) => { return <DropdownItem onClick={() => this.getMonth(event)}>{event} </DropdownItem> })}
                 </DropdownMenu>
                  </Dropdown>
       
      </div>
    );
  }
}

export default TestComponent2