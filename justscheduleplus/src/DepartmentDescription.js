import React, { Component } from "react";
import './Css/DepartmentDescription.css';
import { Table } from 'reactstrap';
import Header from './Header';
import manager from './Images/setmanager.png';
import staff from './Images/setstaff.png';
import remove from './Images/delete.png';
import edit from './Images/configuration.png';


class DepartmentDescription extends Component {

    constructor(props){
        super(props)
        this.state = {
            // user:[{id:'1',name:"Teetuch Jeeravarangkul3",email:'lawchula@hotmail.com',telno:'0917767191',position:'Manager'},
            //     {id:'2',name:"Teetuch Jeeravarangkul",email:'lawchula@hotmail.com',telno:'0917767191',position:'Front-end Developer'},
            // {id:'3',name:"Teetuch Jeeravarangkul2",email:'lawchula@hotmail.com',telno:'0917767191',position:'Front-end Developer'}],
            user:[{id:'1',name:"Teetuch Jeeravarangkul3",email:'lawchula@hotmail.com',telno:'0917767191',position:'Manager'}],
            edit:true,
            addstaff:false,
            test: 0,
            test2:[],


        }

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
            addstaff : !this.state.addstaff
        })
    }

    cancleEdit= () =>{
        this.setState({
            test: ""
        })
    }

    handleChange = (event,key) => {
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
    

    render(){

        const {edit,addstaff,test} = this.state

        const manage = this.state.user.map((e,key) => {return  <tr>
        <td>{e.id == test ? <input defaultValue={e.name} name="name"   onChange={event => this.handleChange(event,key)} ></input> : e.name}</td>
        <td>{e.id == test ? <input defaultValue={e.email} name="email"   onChange={event => this.handleChange(event,key)}></input> : e.email}</td>
        <td>{e.id == test ? <input defaultValue={e.telno} name="telno"  onChange={event => this.handleChange(event,key)}></input> : e.telno}</td>
        <td>{e.id == test ? <input defaultValue={e.position} name="position"  onChange={event => this.handleChange(event,key)}></input> : e.position}</td>
        <td>
        <div style={{display:'flex',justifyContent:'space-around'}}>
            <img src={e.position == "Manager" ? manager : staff}></img>
            {e.id == test ?  <div style={{display:'flex'}}>  
            <button className="manage-staff3"  onClick={this.cancleEdit}>cancel</button>
            <button className="manage-staff2" onClick={this.submit}>save</button> </div> 
            :
            <div style={{display:'flex'}}>  
            <button className="manage-staff1" onClick={() => this.remove(key)} >remove</button>
            <button className="manage-staff2" onClick={() => this.editTable(e.id)}>edit</button>
            </div>
       }
           
        </div>
        </td>
        </tr>

        }) 


        return (
            <div className="department-description">
                <Header></Header>
            <div className="dp-ds-container">
                <div className="dp-header">
                    <div className="col-5">
                        <div className="dp-img">

                        </div>
                    </div>
                    <div className="dp-description col-9">
                        <span>Depaertment :</span>
                        <span>{this.state.departmentname}</span>
                        <br></br>
                        <br></br>
                        <span>Telno :</span>
                        <span>{this.state.departmenttel}</span>
                        <br></br>
                        <br></br>
                        <span>Manager :</span>
                        <span>{this.state.departmentmanager}</span>
                        <br></br>
                        <br></br>
                        <span>Member :</span>
                        <span>{this.state.departmentmember}</span>
                    </div>
                </div>
                </div>
                <div className="tb-container">
                {addstaff == false ?
                 <div className="add-staff">
                 <button className="add-staff-butt" onClick={this.addStaff}>Add Staff+</button>
                 </div>
                 :
                 <div className="add-staff2">
                    <input placeholder="Name" ></input>
                    <input placeholder="Surname" style={{marginLeft:10}}></input>
                    <input placeholder="Email" style={{marginLeft:10}}></input>
                    <input placeholder="Telno" style={{marginLeft:10}}></input>
                    <input placeholder="Position" style={{marginLeft:10}}></input>
                    <button className="add-staff-butt" onClick={this.addStaff} style={{marginLeft:10}}>Add</button>
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
                 </tbody>
                  </Table>
                </div>
            </div>
        );
    }
}

export default DepartmentDescription