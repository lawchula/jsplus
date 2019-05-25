import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Schedule from './Schedule';
import './Popup.css';
import { Container, Row, Col } from 'react-grid-system';
import error from './Images/error.png';
import { Button, Table, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import InputColor from 'react-input-color';


class Filter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showPeriod: [],
      showElement: false,
      i: 0,
      periods: [],
      period: { periodName: "", periodOne: "00:00", periodTwo: "00:00", color: "#ffffff" },
      setcolor: " ",
      edit: false,
      DeletPeriod: []
    }
  }

  componentDidMount() {
    this.getPeriods();
  }

  onClose = (e) => {
    if (this.props.onClose != undefined) {
      this.props.onClose(e)
    }
  }

  getPeriods = () => {
    fetch('http://localhost:8080/showperiod')
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        this.setState({ showPeriod: myJson })
      });
  }

  disablePeriod = () => {
    var lenght = this.state.periods.length + this.state.showPeriod.length
    if (lenght == 4) {
      return true
    } else {
      return false
    }
  }

  remove = (key) => {
    this.state.periods.splice(key, 1)
    this.forceUpdate()
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const periods = this.state.periods
    const period = this.state.period
    periods.push(period)
    this.setState({
      period: {
        periodName: "", periodOne: "00:00", periodTwo: "00:00", color: period.color
      }
    })
    console.log('state', this.state.periods)
  }

  handleChange = (event) => {
    event.preventDefault()
    let { period } = this.state
    period[event.target.name] = event.target.value
    this.setState({ period })
  }

  changeColor = async (color) => {
    var setcolor = color.hex
    this.state.period["color"] = setcolor
  }

  onAfterInsertRow = () => {
    const Url = 'http://localhost:8080/period';
    const othepram = {
      headers: {
        "content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        period: this.state.periods
      }),
      method: "POST"
    };
    fetch(Url, othepram)
      .then(res => { 
        this.setState({ periods: [] })
        this.getPeriods();
      })
      .catch(error => console.log(error))
  }

  DeletePeriodFromDB = (event) => {
    const Url = 'http://localhost:8080/deleteperiod';
    console.log(event)

    const othepram = {
        headers: {
            "content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            DeletePeriod: event
        }),
        method: "POST"
    };
    fetch(Url, othepram)
        .then(data => { return data.json() })
        .then(res => { 
          let periods = this.state.showPeriod.filter(period => {
            return period.Period_ID != event.Period_ID;
          });
          this.setState({ showPeriod: periods })
        })
        .catch(error => console.log(error))
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    const { showPeriod } = this.state

    return (
      <div className='popup'>
        <div className='popup_inner'>
          {/* {
          returnDB !== null ? () : ()
        } */}
          <Container>
            <Row>
              <Col md={11} style={{ backgroundColor: "#F5F5F5", color: "#E37222", height: 40,fontWeight:"bold" }}>
                <p style={{ marginTop: 5, fontSize: 20 }}>FILTER</p>
              </Col>
              <Col md={1} style={{ backgroundColor: "#F5F5F5" }}>
                <img src={error} style={{ width: 25, height: 25, marginTop: 10 }} onClick={(e) => { this.onClose(e) }}></img>
              </Col>
            </Row>

            <Row>

              <Col md={12} className="Period">
                <form onSubmit={(e) => { this.handleSubmit(e) }}>
                  {/* <p style={{color:"white",marginLeft:100,marginBottom:-5,marginTop:10}}>Period name</p> */}
                  <div style={{ display: 'flex', marginTop: 20, marginLeft:100 }}>

                    <input className="InputPeriod" type="text" name="periodName" placeholder="period name" value={this.state.period.periodName} onChange={(event => this.handleChange(event))}></input>

                    <TextField style={{ marginTop: 0, marginLeft: 10, width: 110, height: 30, backgroundColor: "white", borderRadius:5 }}
                      id="time" name="periodOne" type="time" value={this.state.period.periodOne}
                      onChange={(event => this.handleChange(event))}
                      variant="outlined"
                      InputProps={{
                        shrink: true,
                        style: { height: 30, width: 110 }
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />

                    <span style={{ marginLeft: 5, marginTop: 0, color:"white" }}> - </span>

                    <TextField style={{ marginTop: 0, marginLeft: 5, width: 110, height: 30, backgroundColor: "white",borderRadius:5}}
                      id="time" name="periodTwo" type="time" value={this.state.period.periodTwo}
                      onChange={(event => this.handleChange(event))}
                      variant="outlined"
                      InputProps={{
                        shrink: true,
                        style: { height: 30, width: 110 }
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />

                    <InputColor initialHexColor={this.state.period.color} onChange={this.changeColor} style={{ marginTop: 0, marginLeft: 20}} />

                    <input style={{ width: 60, height: 40, marginTop: -5, marginLeft: 20}} className="btn btn-primary" type="submit" value="Add" disabled={this.disablePeriod()} />
                  </div>
                </form>

                <Table responsive style={{ marginTop: 30, tableLayout: "fixed", border: 0, width:650,margin:"auto" }}>
                  <thead style={{ backgroundColor: "#07889b", color: "white", height: 200 }}>
                    <tr>
                      <td scope="col" style={{ fontSize: 14,fontWeight:"bold"  }}>Period Name</td>
                      <td scope="col" style={{ fontSize: 14,fontWeight:"bold" }}>Start</td>
                      <td scope="col" style={{ fontSize: 14,fontWeight:"bold" }}>End</td>
                      <td scope="col" style={{ fontSize: 14,fontWeight:"bold" }}>color</td>
                      <td scope="col" style={{ fontSize: 14,fontWeight:"bold"}}>remove</td>
                    </tr>
                  </thead>
                  <tbody style={{ backgroundColor: "#E37222", color: "white" }}>

                    {showPeriod.map(event => {
                      return <tr>
                        <td style={{ fontSize: 14,fontWeight:"bold" }}>{event.Period_Name}</td>
                        <td style={{ fontSize: 14,fontWeight:"bold"  }}> {event.Period_Time_One + " น."}</td>
                        <td style={{ fontSize: 14,fontWeight:"bold"  }}>{event.Period_Time_Two + " น."}</td>
                        <td>
                        <div style={{ width: 20, height: 20, marginBottom: 20, backgroundColor: event.Period_Color, borderRadius: 25 }}> </div></td>
                        <td>
                          <img src={error} style={{ width: 15, height: 15, marginTop: 0, marginLeft: 15 }} onClick={() => this.DeletePeriodFromDB(event)}></img>
                        </td>
                      </tr>
                    })}

                    {this.state.periods.map((event, key) => {
                      return <tr style={{backgroundColor:"#eeaa7b"}}>
                        <td style={{ fontSize: 14,fontWeight:"bold" }}>{event.periodName}</td>
                        <td style={{ fontSize: 14,fontWeight:"bold" }}>{event.periodOne + " น."}</td>
                        <td style={{ fontSize: 14,fontWeight:"bold" }}>{event.periodTwo + " น."}</td>
                        <td>
                          <div style={{ width: 20, height: 20, marginBottom: 20, backgroundColor: event.color, borderRadius: 25 }}> </div>
                        </td>
                        <td>
                          <img src={error} style={{ width: 15, height: 15, marginTop: 0, marginLeft: 15 }}
                            onClick={() => this.remove(key)}></img>
                        </td>
                      </tr>
                    })}
                  </tbody>
                </Table>
                <input style={{ marginLeft: 600 ,position:"static",marginBottom:10,marginTop:10 }} className="btn btn-primary" onClick={() => this.onAfterInsertRow()} type="submit" value="Submit" />
              </Col>
              {/* <Col md={0} style={{ backgroundColor: "#07889B", height: 372 }}>
                <p style={{ marginTop: 70, color: "white" }} className="Advice">JS+</p>
                <p className="Advice2" >Create your own period time for work schedule</p>
              </Col> */}

            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Filter;





