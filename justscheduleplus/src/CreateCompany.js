import React, { Component } from 'react';
import './Css/CreateCompany.css';
import close from './Images/error.png';
import * as firebase from 'firebase';
import ApiKeys from './ApiKeys';
import url from './url';


class CreateCompany extends Component {

    constructor(props) {
        super(props);
        this.state = {
            company: { companyName: '', companyEmail: '', companyTel: '' },
            companyImage: '',
            companyImages: null,
            imageName: '',
            validate: '',
            test: '',
            validateEmail: '',
            validateTelno: '',
            valcompanyname: ''
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(ApiKeys.FirebaseConfig)
        }
    }

    onClose = (e) => {
        if (this.props.onClose !== undefined) {
            this.props.onClose(e)
        }
    }

    handleChange = (event) => {
        event.preventDefault()
        let { company } = this.state
        company[event.target.name] = event.target.value
        this.setState({ company })
        this.setState({ validate: '', validateEmail: '', validateTelno: '', valcompanyname: '' })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        let { company } = this.state
        const validEmailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const phoneno = /^0[0-9]{8,9}$/i;

        if (company.companyName.trim() === "" || company.companyEmail.trim() === "" || company.companyTel.trim() === "") {
            this.setState({ validate: 'This field is requried' })

        } else if (!validEmailRegex.test(this.state.company.companyEmail)) {
            this.setState({
                validateEmail: "Invalid email"
            })
        } else if (!phoneno.test(this.state.company.companyTel)) {
            this.setState({
                validateTelno: "Invalid telephone numeber"
            })
        } else {
            const Url = url + '/company/insert';
            var token = localStorage.getItem('sc');
            const othepram = {
                headers: {
                    "content-type": "application/json; charset=UTF-8",
                    tkauth: token
                },
                body: JSON.stringify({
                    createcompany: this.state.company,
                    companypicture: this.state.companyImage,
                }),
                method: "POST"
            };
            fetch(Url, othepram)
                .then(res => res.json())
                .then(json => {
                    console.log(json)
                    if (json === "This company is already exists") {
                        this.setState({
                            valcompanyname: json
                        })
                    } else {
                        localStorage.setItem('tk', json.tk)
                        alert("Create Company Success")
                        window.location.href = "/Company";
                    }

                })
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

        var ref = firebase.storage().ref().child('images/' + imgname);
        return ref.put(blob)
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
        this.setState({
            imageName: name
        })
    }

    render() {
        if (!this.props.show) {
            return null;
        }
        const { company, companyImages, imageName, validate, companyImage } = this.state

        return (
            <div className="createcompany-popup">
                <div className="createcompany-popup_inner">
                    <div className="createcompany-header">
                        <img src={close} onClick={(e) => this.onClose(e)} className="close-create"></img>
                        <span>Create new company</span>
                        <hr></hr>
                    </div>
                    <div className="createcompany-content">
                        <div className='left-content'>
                            <div className="company-picture">
                                {companyImage == "" ? '' : <img className="company-picture" src={companyImage}></img>}
                            </div>
                            <span className="selectedfile">{imageName == null ? 'no file selected' : imageName}</span>
                            <div style={{ display: 'flex' }}>
                                <label htmlFor="upload-photo" className="upload-picture">Browse...</label>
                                <input type="file" name="photo" accept="image/*" id="upload-photo" onChange={this.fileSelectedHandler} />
                                {/* <button className="upload-picture" onClick={this.confirmUploadImage}>Upload</button> */}
                            </div>
                        </div>
                        <div className='right-content'>
                            <span id='comname'>Company Name</span>
                            <input type='text' className='createcom' name="companyName" value={company.companyName || ''} onChange={(event => this.handleChange(event))} />
                            <span className="comp-validate">{company.companyName == "" ? validate : " "}</span>
                            <span className="comp-validate">{this.state.valcompanyname}</span>
                            <br></br>
                            <span id='email'>Email</span>
                            <input type='email' className='createcom' name="companyEmail" value={company.companyEmail || ''} onChange={(event => this.handleChange(event))} />
                            <span className="comp-validate2">{company.companyEmail == "" ? validate : " "}</span>
                            <span className="comp-validate2">{this.state.validateEmail}</span>
                            <br></br>
                            <span id='tel'>Telephone</span>
                            <input type='text' className='createcom' name="companyTel" value={company.companyTel || ''} onChange={(event => this.handleChange(event))} />
                            <span className="comp-validate3">{company.companyTel == "" ? validate : " "}</span>
                            <span className="comp-validate3">{this.state.validateTelno}</span>
                        </div>
                    </div>
                    <div className="createcompany-footer">
                        <button type="submit" className="confirm-create" onClick={(e) => this.handleSubmit(e)}>Create New Company</button>
                    </div>
                </div>
            </div>

        );
    }
}

export default CreateCompany