import React, { Component } from "react";
import './Css/DepartmentDescription.css';
import { Table } from 'reactstrap';
import Header from './Header';
import setmanager from './Images/setmanager.png';
import setstaff from './Images/setstaff.png';
import remove from './Images/delete.png';
import edit from './Images/configuration.png';
import url from './url';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';


class Department extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // user:[{id:'1',name:"Teetuch Jeeravarangkul3",email:'lawchula@hotmail.com',telno:'0917767191',position:'Manager'},
            //     {id:'2',name:"Teetuch Jeeravarangkul",email:'lawchula@hotmail.com',telno:'0917767191',position:'Front-end Developer'},
            // {id:'3',name:"Teetuch Jeeravarangkul2",email:'lawchula@hotmail.com',telno:'0917767191',position:'Front-end Developer'}],
            user: [],
            edit: true,
            addstaff: false,
            test: 0,
            test2: [],
            loading: true,
            department: [],
            cols:[],
            rows:[],
            newusers:[]
        }
    }

    componentDidMount() {
        const { manageDepartment } = this.props.location.state
        this.setState({ department: manageDepartment })
        this.getDepartmentDes(manageDepartment);
    }

    getDepartmentDes = async (manageDepartment) => {
        let departID = manageDepartment.Department_ID
        console.log(departID)
        // var token = localStorage.getItem('tk')
        const othepram = {
            headers: {
                departid: departID
            },
            method: "GET"
        };
        const data = await Promise.all([
            fetch(url + '/get/department/user', othepram)
                .then((response) => {
                    return response.json();
                })
        ])

        const [user] = data
        this.setState({ user, loading: false })
    }
    remove = (key) => {
        this.state.user.splice(key, 1);
        this.forceUpdate();
    }

    editTable = (key) => {
        this.setState({
            test: key
        })
    }

    addStaff = () => {
        this.setState({
            addstaff: !this.state.addstaff
        })
    }

    cancleEdit = () => {
        this.setState({
            test: ""
        })
    }

    handleChange = (event, key) => {
        event.preventDefault();
        // let  {user}  = this.state;
        // user[event.target.name ]= event.target.value
        // user[key].name = event.target.value
        // user[key].email = event.target.value
        // user[key].telno = event.target.value
        // user[key].position = event.target.value
        // this.setState({user})
        //  user[event.target.name] = event.target.value;
        //  this.setState({ user });
        // console.log(event.target.name)
        // console.log(event.target.value)
        // console.log(user)

    }
    submit = () => {
        this.setState({
            test: ""
        })
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

    addUserfromExcel = (event) =>{
        for(let i=0; i <event.length;i++){
          var a = {}
          a.name = event[i][0]
          a.surname = event[i][1]
          a.email = event[i][2]
          a.telno = event[i][3]
          a.position = event[i][4]
          this.state.newusers.push(a)
          console.log(event[i])
        }
        console.log(this.state.rows)
        console.log(this.state.newusers)
        this.state.rows = []
        this.state.cols = []
       }
    


    render() {

        const { edit, addstaff, test, department,user,newusers } = this.state
        console.log(user)
        const manage = user.map((e, key) => {
            return <tr>
                <td>{e.User_ID == test ? <div style={{display:"flex"}}>
                                            <input style={{width:120}} defaultValue={e.name} name="name" onChange={event => this.handleChange(event, key)} ></input>
                                            <input style={{width:120,marginLeft:5}} defaultValue={e.surname} name="name" onChange={event => this.handleChange(event, key)} ></input>  
                                         </div> : e.name+" " + e.surname}</td>
                <td>{e.User_ID== test ? <input defaultValue={e.Email} name="email" onChange={event => this.handleChange(event, key)}></input> : e.Email}</td>
                <td>{e.User_ID == test ? <input defaultValue={e.PhoneNumber} name="telno" onChange={event => this.handleChange(event, key)}></input> : e.PhoneNumber}</td>
                <td>{e.User_ID == test ? <input defaultValue={e.Position_Name} name="position" onChange={event => this.handleChange(event, key)}></input> : e.Position_Name}</td>
                <td>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <img src={e.Position_Name == "Manager" ? setmanager : setstaff}></img>
                        {e.User_ID == test ? <div style={{ display: 'flex' }}>
                            <button className="manage-staff3" onClick={this.cancleEdit}>cancel</button>
                            <button className="manage-staff2" onClick={this.submit}>save</button> </div>
                            :
                            <div style={{ display: 'flex' }}>
                                <button className="manage-staff3" onClick={() => this.remove(key)} >remove</button>
                                <button className="manage-staff2" onClick={() => this.editTable(e.User_ID)}>edit</button>
                            </div>
                        }
                    </div>
                </td>
            </tr>
        })

        // const newuser =  newusers.map((e, key) => {return <tr>
        //     <td>{e.name}</td>
        //     <td>{e.surame}</td>
        //     <td>{e.email}</td>
        //     <td>{e.position}</td>
        // </tr>})

        let manager = '';
        let member = user.length
        user.map(manager => {
            if(manager.Position_Name === "Manager"){
                manager = manager.name + ' ' + manager.surname
            }
        })

        return (
            <div className="department-description">
                <Header></Header>
                <div className="dp-ds-container">
                    <div className="dp-header">
                        <div className="col-5">
                            <div className="dp-img">
                            {/* <img className="department-pictures" src={department.Department_Picture}></img> */}
                            </div>
                        </div>
                        <div className="dp-description col-9">
                            <span>Depaertment :</span>
                            <span>{department.Department_Name}</span>
                            <br></br>
                            <br></br>
                            <span>Telno :</span>
                            <span>{department.Department_TelNo}</span>
                            <br></br>
                            <br></br>
                            <span>Manager :</span>
                            {manager}
                            <br></br>
                            <br></br>
                            <span>Member :</span>
                            {member}
                        </div>
                    </div>
                </div>
                <div className="tb-container">
                    {addstaff == false ?
                        <div className="add-staff">
                            <button className="add-staff-butt" onClick={this.addStaff}>Add Staff+</button>
                            <button className="add-staff-butt2" onClick={this.addUserfromExcel(this.state.rows)}>Import</button>
                            <input type="file" onChange={this.fileHandler.bind(this)} style={{"padding":"10px"}} />                      
                        </div>
                        :
                        <div className="add-staff2">
                            <input placeholder="Name" ></input>
                            <input placeholder="Surname" style={{ marginLeft: 10 }}></input>
                            <input placeholder="Email" style={{ marginLeft: 10 }}></input>
                            <input placeholder="Telno" style={{ marginLeft: 10 }}></input>
                            <input placeholder="Position" style={{ marginLeft: 10 }}></input>
                            <button className="add-staff-butt" onClick={this.addStaff} style={{ marginLeft: 10 }}>Add</button>
                        </div>
                    }
                    <Table bordered responsive className="table-dp">
                        <tbody>
                            <tr id="table-header">
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>TELNO</th>
                                <th>POSITION</th>
                                <th>MANAGE</th>
                            </tr>
                            {manage}
                            {newusers.map((e, key) => {return <tr>
                                <td>{e.name +" " +e.surname}</td>
                                <td>{e.email}</td>
                                <td>{e.telno}</td>
                                <td>{e.position}</td>
                                <td><span style={{color:"#4054b2"}}>Please save data</span></td>
                            </tr>})}
                        </tbody>
                    </Table>
                    <button>Save</button>
                </div>
            </div>

        );
    }
}

export default Department