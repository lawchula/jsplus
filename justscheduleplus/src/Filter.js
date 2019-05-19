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
      period: { periodName: "", periodOne: "00:00", periodTwo: "00:00",color:"#ffffff" },
      setcolor: " "
    }
  }
  onClose = (e) => {
    if (this.props.onClose != undefined) {
      this.props.onClose(e)
    }
    // this.props.onClose && this.props.onClose(e);
  }

  componentDidMount() {
    // console.log(this.state.i)
    // console.log(this.state.period)

    fetch('http://localhost:8080/addperiod')
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        // console.log(myJson)
        this.setState({ showPeriod: myJson })
        // console.log("Period", this.state.showPeriod)
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
    // console.log(key)
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
      period: {
        periodName: "", periodOne: "00:00", periodTwo: "00:00",color: period.color
        //periods
      }
    })
     console.log('state', this.state.periods)
  }

  handleChange = (event) => {
    event.preventDefault()
    let { period } = this.state
    let {setcolor} = this.state
    period[event.target.name] = event.target.value
    this.setState({ period })
    // this.setState({period.[event.target.name]: event.target.value})
  }

  changeColor = (color) => {
    var setcolor = color.hex
    this.state.period["color"] = setcolor
    color = "#ffffff"
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
      .then(data => { return data.json() })
      .then(res => { console.log(res) })
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
                  <div style={{ display: 'flex', marginTop: 22 }}>
                    <input className="InputPeriod" type="text" placeholder="periodName" name="periodName" value={this.state.period.periodName} onChange={(event => this.handleChange(event))} style={{ marginTop: 20, width: 150 }} ></input>
                    <TextField style={{ marginTop: 20, marginLeft: 5, width: 300, height: 30, backgroundColor: "white" }} id="time" name="periodOne" type="time" value={this.state.period.periodOne} // className={textField}
                      onChange={(event => this.handleChange(event))}
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                    <span style={{ marginLeft: 5, marginTop: 20 }}> - </span>
                    <TextField style={{ marginTop: 20, marginLeft: 5, width: 300, height: 30, backgroundColor: "white" }} id="time" name="periodTwo" type="time" value={this.state.period.periodTwo} // className={textField}
                      onChange={(event => this.handleChange(event))}
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                    {/* <input
                      type="color"
                      value={this.state.period.color}
                      onChange={event => this.handleChange(event)}
                      name="color"
                    /> */}
                    <InputColor initialHexColor={this.state.period.color} onChange={this.changeColor} />
                    <input style={{ width: 60, height: 40, marginTop: 5, marginLeft: 5 }} className="btn btn-primary" type="submit" value="Add" disabled={this.disablePeriod()} />
                  </div>
                </form>
                {/* {this.state.periods.map((event) => {return <div>{}</div> })} */}
                <Table responsive style={{ marginTop: 10, tableLayout: "fixed" }}>
                  <thead style={{ backgroundColor: "#E37222", color: "white", height: 200 }}>
                    <tr>
                      <th scope="col">Period Name</th>
                      <th scope="col">Start</th>
                      <th scope="col">End</th>
                      <th scope="col">color</th>
                      <th scope="col">Edit</th>
                    </tr>
                  </thead>
                  <tbody style={{ backgroundColor: "#07889B", color: "white" }}>
                    {/* {showPeriod.length >= 0 ? ( this.state.showPeriod.map(event => {return <div>{event.Period_Name + event.Period_Time_One + event.Period_Time_Two} </div> })) : ("fail")} */}
                    {showPeriod.map(event => {
                      return <tr><td>{event.Period_Name}</td> <td> {event.Period_Time_One}</td> <td>{event.Period_Time_Two}</td><td><img src={error} style={{ width: 15, height: 15, marginTop: 0, marginLeft: 15 }}></img></td></tr>
                    })}
                    {this.state.periods.map((event, key) => {
                      return <tr>
                        <td>
                          {event.periodName}
                        </td>
                        <td>
                          {event.periodOne}
                        </td>
                        <td>
                          {event.periodTwo}
                        </td>
                        <td> 
                          <div
                          style={{
                            width: 50,
                            height: 50,
                            marginBottom: 20,
                            backgroundColor: event.color
                          }}
                        >
                        </div>
                        </td>
                        <td>
                          <img src={error} style={{ width: 15, height: 15, marginTop: 0, marginLeft: 15 }}
                            onClick={() => this.remove(key)}></img>
                        </td>
                      </tr>
                    })}
                  </tbody>
                </Table>
                <input style={{ marginLeft: 280, position: "absolute" }} className="btn btn-primary" onClick={() => this.onAfterInsertRow()} type="submit" value="Submit" />
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





