import React, { Component } from 'react';
import close from './Images/error.png';
import './Css/CreateDepartment.css';
import * as firebase from 'firebase';
import ApiKeys from './ApiKeys';

class CreateDepartment extends Component{

    constructor(props){
        super(props)
        this.state={
            department: {departmentName:'',departmentTel:''},
            //ส่งค่าไป firebase
            departmentImages: null,
            //รับค่าจาก firebase
            departmentImage:'',
            imgName:'',
            validate:''
        }

        if(!firebase.apps.length){
            firebase.initializeApp(ApiKeys.FirebaseConfig)
        }

    }


    onClose = (e) => {
        if (this.props.onClose !== undefined) {
          this.props.onClose(e)
        }
      }


      fileSelectedHandler = (event) =>{
        this.setState({
            departmentImages: URL.createObjectURL(event.target.files[0]),
            imgName: event.target.files[0].name
        })
     }


     uploadImages = async (event,imgname) =>{
        const response = await fetch(event);
        const blob = await response.blob();

        var ref = firebase.storage().ref().child('Department Images/' + imgname);
        return ref.put(blob)
        console.log('success')
      }


      confirmUploadImage = () => {
        this.uploadImages(this.state.departmentImages,this.state.imgName)
        .then(() => {
                console.log('Upload Success !!')
                console.log('name'+this.state.imgName)
            //get url ของรูปมาถ้า Upload สำเร็จ (ต้องเอา url ของรูปมาเก็บใน state แล้วนำมา show **ตอนนี้ยังไม่ได้ทำ)
            firebase.storage().ref().child('Department Images/'+this.state.imgName).getDownloadURL()
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


      handleChange = (event) => {
        event.preventDefault()
        let {department} = this.state
        department[event.target.name] = event.target.value
        this.setState({department})
        console.log(this.state.department)
    }


    handleSubmit = (event) => {
        event.preventDefault()
        let {department,validate} = this.state
        // console.log(company.companyName + company.companyEmail + company.companyTel)
        if(department.departmentName == "" || department.departmentTel == ""){
          this.setState({validate: 'This field is requried'})
        }else{
            const Url = 'http://localhost:8080/company/insert';
            const othepram = {
                headers: {
                    "content-type": "application/json; charset=UTF-8"
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
                })
                .catch(error => console.log(error))
        }
         console.log(validate)
    }

    render(){
        if(!this.props.show) {
            return null;
          }
          const {departmentImages,imgName,departmentImage,department,validate} = this.state
        return(
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
                            <span className="selectedfile">{departmentImages == null ? 'no file selected' : imgName}</span>
                            <div style={{display:'flex'}}>
                                <label htmlFor="upload-photo"  className="upload-picture">Browse...</label>
                                <input type="file" name="photo" id="upload-photo"  onChange={this.fileSelectedHandler}/>
                                <button className="upload-picture" onClick={this.confirmUploadImage}>Upload</button>
                            </div>
                        </div>
                        <div className="right-content">
                            <span id='comname'>Department Name</span>
                            <input type='text' className='createcom' name="departmentName"  onChange={(event => this.handleChange(event))}/>
                            <span className="comp-validate">{department.departmentName == "" ? validate : " "}</span>
                            <br></br>
                            <span id='tel'>Telephone</span>
                            <input type='text' className='createcom' name="departmentTel"  onChange={(event => this.handleChange(event))}/>
                            <span  className="comp-validate">{department.departmentTel == "" ? validate : " "}</span>
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