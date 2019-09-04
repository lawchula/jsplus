import React, { Component } from 'react';
import './Css/CreateCompany.css';
import close from './Images/error.png';
import * as firebase from 'firebase';
import ApiKeys from './ApiKeys';

class CreateCompany extends Component {

    constructor(props){
        super(props);
        this.state = {
            company: {companyName:'',companyEmail:'',companyTel:''},
            //ใช้ตอนรับค่ามาจาก firebase
            companyImage:'',
            //ใช้ตอนอัพโหลดไป firebase
            companyImages: null,
            imageName: '',
            validate: '',
            test:''
            
        };

        if(!firebase.apps.length){
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
          let {company} = this.state
          company[event.target.name] = event.target.value
          this.setState({company})
          console.log(this.state.company)
      }

      handleSubmit = (event) => {
        event.preventDefault()
        let {company,validate} = this.state
        // console.log(company.companyName + company.companyEmail + company.companyTel)
        if(company.companyName == "" || company.companyEmail == "" || company.companyTel == ""){
          this.setState({validate: 'This field is requried'})
        }else{
            const Url = 'http://localhost:8080/company/insert';
            const othepram = {
                headers: {
                    "content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    createcompany: this.state.company,
                    companypicture: this.state.companyImage
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
      
      // เอา url ของรูปจากเครื่องมา
      fileSelectedHandler = (event) =>{
         this.setState({
             companyImages: URL.createObjectURL(event.target.files[0]),
             imageName: event.target.files[0].name
         })
    
      }

      //upload image โดยใช้ firebase
      uploadImages = async (event,imgname) =>{
        const response = await fetch(event);
        const blob = await response.blob();

        var ref = firebase.storage().ref().child('images/' + imgname);
        return ref.put(blob)
        console.log('success')
      }

      //เรียกใช้ uploadImages เอา companyImages ใส่ใน parameter
      confirmUploadImage = () => {
        this.uploadImages(this.state.companyImages,this.state.imageName)
        .then(() => {
                console.log('Upload Success !!')
                console.log('name'+this.state.imageName)
            //get url ของรูปมาถ้า Upload สำเร็จ (ต้องเอา url ของรูปมาเก็บใน state แล้วนำมา show **ตอนนี้ยังไม่ได้ทำ)
            firebase.storage().ref().child('images/'+this.state.imageName).getDownloadURL()
            .then((imageURL) => {
                this.setState({
                    companyImage: imageURL
                })
                console.log(imageURL)
                console.log("from state = " + this.state.companyImage)
            })
        })
        .catch((error) => {
            console.log("Fail to upload" + error);
        })
      }

     
    
    render(){
        if(!this.props.show) {
            return null;
          }

          const {company,companyImages,imageName,validate,companyImage} = this.state
        return(
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
                            <span className="selectedfile">{companyImages == null ? 'no file selected' : imageName}</span>
                            <div style={{display:'flex'}}>
                                <label htmlFor="upload-photo"  className="upload-picture">Browse...</label>
                                <input type="file" name="photo" id="upload-photo"  onChange={this.fileSelectedHandler}/>
                                <button className="upload-picture" onClick={this.confirmUploadImage}>Upload</button>
                            </div>
                        </div>
                        <div className='right-content'>
                            <span id='comname'>Company Name</span>
                            <input type='text' className='createcom' name="companyName" value={company.companyName || ''} onChange={(event => this.handleChange(event))}/>
                            <span className="comp-validate">{company.companyName == "" ? validate : " "}</span>
                            <br></br>
                            <span id='email'>Email</span>
                            <input type='email' className='createcom' name="companyEmail" value={company.companyEmail || ''}  onChange={(event => this.handleChange(event))}/>
                            <span  className="comp-validate">{company.companyEmail == "" ? validate : " "}</span>
                            <br></br>
                            <span id='tel'>Telephone</span>
                            <input type='text' className='createcom' name="companyTel" value={company.companyTel || ''} onChange={(event => this.handleChange(event))}/>
                            <span  className="comp-validate">{company.companyTel == "" ? validate : " "}</span>
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