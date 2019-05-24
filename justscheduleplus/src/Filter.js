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
      edit: false
    }
  }

  componentDidMount() {

    fetch('http://localhost:8080/showperiod')
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        this.setState({ showPeriod: myJson })
      });
  }

  onClose = (e) => {
    if (this.props.onClose != undefined) {
      this.props.onClose(e)
    }
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

  // clickEdit = () => {
  //   this.setState({ edit: true })
  // }

  // fianishEdit = () => {
  //   this.setState({ edit: false })
  // }

  onAfterInsertRow = () => {
    const Url = 'http://localhost:8080/period';
    console.log(this.state.periods)
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
              <Col md={11} style={{ backgroundColor: "white", color: "#E37222", height: "auto" }}>
                <p style={{ marginTop: 5, fontSize: 20 }}>Filter</p>
              </Col>
              <Col md={1} style={{ backgroundColor: "white" }}>
                <img src={error} style={{ width: 25, height: 25, marginTop: 10 }} onClick={(e) => { this.onClose(e) }}></img>
              </Col>
            </Row>

            <Row>

              <Col md={7} className="Period">
                <form onSubmit={(e) => { this.handleSubmit(e) }}>
                  <p>Period name</p>
                  <div style={{ display: 'flex', marginTop: 3 }}>

                    <input className="InputPeriod" type="text" name="periodName" value={this.state.period.periodName} onChange={(event => this.handleChange(event))}></input>

                    <TextField style={{ marginTop: 10, marginLeft: 5, width: 110, height: 30, backgroundColor: "white", borderRadius: 25 }}
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

                    <span style={{ marginLeft: 5, marginTop: 20 }}> - </span>

                    <TextField style={{ marginTop: 20, marginLeft: 5, width: 110, height: 30, backgroundColor: "white", borderRadius: 25 }}
                      id="time" name="periodTwo" type="time" value={this.state.period.periodTwo}
                      onChange={(event => this.handleChange(event))}
                      variant="standard"
                      InputProps={{
                        shrink: true,
                        style: { height: 30, width: 110 }
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />

                    <InputColor initialHexColor={this.state.period.color} onChange={this.changeColor} style={{ marginTop: 22, marginLeft: 10 }} />

                    <input style={{ width: 60, height: 40, marginTop: 10, marginLeft: 30 }} className="btn btn-primary" type="submit" value="Add" disabled={this.disablePeriod()} />
                  </div>
                </form>

                <Table responsive style={{ marginTop: 10, tableLayout: "fixed", border: 0 }}>
                  <thead style={{ backgroundColor: "#E37222", color: "white", height: 200 }}>
                    <tr>
                      <td scope="col" style={{ fontSize: 12 }}>Period Name</td>
                      <td scope="col" style={{ fontSize: 12 }}>Start</td>
                      <td scope="col" style={{ fontSize: 12 }}>End</td>
                      <td scope="col" style={{ fontSize: 12, }}>color</td>
                      <td scope="col" style={{ fontSize: 12, }}>remove</td>
                    </tr>
                  </thead>
                  <tbody style={{ backgroundColor: "#07889B", color: "white" }}>

                    {showPeriod.map(event => {
                      return <tr>
                        <td>{event.Period_Name}</td>
                        <td>{event.Period_Time_One}</td>
                        <td>{event.Period_Time_Two}</td>
                        <td>
                        <div style={{ width: 30, height: 30, marginBottom: 20, backgroundColor: event.Period_Color, borderRadius: 25 }}> </div></td>
                        <td>
                          <img src={error} style={{ width: 15, height: 15, marginTop: 0, marginLeft: 15 }}></img>
                        </td>
                      </tr>
                    })}

                    {this.state.periods.map((event, key) => {
                      return <tr>
                        <td>{event.periodName}</td>
                        <td>{event.periodOne}</td>
                        <td>{event.periodTwo}</td>
                        <td>{event.color}</td>
                        <td>
                          <div style={{ width: 30, height: 30, marginBottom: 20, backgroundColor: event.color, borderRadius: 25 }}> </div>
                        </td>
                        <td>
                          <img src={error} style={{ width: 15, height: 15, marginTop: 0, marginLeft: 15 }}
                            onClick={() => this.remove(key)}></img>
                          <button onClick={this.clickEdit}>edit</button>
                        </td>
                      </tr>
                    })}
                  </tbody>
                </Table>
                <input style={{ marginLeft: 280 }} className="btn btn-primary" onClick={() => this.onAfterInsertRow()} type="submit" value="Submit" />
              </Col>

              <Col md={5} style={{ backgroundColor: "#07889B", height: 372 }}>
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





