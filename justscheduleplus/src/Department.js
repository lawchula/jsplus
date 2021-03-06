import React, { Component } from "react";
import './Css/DepartmentDescription.css';
import { Table } from 'reactstrap';
import Header from './Header';
import setmanager from './Images/setmanager.png';
import setstaff from './Images/setstaff.png';
import remove from './Images/delete.png';
import * as jwt_decode from 'jwt-decode';
import edit from './Images/configuration.png';
import url from './url';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from 'reactstrap';
import Position from './Position';
import infor from './Images/infor.png';
import ExampleImport from './ExampleImport';
import down from './Images/down.png';



class Department extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: [],
            edit: true,
            addstaff: false,
            test: 0,
            test2: [],
            loading: true,
            department: [],
            cols: [],
            rows: [],
            newusers: [],
            subject: "Your administrator create your account for Justscheduleplus",
            dropdownOpen: false,
            addposition: 0,
            newuser: { name: "", surname: "", email: "", telno: "" },
            showposition: false,
            positions: [],
            newuserp: [],
            changeposition: {},
            positionname: null,
            notification: [],
            loading: true,
            showImport:false
        }
    }

    componentDidMount() {
        this.checkToken();
    }

    checkToken = () => {
        var token = localStorage.getItem('tk');
        if (token === null || token === undefined) {
            alert("Please Login")
            window.location.href = '/'
        } else if (token !== null && token !== undefined) {
            var decoded = jwt_decode(token);
            if (decoded.position === "Manager") {
                alert("Not have Permission")
                window.location.href = "/Schedule";
            } else if (decoded.position !== "Admin") {
                alert("Not have Permission")
                window.location.href = "/User";
            } else if (this.props.location.state === undefined) {
                alert("Please Select Department")
                window.location.href = "/Company";
            } else {
                const { manageDepartment } = this.props.location.state
                this.setState({ department: manageDepartment })
                this.getDepartmentDes(manageDepartment)
                this.getPosition(manageDepartment)
            }
        }
    }

    getDepartmentDes = async (manageDepartment) => {
        let departID = manageDepartment.Department_ID

        const othepram = {
            headers: {
                departid: departID
            },
            method: "GET"
        };
        const data = await Promise.all([
            fetch(url + '/department/user', othepram)
                .then((response) => {
                    return response.json();
                })
        ])

        const [user] = data
        this.setState({ user, loading: false, })
        // this.getAllNotification(user)
    }

    getPosition = (manageDepartment) => {
        let departID = manageDepartment.Department_ID
        const othepram = {
            headers: {
                departid: departID
            },
            method: "GET"
        };

        fetch(url + "/position", othepram)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                this.setState({ positions: myJson });
                this.setState({ newuserp: myJson })
            });
    };

    // getAllNotification = (user) => {
    //     let manager = [];
    //     let member = user.length
    //     user.map(manage => {
    //         if (manage.Position_Name === "Manager") {
    //             manager.push(manage)
    //         }
    //     })

    //     if(manager.length !== 0){
    //         const Url = url + "/user/admin/notification"
    //         const othepram = {
    //             headers: {
    //                 manager: manager
    //             },
    //             method: "GET"
    //         };
    //         fetch(Url, othepram)
    //             .then(response => {
    //                 return response.json();
    //             })
    //             .then(myJson => {
    //                 this.setState({ notification: myJson });
    //             });
    //     }
    // }

    saveEdit = () => {
        const Url = url + "/user/position/update";
        const { changeposition } = this.state
        const othepram = {
            headers: {
                "content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                userid: changeposition.userid,
                newposition: changeposition.newposition
            }),
            method: "POST"
        };
        fetch(Url, othepram)
            .then(res => {
                this.setState({ changeposition: [], test: 0 });
                alert('Update user success');
                this.componentDidMount()
                //   this.cancelEdit();
            })
            .catch(error => console.log(error));
    }

    insertUser = () => {
        let check = false
        for (let i = 0; i < this.state.newusers.length; i++) {
            if (this.state.newusers[i].position === "Please select position") {
                alert("Position of " + this.state.newusers[i].name + " " + this.state.newusers[i].surname + " is invalid")
            }else{
                check = false
            }
        }

        if(!check){
            const Url = url + "/user/insert";
            const othepram = {
                headers: {
                    "content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({
                    user: this.state.newusers,
                }),
                method: "POST"
            };
            fetch(Url, othepram)
                .then(res => res.json())
                .then(json => {
                    this.sendEmail()
                    alert('Import From Excel Success');
                    this.setState({ newusers: [] });
                    this.componentDidMount()
                })
                .catch(error => console.log(error));
        }
    }


    remove = (key) => {
        const { user } = this.state
        let removeUser = user[key]

        if (!window.confirm("Do you want to remove this staff?")) return
        const Url = url + "/user/remove";
        const othepram = {
            headers: {
                "content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                user: removeUser
            }),
            method: "POST"
        };
        fetch(Url, othepram)
            .then(res => res.json())
            .then(json => {
                alert('remove user success');
                this.forceUpdate();
            })
            .catch(error => console.log(error));
    }

    editTable = (key) => {
        this.setState({
            test: key
        })
    }

    addStaff = () => {
        this.setState({
            addstaff: !this.state.addstaff,
            val: null
        })
    }

    cancleEdit = () => {
        this.setState({
            test: ""
        })
    }

    submit = () => {
        this.setState({
            test: ""
        })
    }

    fileHandler = (event) => {
        let fileObj = event.target.files[0];
        if (fileObj == null) {
            return " "
        } else {
            ExcelRenderer(fileObj, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    this.setState({
                        cols: resp.cols,
                        rows: resp.rows
                    });
                }
            });
        }
    }

    addUserfromExcel = (event) => {
        for (let i = 0; i < event.length; i++) {
            if (event[i].length > 0 && event[i][0] !== undefined && event[i][1] !== undefined && event[i][2] !== undefined && event[i][3] !== undefined) {
                var a = {}
                const random = Math.floor(Math.random() * 9999999) + 1
                const password = event[i][0].substring(0, 1) + event[i][1].substring(0, 1) + random
                const surnamesub = event[i][1].substring(0, 3)
                a.name = event[i][0]
                a.surname = event[i][1]
                a.email = event[i][2]
                a.telno = event[i][3]
                a.position = "Please select position"
                a.username = event[i][0] + "." + surnamesub
                a.id = this.state.newusers.length
                a.positionid = null
                a.password = password
                this.state.newusers.push(a)
            }else{
                alert("Invalid user information at row "+event.length)
                // this.setState({
                //     newusers:[]
                // })
            }
        }
        this.state.rows = []
        this.state.cols = []
    }

    sendEmail = () => {
        for (let i = 0; i < this.state.newusers.length; i++) {
            const Url = url + '/email/send';
            const othepram = {
                headers: {
                    "content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    email: this.state.newusers[i].email,
                    subject: this.state.subject,
                    username: this.state.newusers[i].username,
                    password: this.state.newusers[i].password
                }),
                method: "POST"
            };
            fetch(Url, othepram)
                .then(data => { return data.json() })
                .then(res => {
                })
                .catch(error => console.log(error))
        }
    }

    toggle = (id, key) => {
        const { dropdownOpen } = this.state
        this.setState({
            dropdownOpen: !dropdownOpen,
            addposition: key
        })
    }

    handleChange = (event) => {
        event.preventDefault();
        const { newuser } = this.state
        newuser[event.target.name] = event.target.value
        newuser.id = this.state.newusers.length
        newuser.position = "Please select position"
        newuser.positionid = null
        this.setState({ newuser })
        this.setState({ val: null })
    }

    handleSubmit = (event) => {
        const validEmailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const phoneno = /^0[0-9]{8,9}$/i;
        event.preventDefault();
        const { newuser } = this.state
        if (newuser.name.trim() == "" || newuser.surname.trim() == "" || newuser.email.trim() == "" || newuser.telno.trim() == "") {
            this.setState({ val: "Invalid user information" })
            newuser.name = ""
            newuser.surname = ""
            newuser.email = ""
            newuser.telno = ""
        } else if (!validEmailRegex.test(newuser.email)) {
            this.setState({ val: "Please fill the right format for email" })
        } else if (!phoneno.test(newuser.telno)) {
            this.setState({ val: "Please fill the right format for telephone number" })
        } else {
            const random = Math.floor(Math.random() * 9999999) + 1
            const password = this.state.newuser.name.substring(0, 1) + this.state.newuser.surname.substring(0, 1) + random
            const surnamesub = newuser.surname.substring(0, 3)
            newuser.username = this.state.newuser.name + "." + surnamesub
            newuser.password = password
            this.state.newusers.push(this.state.newuser)
            this.setState({ addstaff: false, val: null })
            this.state.newuser = { name: "", surname: "", email: "", telno: "" }
        }
    }

    showPosition = () => {
        this.setState({
            showposition: !this.state.showposition
        })
    }

    selectPosition = (event, key, id, pid) => {
        const { newusers } = this.state
        let newposition = {}
        newposition.key = key
        newposition.name = event.target.innerText
        newposition.id = id
        newposition.pid = pid
        if (newusers[key].positionid == null) {
            newusers[key].positionid = newposition.pid
            newusers[key].position = newposition.name
        } else {
            if (newusers[key].id == newposition.id) {
                newusers[key].positionid = newposition.pid
                newusers[key].position = newposition.name
            } else {
                newusers[key].positionid = newposition.pid
                newusers[key].position = newposition.name
            }

        }
    }

    changePosition = (event, key, p) => {
        const id = this.state.user[key].User_ID
        const pid = p
        const pname = event.target.innerText
        this.state.changeposition.userid = id
        this.state.changeposition.newposition = pid
        this.setState({
            positionname: pname
        })
    }

    showExample = () =>{
        this.setState({
          showImport: !this.state.showImport
        })
    }

    render() {
        const { edit, addstaff, test, department, user, newusers, positions, dropdownOpen, changeposition, positionname, newuser, editDepartment, changeDepartment, loading } = this.state
        const manage = user.map((e, key) => {
            return <tr>
                <td>{e.name + " " + e.surname}</td>
                <td>{e.Email}</td>
                <td>{e.PhoneNumber}</td>
                <td>{e.User_ID == test ? <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} direction='down' size="sm">
                    <DropdownToggle tag="div" style={{cursor:'pointer'}}>       
                        <div style={{border:'1px solid black',width:'auto',padding:5,maxWidth:110}}>   
                        {positionname == null ? <span>{e.Position_Name}</span> : <span>{positionname}</span>}
                        <img src={down} style={{marginLeft:8,width:15,height:15}}></img>
                        </div>
                    </DropdownToggle>
                    <DropdownMenu  className="position-box">
                        {positions.map((p) => {
                            return <DropdownItem onClick={(event) => this.changePosition(event, key, p.Position_ID)}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <span>{p.Position_Name}</span>
                                </div>
                            </DropdownItem>
                        })}
                    </DropdownMenu>
                </Dropdown> : e.Position_Name}</td>
                <td>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <img src={e.Position_Name == "Manager" ? setmanager : setstaff}></img>
                        {e.User_ID == test ? <div style={{ display: 'flex' }}>
                            <button className="manage-staff3" onClick={this.cancleEdit}>cancel</button>
                            <button className="manage-staff2" onClick={this.saveEdit}>save</button> </div>
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

        let manager = '';
        let member = user.length
        user.map(manage => {
            if (manage.Position_Name === "Manager") {
                manager = manage.name + ' ' + manage.surname
            }
        })

        return (
            <div className="department-description">
                <Header></Header>
                {!loading && <React.Fragment>
                    <div className="dp-ds-container">
                        <div className="dp-header">
                            <div className="col-3">
                                <div className="dp-img">
                                {department.Department_Picture === "" ? null :  <img className="dp-img2" src={department.Department_Picture}></img>}       
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
                                <button className="add-staff-butt" onClick={this.showPosition}>CREATE POSITION</button>
                                <button className="add-staff-butt" onClick={this.addStaff}>ADD STAFF</button>
                                <button className="add-staff-butt2" onClick={this.addUserfromExcel(this.state.rows)}>IMPORT STAFF</button>
                                <label htmlFor="upload-excel" className="add-staff-excel" >Import</label>
                                <input type="file" id="upload-excel" accept=".xlsx, .xls" onChange={this.fileHandler.bind(this)} style={{ "padding": "10px" }} />
                                <img src={infor} style={{width:28,height:28,marginLeft:10}} onClick={this.showExample}></img>
                            </div>
                            :
                            <div className="add-staff2">
                                <div>
                                    <input placeholder="Name" name="name" value={newuser.name} onChange={event => this.handleChange(event)}></input>
                                    <input placeholder="Surname" name="surname" value={newuser.surname} style={{ marginLeft: 10 }} onChange={event => this.handleChange(event)}></input>
                                    <input type="email" placeholder="Email" value={newuser.email} name="email" style={{ marginLeft: 10 }} onChange={event => this.handleChange(event)}></input>
                                    <input placeholder="Telno" name="telno" value={newuser.telno} style={{ marginLeft: 10 }} onChange={event => this.handleChange(event)}></input>
                                    <button className="add-staff-butt" style={{ marginLeft: 10 }} onClick={this.addStaff}>Cancel</button>
                                    <button className="add-staff-butt" style={{ marginLeft: 10 }} onClick={this.handleSubmit}>Add</button>

                                </div>
                                <span className="val5">{this.state.val}</span>
                            </div>
                        }
                        <br></br>
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
                                {newusers.map((e, key) => {
                                    return <tr>
                                        <td>{e.name + " " + e.surname}</td>
                                        <td>{e.email}</td>
                                        <td>{e.telno}</td>
                                        <td><Dropdown isOpen={this.state.dropdownOpen && key == this.state.addposition} toggle={() => this.toggle(e.id, key)} direction='down' size="sm">
                                            <DropdownToggle tag="span" style={{cursor:'pointer'}}>
                                                <span>{e.position}</span>
                                            </DropdownToggle>
                                            {key == this.state.addposition ? <DropdownMenu  className="position-box">
                                                {this.state.newuserp.map((p, index) => {
                                                    return <DropdownItem onClick={(event) => this.selectPosition(event, key, e.id, p.Position_ID)} >
                                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                                            <span>{p.Position_Name}</span>
                                                        </div>
                                                    </DropdownItem>
                                                })}
                                            </DropdownMenu> : null}
                                        </Dropdown>
                                        </td>
                                        <td><span style={{ color: "#4054b2" }}>Please save data</span></td>
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                        {this.state.newusers.length == 0 ? null : <button className="add-staff-butt3" onClick={() => this.insertUser()}>Save</button>}
                    </div>
                    <Position show={this.state.showposition} onClose={this.showPosition} test={this.props.location.state.manageDepartment} getPosition = {this.checkToken}></Position>
                    <ExampleImport show={this.state.showImport} onClose={this.showExample}></ExampleImport>
                </React.Fragment>
                }
            </div>
        );
    }
}

export default Department