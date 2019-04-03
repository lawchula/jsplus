import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Schedule from './Schedule';
import './Popup.css';
import { Container, Row, Col } from 'react-grid-system';
import error from './Images/error.png';


class Filter extends Component {

  constructor(props) {
    super(props)
  }
  onClose = (e) => {
    if (this.props.onClose != undefined) {
      this.props.onClose(e);
    }
    // this.props.onClose && this.props.onClose(e);
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
              <Col md={11}>
              <h1>Filter</h1>
              </Col>
              <Col md={1}>
              <img src={error} style={{width:35,height:35,marginTop:10}} onClick={(e) => { this.onClose(e) }}></img>
              </Col>
            </Row>
            <Row>
            <Col md={6} style={{backgroundColor: "#66B9BF", height:355}}>
          <button className="Addbutton">Add+</button>
          <input type="text" placeholder="Period Name" style={{ marginTop: 20, width: 150 }}></input>
          <input type="text" placeholder="Period Time" style={{ width: 60, marginLeft: 20 }}></input>
          <span style={{ marginLeft: 10 }}> - </span>
          <input type="text" placeholder="Period Time" style={{ width: 60, marginLeft: 10}}></input>
            </Col>
            <Col md={6} style={{backgroundColor:"#07889B",height:355}}> 
            <p style={{marginTop:70, color:"white"}} className="Advice">JS+</p>
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





