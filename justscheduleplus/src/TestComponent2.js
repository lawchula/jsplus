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
import {OutTable, ExcelRenderer} from 'react-excel-renderer';




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
      nameofmonth: "test",
      cols:[],
      rows:[],
      user:{name:"",surname:"",email:"",position:""},
      users:[]
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

  fileHandler = (event) => {
    let fileObj = event.target.files[0];

    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if(err){
        console.log(err);            
      }
      else{
        this.setState({
          cols: resp.cols,
          rows: resp.rows
        });
        console.log(this.state.rows.length)
      }
    });               

  }
   
  test = (event) => {
   

    for(let i=0; i <event.length;i++){
      var a = {}
      a.name = event[i][0]
      a.surname = event[i][1]
      a.email = event[i][2]
      a.position = event[i][3]
      this.state.users.push(a)
      console.log(event[i])

    }
    console.log(this.state.users)
     
  }



  render() {


    return (
      <div>
        <button onClick={this.test(this.state.rows)}>Test</button>
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

      <input type="file" onChange={this.fileHandler.bind(this)} style={{"padding":"10px"}} />
      <OutTable data={this.state.rows} columns={this.state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />
      {this.state.rows.map((e)=>  {return <div>{e}<br></br></div>})}
       
      </div>
    );
  }
}

export default TestComponent2