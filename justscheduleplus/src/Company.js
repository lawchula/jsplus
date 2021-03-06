import React, { Component } from 'react';
import './Css/Department.css';
import * as firebase from 'firebase';
import plus from './Images/plus.png';
import CreateDepartment from './CreateDepartment';
import Header from './Header';
import url from './url';
import ApiKeys from './ApiKeys';
import * as jwt_decode from 'jwt-decode';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
class Company extends Component {

    constructor(props) {
        super(props)
        this.state = {
            company: [],
            showdepartment: false,
            department: [],
            test: [],
            editDepartment: false,
            editCompany: false,
            changeDepartment: {},
            changeCompany: {},
            loading: true,
            vald: { n: null, t: null },
            valc: { n: null, e: null, t: null },
            //ส่งค่าไป firebase
            companyImages: "",
            //รับค่าจาก firebase
            companyImage: null,
            imgName: '',
            departmentImages: null,
            departmentImage: ''
        }
        if (!firebase.apps.length) {
            firebase.initializeApp(ApiKeys.FirebaseConfig)
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
            } else {
                this.getCompanyandDepartmentFromDB();
            }
        }
    }

    getCompanyandDepartmentFromDB = async () => {
        console.log("KUY")
        var token = localStorage.getItem('tk')
        const othepram = {
            headers: {
                tkauth: token,
            },
            method: "GET"
        };
        const data = await Promise.all([
            fetch(url + '/company/admin', othepram)
                .then((response) => {
                    return response.json();
                }),
            fetch(url + '/department/admin', othepram)
                .then((response) => {
                    return response.json();
                })
        ])

        const [company, department] = data
        this.setState({ company, department, loading: false })
    }

    updateDepartment = () => {
        const Url = url + "/department/update";
        const { changeDepartment, vald } = this.state
        if (changeDepartment.name.trim() == "") {
            this.setState({ vald: { n: "This field is required" } })
        } else if (changeDepartment.telno.trim() == "") {
            this.setState({ vald: { t: "This field is required" } })
        } else {
            const othepram = {
                headers: {
                    "content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({
                    departid: this.state.changeDepartment.id,
                    departname: this.state.changeDepartment.name,
                    departtelno: this.state.changeDepartment.telno,
                    departimg: this.state.departmentImage
                }),
                method: "POST"
            };
            fetch(Url, othepram)
                .then(res => {
                    this.setState({ editDepartment: false })
                    this.componentDidMount();
                })
                .catch(error => console.log(error));
        }
    }

    updateCompany = () => {
        const Url = url + "/company/update";
        const Url2 = url + "/company/update/picture";
        const { changeCompany } = this.state
        if (changeCompany.cname.trim() == "") {
            this.setState({ valc: { n: "This field is required" } })
        }
        else if (changeCompany.cemail.trim() == "") {
            this.setState({ valc: { e: "This field is required" } })
        }
        else if (changeCompany.ctelno.trim() == "") {
            this.setState({ valc: { t: "This field is required" } })
        } else if (this.state.companyImage !== null) {
            const othepram = {
                headers: {
                    "content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({
                    companyid: this.state.changeCompany.cid,
                    companyimg: this.state.companyImage,
                    companyname: this.state.changeCompany.cname,
                    companyemail: this.state.changeCompany.cemail,
                    companytelno: this.state.changeCompany.ctelno
                }),
                method: "POST"
            };
            fetch(Url2, othepram)
                .then(res => {
                    this.setState({ editCompany: false })
                    this.componentDidMount();
                })
                .catch(error => console.log(error));
        } else {
            const othepram = {
                headers: {
                    "content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({
                    companyid: this.state.changeCompany.cid,
                    companyname: this.state.changeCompany.cname,
                    companyemail: this.state.changeCompany.cemail,
                    companytelno: this.state.changeCompany.ctelno
                }),
                method: "POST"
            };
            fetch(Url, othepram)
                .then(res => {
                    this.setState({ editCompany: false })
                    this.componentDidMount();
                })
                .catch(error => console.log(error));
        }
    }

    fileSelectedHandler = (event) => {
        if (event !== null) {
            try {
                let imgfile = URL.createObjectURL(event.target.files[0])
                let imgname = event.target.files[0].name
                this.confirmUploadImage(imgfile, imgname)
            }
            catch (error) {
                return null
            }
        } else {
            return null
        }
    }

    uploadImages = async (event, imgname) => {
        const response = await fetch(event);
        const blob = await response.blob();

        var ref = firebase.storage().ref().child('images/' + imgname);
        return ref.put(blob)
        console.log('success')
    }

    confirmUploadImage = (file, name) => {
        this.uploadImages(file, name)
            .then(() => {
                firebase.storage().ref().child('images/' + name).getDownloadURL()
                    .then((imageURL) => {
                        this.setState({
                            companyImage: imageURL
                        })
                    })
            })
            .catch((error) => {
                console.log("Fail to upload" + error);
            })
    }

    fileSelectedHandler2 = (event) => {
        if(event !== null){
            try{
                let imgfile = URL.createObjectURL(event.target.files[0])
                let imgname = event.target.files[0].name
                this.confirmUploadImage2(imgfile,imgname)
            }catch(error){
                return null
            }
            // this.confirmUploadImage()
            // this.setState({
            //     departmentImages: URL.createObjectURL(event.target.files[0]),
            //     imgName: event.target.files[0].name
            // })
        } else{
            return null
        }
     }


    uploadImages2 = async (event, imgname) => {
        const response = await fetch(event);
        const blob = await response.blob();

        var ref = firebase.storage().ref().child('Department Images/' + imgname);
        return ref.put(blob)
        console.log('success')
    }


    confirmUploadImage2 = (file,name) => {
        this.uploadImages2(file, name)
            .then(() => {
                //get url ของรูปมาถ้า Upload สำเร็จ (ต้องเอา url ของรูปมาเก็บใน state แล้วนำมา show **ตอนนี้ยังไม่ได้ทำ)
                firebase.storage().ref().child('Department Images/' + name).getDownloadURL()
                    .then((imageURL) => {
                        this.setState({
                            departmentImage: imageURL
                        })
                        console.log(imageURL)
                        console.log("from state = " + this.state.departmentImage)
                    })
            })
            .catch((error) => {
                console.log("Fail to upload" + error);
            })
    }


    editDepartment = (id, name, telno) => {
        const { changeDepartment } = this.state
        this.setState({
            editDepartment: true,
            checkeditdepart: id
        })
        changeDepartment.id = id
        changeDepartment.name = name
        changeDepartment.telno = telno
    }


    editCompany = (id, name, mail, telno) => {
        const { changeCompany } = this.state
        this.setState({
            editCompany: true
        })
        changeCompany.cid = id
        changeCompany.cname = name
        changeCompany.cemail = mail
        changeCompany.ctelno = telno

    }

    changeDepartment = (event) => {
        event.preventDefault();
        let { changeDepartment } = this.state
        changeDepartment[event.target.name] = event.target.value
    }


    changeCompany = (event) => {
        event.preventDefault();
        let { changeCompany } = this.state
        changeCompany[event.target.name] = event.target.value
    }


    showCreateDepartment = () => {
        this.setState({
            showdepartment: !this.state.showdepartment
        })
    }

    render() {
        const { company, department, changeDepartment, editDepartment, checkeditdepart, editCompany, changeCompany, loading } = this.state
        const compayname = company.map((event, i) => { return <span className="second-description" key={i}>{event.Company_Name}</span> })
        const companymail = company.map((event, i) => { return <span className="second-description" key={i}>{event.Company_Mail}</span> })
        const companytel = company.map((event, i) => { return <span className="second-description" key={i}>{event.Company_Tel}</span> })
        const companypicture = company.map((event, i) => { return <img key={i} className="company-pictures" src={event.Company_Picture} ></img> })
        const companypictures = <img src={this.state.companyImage} className="company-pictures"></img>
        const departments = department.map((department) => {
            return <div className="departments">
                {editDepartment == true && department.Department_ID == checkeditdepart ?
                <div>
                 <div className="dp-img1">
                    {this.state.departmentImage == '' ? null :<img className="department-pictures" src={this.state.departmentImage}></img> }    
                    </div>
                    <div className="dp-sh">
                        <div style={{ display: 'flex' }}>
                            <span>Department :</span>
                            <input defaultValue={changeDepartment.name} className="edit-depart" name="name" onChange={event => this.changeDepartment(event)}></input>
                            <span className="val2" >{this.state.vald.n}</span>
                            <div style={{display:'flex',marginLeft:40}}>
                            <label htmlFor="manage-staff10" className="manage-staff10">Browse...</label>
                            <input type="file" name="photo" accept="image/*" id="manage-staff10" onChange={this.fileSelectedHandler2} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', marginTop: 10 }}>
                            <span>Telno :</span>
                            <input defaultValue={changeDepartment.telno} className="edit-depart2" name="telno" onChange={event => this.changeDepartment(event)}></input>
                            <span className="val2">{this.state.vald.t}</span>
                        </div>
                        <div style={{ display: 'flex', marginTop: 5, marginLeft: 200 }}>
                            <button className="manage-staff6" onClick={() => this.setState({ editDepartment: false, vald: { n: null, d: null } })}>Cancel</button>
                            <button className="manage-staff5" onClick={this.updateDepartment}>Save</button>
                        </div>
                    </div>
                    </div>
                    :
                    <div>
                    <div className="dp-img1">
                   {department.Department_Picture == "" ? null : <img className="department-pictures" src={department.Department_Picture}></img> } 
                    </div>
                    <div className="dp-sh">
                        <span>Department : {department.Department_Name}</span>
                        <span style={{ marginTop: 10 }}>Telno : {department.Department_TelNo} </span>
                        <div style={{ display: 'flex', marginTop: 10 }}>
                            <Link to={{
                                pathname: '/Department',
                                state: {
                                    manageDepartment: department
                                }
                            }}>Manage</Link>
                            <button className="manage-staff4" onClick={() => this.editDepartment(department.Department_ID, department.Department_Name, department.Department_TelNo)}>Edit</button>
                        </div>
                    </div>
                </div>
                }
            </div>
        })

        return (
            <div className="department-container">
                {!loading &&
                    <React.Fragment>
                        <Header></Header>
                        <div className="company-description">
                            {this.state.companyImage == null ? companypicture : companypictures}
                            {editCompany == true ?
                                <div>
                                    <div style={{ display: 'flex' }}>
                                        <label htmlFor="manage-staff9" className="manage-staff9">Browse...</label>
                                        <input type="file" name="photo" accept="image/*" id="manage-staff9" onChange={this.fileSelectedHandler} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', padding: 5, marginTop: 10 }}>
                                        <span>Company :</span>
                                        <input defaultValue={changeCompany.cname} className="edit-depart" name="cname" onChange={event => this.changeCompany(event)} className="input-c"></input>
                                        <span className="val2" >{this.state.valc.n}</span>
                                        <span>Email   :</span>
                                        <input defaultValue={changeCompany.cemail} className="edit-depart" name="cemail" onChange={event => this.changeCompany(event)} className="input-c"></input>
                                        <span className="val2" >{this.state.valc.e}</span>
                                        <span>Telno   :</span>
                                        <input defaultValue={changeCompany.ctelno} className="edit-depart" name="ctelno" onChange={event => this.changeCompany(event)} className="input-c"></input>
                                        <span className="val2" >{this.state.vald.t}</span>
                                        <div style={{ display: 'flex' }}>
                                            <button className="manage-staff7" onClick={() => this.setState({ editCompany: false, valc: { n: null, e: null, t: null },departmentImage:'' })}>Cancel</button>
                                            <button className="manage-staff8" onClick={this.updateCompany} >Save</button>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <button className="manage-staff8" onClick={() => this.editCompany(company[0].Company_ID, company[0].Company_Name, company[0].Company_Mail, company[0].Company_Tel)}>Edit</button>
                                    <span className="description" style={{ marginTop: 20 }}>Company :</span>
                                    {compayname}
                                    <span className="description">Email :</span>
                                    {companymail}
                                    <span className="description">Telno :</span>
                                    {companytel}
                                </div>
                            }
                        </div>
                        <div className="department">
                            <div className="create-department-container">
                                <div className="create-department" onClick={this.showCreateDepartment}>
                                    <img src={plus} style={{ height: 32 }}></img>
                                </div>
                                <span style={{ marginLeft: 10 }}>create department</span>
                            </div>
                            {departments}

                        </div>
                        <CreateDepartment show={this.state.showdepartment} onClose={this.showCreateDepartment} company={this.state.department}></CreateDepartment>
                    </React.Fragment>
                }
            </div>

        );
    }

}

export default Company