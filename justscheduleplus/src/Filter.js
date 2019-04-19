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
      period: [],
      periodName: '',
      periodOne: '',
      periodTwo: '',
      formValues: {}
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
        <input type="text" placeholder="Period Name" name='Period Name' value={this.state.formValues["Period Name"]} onChange={this.handleChange.bind(this)} style={{ marginTop: 20, width: 150 }} ></input>
        <input type="text" placeholder="Period Time" name='Period Time' value={this.state.formValues["Period Time"]} onChange={this.handleChange.bind(this)} style={{ width: 60, marginLeft: 20 }}></input>
        <span style={{ marginLeft: 10 }}> - </span>
        <input type="text" placeholder="Period Time" name='Period Time2' value={this.state.formValues["Period Time2"]} onChange={this.handleChange.bind(this)} style={{ width: 60, marginLeft: 10 }}></input>
      </div>
    )
    return this.setState({ period: this.state.period.concat(periods) })
  }

  disablePeriod = () => {
    var lenght = this.state.period.length
    if (lenght == 5) {
      return true
    } else {
      return false
    }
  }
  remove = (key) => {
    console.log(key)
    // this.setState({
    //   period : this.state.period.splice(key,1)
    // })
    this.state.period.splice(key, 1)
    this.forceUpdate()
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.state.formValues);
  }

  handleChange = (event) => {
    event.preventDefault();
    let formValues = this.state.formValues;
    let name = event.target.name;
    let value = event.target.value;

    formValues[name] = value;

    this.setState({ formValues })
  }

  // onAfterInsertRow = (addPeriod) => {
  //   console.log(addPeriod)
  //   const Url='http://localhost:8080/period';

  //   const othepram={
  //     headers:{
  //       "content-type":"application/json; charset=UTF-8"
  //     },
  //     body: JSON.stringify(addPeriod),
  //     method:"POST"
  //   };
  //   fetch(Url,othepram)
  //   .then(data=>{return data.json()})
  //   .then(res=>{console.log(res)})
  //   .catch(error=>console.log(error))
  // }


  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className='popup'>
        <div className='popup_inner'>
          <Container>
            <Row>
              <Col md={11} style={{ backgroundColor: "white" }}>
                <p style={{ marginTop: 5, fontSize: 20 }}>Filter</p>
              </Col>
              <Col md={1} style={{ backgroundColor: "white" }}>
                <img src={error} style={{ width: 25, height: 25, marginTop: 10 }} onClick={(e) => { this.onClose(e) }}></img>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="Period">
                <button className="Addbutton" onClick={this.addPeriod} disabled={this.disablePeriod()}>Add+</button>
                <form method='POST' onSubmit={this.handleSubmit.bind(this)}>
                  <div>
                    <input type="text" placeholder="Period Name" name='Period Name' value={this.state.formValues["Period Name"]} onChange={this.handleChange.bind(this)} style={{ marginTop: 20, width: 150 }} ></input>
                    <input type="text" placeholder="Period Time" name='Period Time' value={this.state.formValues["Period Time"]} onChange={this.handleChange.bind(this)} style={{ width: 60, marginLeft: 20 }}></input>
                    <span style={{ marginLeft: 10 }}> - </span>
                    <input type="text" placeholder="Period Time" name='Period Time2' value={this.state.formValues["Period Time2"]} onChange={this.handleChange.bind(this)} style={{ width: 60, marginLeft: 10 }}></input>
                    <img src={error} style={{ width: 15, height: 15, marginLeft: 15, marginTop: 30 }} onClick={() => this.remove()}></img>
                  </div>
                  {/* {this.state.period.map((event, key) => {
                    return <div style={{ display: "flex" }}>{event}
                      <img src={error} style={{ width: 15, height: 15, marginLeft: 15, marginTop: 30 }} onClick={() => this.remove(key)}></img>
                    </div>
                  })} */}
                  <input className="btn btn-primary" type="submit" value="Submit" />
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





