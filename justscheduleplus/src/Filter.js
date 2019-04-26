import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Schedule from './Schedule';
import './Popup.css';
import { Container, Row, Col } from 'react-grid-system';
import error from './Images/error.png';
import { relative } from 'path';
import Timepicker from './Timepicker';
import TextField from '@material-ui/core/TextField';


class Filter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showElement: false,
      i: 0,
      periods: [],
      period: { periodName: "", periodOne: "00:00", periodTwo: "00:00" }
    }
  }
  onClose = (e) => {
    if (this.props.onClose != undefined) {
      this.props.onClose(e)
    }
    // this.props.onClose && this.props.onClose(e);
  }
  componentDidMount() {
    console.log(this.state.i)
    console.log(this.state.period)
  }
  disablePeriod = () => {
    var lenght = this.state.periods.length
    if (lenght == 4) {
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
    this.state.periods.splice(key, 1)
    this.forceUpdate()
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const periods = this.state.periods
    const period = this.state.period
    periods.push(period)
    this.setState({
      period:{ periodName: "", periodOne: "00:00", periodTwo: "00:00",
      periods }
    })
    console.log('state', this.state.periods)
    
  }

  handleChange = (event) => {
    event.preventDefault()
    let { period } = this.state
    period[event.target.name] = event.target.value
    this.setState({ period })
    
    // this.setState({period.[event.target.name]: event.target.value})
  }

  onAfterInsertRow = () => {
    console.log(this.state.periodName + "....." + this.state.periodOne)
    console.log(this.state.i)
    const Url = 'http://localhost:8080/period';

    const othepram = {
      headers: {
        "content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        periodName: this.state.periodName,
        periodOne: this.state.periodOne,
        periodTwo: this.state.periodTwo
      }),
      method: "POST"
    };
    fetch(Url, othepram)
      .then(data => { return data.json() })
      .then(res => { console.log(res) })
      .catch(error => console.log(error))
  }


  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className='popup'>
        <div className='popup_inner'>
          {/* {
          returnDB !== null ? () : ()
        } */}
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
                <form onSubmit={(e) => { this.handleSubmit(e) }}>
                  <div style={{ display: 'flex' }}>
                    <input type="text" placeholder="periodName"  name="periodName" value={this.state.period.periodName} onChange={(event => this.handleChange(event))} style={{ marginTop: 20, width: 150 }} ></input>
                    <TextField id="time" name="periodOne" type="time" value={this.state.period.periodOne} // className={textField}
                      onChange={(event => this.handleChange(event))}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                    <span style={{ marginLeft: 10 }}> - </span>
                    <TextField id="time" name="periodTwo" type="time" value={this.state.period.periodTwo} // className={textField}
                      onChange={(event => this.handleChange(event))}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                    <input style={{ width: 60, height: 30 }} className="btn btn-primary" type="submit" value="Submit" disabled={this.disablePeriod()} />
                  </div>
                </form>
                 {/* {this.state.periods.map((event) => {return <div>{}</div> })} */}
                {this.state.periods.map((event, key) => {
                  return <div style={{ display: "flex" }}>{event.periodName+event.periodOne+event.periodTwo}
                    <img src={error} style={{ width: 15, height: 15, marginLeft: 15, marginTop: 30 }} onClick={() => this.remove(key)}></img>
                  </div>
                })}
                 <input style={{ marginLeft: 280, position: "fixed", top: 580 }} className="btn btn-primary" onClick={() => this.onAfterInsertRow()} type="submit" value="Submit" />
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





