import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Schedule from './Schedule';
import './Popup.css';
import { Container, Row, Col } from 'react-grid-system';
import error from './Images/error.png';
import { relative } from 'path';




class Filter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showElement: false,
      period: [
      <div>
      <input type="text" placeholder="Period Name" style={{ marginTop: 20, width: 150 }}  name='periodName' onChange={this.handleChange} ></input> 
      <input type="text" placeholder="Period Time" style={{ width: 60, marginLeft: 20 }} name='periodOne' onChange={this.handleChange} ></input> 
      <span style={{ marginLeft: 10 }}> - </span> 
      <input type="text" placeholder="Period Time" style={{ width: 60, marginLeft: 10, }} name='periodTwo' onChange={this.handleChange} ></input>
      </div>
      ],
      periodName: '',
      periodOne : '',
      periodTwo: ''
    }
  }
  onClose = (e) => {
    if (this.props.onClose != undefined) {
      this.props.onClose(e)
    }
    // this.props.onClose && this.props.onClose(e);
  }


  addPeriod = () => {
    var periods = (
      <div> 
      <input type="text" placeholder="Period Name" style={{ marginTop: 20, width: 150 }} ></input> 
      <input type="text" placeholder="Period Time" style={{ width: 60, marginLeft: 20 }}></input> 
      <span style={{ marginLeft: 10 }}> - </span> 
      <input type="text" placeholder="Period Time" style={{ width: 60, marginLeft: 10 }}></input>
      </div>
    )
    return this.setState({ period: this.state.period.concat(periods) })
  }
  
  disablePeriod = () => {
   var lenght = this.state.period.length
   if(lenght == 5){
     return true
   }else{
     return false
   }
  }
  remove = (key) =>{
    console.log(key)
    // this.setState({
    //   period : this.state.period.splice(key,1)
    // })
    this.state.period.splice(key,1)
    this.forceUpdate()
  }
  
  handleSubmit = (event) => {
      event.preventDefault()
  }

  handleChange = (event) => {
    event.preventDefault()
}



  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className='popup'>
        <div className='popup_inner'>
          <Container>
            <Row>
              <Col md={11} style={{ backgroundColor:"white"}}>
                <p style={{ marginTop: 5, fontSize: 20 }}>Filter</p>
              </Col>
              <Col md={1} style={{ backgroundColor:"white"}}>
                <img src={error} style={{ width: 25, height: 25, marginTop: 10 }} onClick={(e) => { this.onClose(e) }}></img>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="Period">
                <button className="Addbutton" onClick={this.addPeriod} disabled={this.disablePeriod()}>Add+</button>
                <form method='POST' onSubmit={this.handleSubmit}>
                {this.state.period.map((event,key) => { return <div style={{ display:"flex"}}>{event}
                  <img src={error} style={{ width: 15, height: 15, marginLeft:15, marginTop:30}} onClick={() => this.remove(key)}></img>
                  </div>
                 })}  
                 <button style={{ marginLeft:285,position:"absolute", top: 320 }}>Submit</button>
                </form>
              </Col>
              <Col md={6} style={{ backgroundColor: "#07889B", height: 372 }}>
                <p style={{ marginTop: 70, color: "white" }} className="Advice">JS+</p>
                <p className="Advice2" >Create your own period time for work schedule</p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Filter;





