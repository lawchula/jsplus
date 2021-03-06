import React, { Component } from 'react';
import close from './Images/error.png';
import './Css/CreateDepartment.css';
import * as firebase from 'firebase';
import ApiKeys from './ApiKeys';
import url from './url'

// เหลือ company_id ที่เป็น forienkey รอเตยส่งค่ามาให้
class CreateDepartment extends Component {

    constructor(props) {
        super(props)
        this.state = {
            department: { departmentName: '', departmentTel: '' },
            departmentImages: null,
            departmentImage: '',
            imgName: '',
            validate: '',
            validateTelno: '',
            validateDepartmentName: ''
        }

        if (!firebase.apps.length) {
            firebase.initializeApp(ApiKeys.FirebaseConfig)
        }
    }

    onClose = (e) => {
        if (this.props.onClose !== undefined) {
            this.props.onClose(e)
        }
    }

    fileSelectedHandler = (event) => {
        if (event !== null) {
            try {
                let imgfile = URL.createObjectURL(event.target.files[0])
                let imgname = event.target.files[0].name
                this.confirmUploadImage(imgfile, imgname)
            } catch (error) {
                return null
            }
        } else {
            return null
        }
    }


    uploadImages = async (event, imgname) => {
        const response = await fetch(event);
        const blob = await response.blob();

        var ref = firebase.storage().ref().child('Department Images/' + imgname);
        return ref.put(blob)
    }


    confirmUploadImage = (file, name) => {
        this.uploadImages(file, name)
            .then(() => {
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
        this.setState({
            imgName: name
        })
    }


    handleChange = (event) => {
        event.preventDefault()
        let { department } = this.state
        department[event.target.name] = event.target.value
        this.setState({ department })
        this.setState({ validate: '', validateTelno: '' })
    }


    handleSubmit = (event) => {
        event.preventDefault()

        let { department } = this.state
        const phoneno = /^0[0-9]{8,9}$/i;
        for (let i = 0; i < this.props.company.length; i++) {
            if (department.departmentName.trim() !== "" && department.departmentName === this.props.company[i].Department_Name) {
                this.setState({ validateDepartmentName: 'This department name is already used' })
            }
        }
        if (department.departmentName.trim() === "" || department.departmentTel.trim() === "") {
            this.setState({ validate: 'This field is requried' })
        } else if (!phoneno.test(department.departmentTel)) {
            this.setState({
                validateTelno: "Invalid telephone numeber"
            })
        } else {
            var token = localStorage.getItem('tk');
            const Url = url + '/department/insert';
            const othepram = {
                headers: {
                    "content-type": "application/json; charset=UTF-8",
                    tkauth: token
                },
                body: JSON.stringify({
                    createdepartment: this.state.department,
                    departmentpicture: this.state.departmentImage
                }),
                method: "POST"
            };
            fetch(Url, othepram)
                .then(data => { return data.json() })
                .then(res => {
                    alert("Create Department Success")
                    window.location.href = "/Company";
                })
                .catch(error => console.log(error))
        }
    }

    render() {
        if (!this.props.show) {
            return null;
        }
        const { departmentImages, imgName, departmentImage, department, validate } = this.state
        console.log(this.props.company)

        return (
            <div className="createdepartment-popup">
                <div className="createdepartment-popup_inner">
                    <div className="createdepartment-header">
                        <img src={close} onClick={(e) => this.onClose(e)} className="close-createdepartment"></img>
                        <span>Create Department</span>
                        <hr></hr>
                    </div>
                    <div className="createdepartment-content">
                        <div className="left-content">
                            <div className="department-picture">
                                {departmentImage == "" ? '' : <img className="company-picture" src={departmentImage}></img>}
                            </div>
                            <span className="selectedfile">{imgName == null ? 'no file selected' : imgName}</span>
                            <div style={{ display: 'flex' }}>
                                <label htmlFor="upload-photo" className="upload-picture">Browse...</label>
                                <input type="file" name="photo" accept="image/*" id="upload-photo" onChange={this.fileSelectedHandler} />
                                {/* <button className="upload-picture" onClick={this.confirmUploadImage}>Upload</button> */}
                            </div>
                        </div>
                        <div className="right-content">
                            <span id='comname'>Department Name</span>
                            <input type='text' className='createcom' name="departmentName" onChange={(event => this.handleChange(event))} />
                            <span className="valcreatedepartment">{department.departmentName == "" ? validate : " "}</span>
                            <span className="valcreatedepartment">{this.state.validateDepartmentName}</span>
                            <br></br>
                            <span id='tel'>Telephone</span>
                            <input type='text' className='createcom' name="departmentTel" onChange={(event => this.handleChange(event))} />
                            <span className="valcreatedepartment2">{department.departmentTel == "" ? validate : " "}</span>
                            <span className="valcreatedepartment2">{this.state.validateTelno}</span>
                        </div>
                    </div>
                    <div className="createdepartment-footer">
                        <button type="submit" className="confirm-create" onClick={(e) => this.handleSubmit(e)}>Create New Department</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateDepartment 