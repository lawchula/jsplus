import React, { Component } from "react";
import "./Css/App.css";
import "./Css/Popup.css";
import { Container, Row, Col } from "react-grid-system";
import error from "./Images/error.png";
import { Table } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import InputColor from "react-input-color";
import { withTheme } from "@material-ui/core";
import close from './Images/error.png';
import remove from './Images/close.png';
import url from './url';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPeriod: [],
      showElement: false,
      i: 0,
      periods: [],
      period: {
        periodName: "",
        periodOne: "00:00",
        periodTwo: "00:00",
        color: "#ffffff"
      },
      setcolor: " ",
      edit: false,
      DeletPeriod: []
    };
  }

  componentDidMount() {
    this.getPeriods();
  }

  onClose = e => {
    if (this.props.onClose != undefined) {
      this.props.onClose(e);
    }
  };

  getPeriods = () => {
    var token = localStorage.getItem('tk');
    const othepram = {
      headers: {
        tkAuth: token
      },
      method: "GET"
    };

    fetch(url + "/showperiod", othepram)
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({ showPeriod: myJson });
      });
  };

  disablePeriod = () => {
    var lenght = this.state.periods.length + this.state.showPeriod.length;
    if (lenght == 4) {
      return true;
    } else {
      return false;
    }
  };

  remove = key => {
    this.state.periods.splice(key, 1);
    this.forceUpdate();
  };

  handleSubmit = event => {
    event.preventDefault();
    const periods = this.state.periods;
    const period = this.state.period;
    periods.push(period);
    this.setState({
      period: {
        periodName: "",
        periodOne: "00:00",
        periodTwo: "00:00",
        color: period.color
      }
    });
  };

  handleChange = event => {
    event.preventDefault();
    let { period } = this.state;
    period[event.target.name] = event.target.value;
    this.setState({ period });
  };

  changeColor = async color => {
    var setcolor = color.hex;
    this.state.period["color"] = setcolor;
  };

  onAfterInsertRow = () => {
    var token = localStorage.getItem('tk');
    const Url = url + "/period";
    const othepram = {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        tkAuth: token
      },
      body: JSON.stringify({
        period: this.state.periods
      }),
      method: "POST"
    };
    fetch(Url, othepram)
      .then(res => {
        this.setState({ periods: [] });
        this.getPeriods();
      })
      .catch(error => console.log(error));
  };

  DeletePeriodFromDB = event => {
    if (!window.confirm("Do you want to delete this period!!")) return;
    const Url = url + "/deleteperiod";
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
      .then(data => {
        return data.json();
      })
      .then(res => {
        let periods = this.state.showPeriod.filter(period => {
          return period.Period_ID != event.Period_ID;
        });
        this.setState({ showPeriod: periods });
        this.props.getSchedule();
      })
      .catch(error => console.log(error));
  };

  render() {
    if (!this.props.show) {
      return null;
    }

    const { showPeriod } = this.state;

    return (
      <div className="popup">
        <div className="popup_inner">
          {/* {
          returnDB !== null ? () : ()
        } */}
          <Container className="all">
            <Row>
              <Col
                className="headimg"
                md={12}
                style={{
                  color: "white",
                  height: 80,
                  fontWeight: "bold"
                }}
              >
                <p
                  className="filter-head-text"
                >
                  FILTER
                  <hr className="headline" />
                </p>
                <img src={close} onClick={(e) => this.onClose(e)} className="close-create"></img>
              </Col>
            </Row>

            <Row>
              <Col md={12} className="Period">
                <form
                  onSubmit={e => {
                    this.handleSubmit(e);
                  }}
                >
                  {/* <p style={{color:"white",marginLeft:100,marginBottom:-5,marginTop:10}}>Period name</p> */}
                  <Row style={{ marginLeft: 100 }}>
                    <div
                      className="row1"
                    >
                      <span>
                        Period name
                      </span>
                      <span style={{ marginLeft: 20 }}>Start-period</span>
                      <span style={{ marginLeft: 32.5 }}>End-period</span>
                      <span style={{ marginLeft: 43 }}>Color</span>
                    </div>
                  </Row>
                  <Row>
                    <div
                      style={{
                        display: "flex",
                        marginLeft: 100,
                        marginBottom: 20
                      }}
                    >
                      <input
                        style={{
                          borderColor: ""
                        }}
                        className="InputPeriod"
                        type="text"
                        name="periodName"
                        placeholder=""
                        value={this.state.period.periodName}
                        onChange={event => this.handleChange(event)}
                      ></input>

                      <TextField
                        style={{
                          marginTop: 0,
                          marginLeft: 10,
                          width: 110,
                          height: 30,
                          backgroundColor: "white",
                          borderColor: "#007bff",
                          borderRadius: 5
                        }}
                        id="time"
                        name="periodOne"
                        type="time"
                        value={this.state.period.periodOne}
                        onChange={event => this.handleChange(event)}
                        variant="outlined"
                        InputProps={{
                          shrink: true,
                          style: { height: 30, width: 110 }
                        }}
                        inputProps={{
                          step: 300 // 5 min
                        }}
                      />

                      <span
                        style={{
                          marginLeft: 5,
                          marginTop: 0,
                          color: "white"
                        }}
                      >
                        {" "}
                        -{" "}
                      </span>

                      <TextField
                        style={{
                          marginTop: 0,
                          marginLeft: 5,
                          width: 110,
                          height: 30,
                          backgroundColor: "white",
                          borderRadius: 5
                        }}
                        id="time"
                        name="periodTwo"
                        type="time"
                        value={this.state.period.periodTwo}
                        onChange={event => this.handleChange(event)}
                        variant="outlined"
                        InputProps={{
                          shrink: true,
                          style: { height: 30, width: 110 }
                        }}
                        inputProps={{
                          step: 300 // 5 min
                        }}
                      />

                      <InputColor
                        initialHexColor={this.state.period.color}
                        onChange={this.changeColor}
                        style={{
                          marginTop: -5,
                          marginLeft: 20,
                          borderRadius: 50,
                          height: 35,
                          width: 35
                        }}
                      />

                      <input
                        className="add"
                        type="submit"
                        value="Add"
                        disabled={this.disablePeriod()}
                      />
                    </div>
                  </Row>
                </form>

                <Table
                  responsive
                  style={{
                    marginTop: 30,
                    tableLayout: "fixed",
                    border: 0,
                    width: 650,
                    margin: "auto"
                  }}
                >
                  <thead
                    style={{
                      backgroundColor: "#07889b",
                      color: "white",
                      height: 200
                    }}
                  >
                    <tr>
                      <td
                        className="td1"
                        scope="col"
                        style={{ fontSize: 14, fontWeight: "bold" }}
                      >
                        Period Name
                      </td>
                      <td
                        className="td1"
                        scope="col"
                        style={{ fontSize: 14, fontWeight: "bold" }}
                      >
                        Start
                      </td>
                      <td
                        className="td1"
                        scope="col"
                        style={{ fontSize: 14, fontWeight: "bold" }}
                      >
                        End
                      </td>
                      <td
                        className="td1"
                        scope="col"
                        style={{ fontSize: 14, fontWeight: "bold" }}
                      >
                        Color
                      </td>
                      <td
                        className="td1"
                        scope="col"
                        style={{ fontSize: 14, fontWeight: "bold" }}
                      >
                        Remove
                      </td>
                    </tr>
                  </thead>
                  <tbody className="tbody">
                    {showPeriod.map(event => {
                      return (
                        <tr>
                          <td
                            style={{
                              fontSize: 14,
                              fontWeight: "bold",
                              textAlign: 'center'
                            }}
                          >
                            {event.Period_Name}
                          </td>
                          <td
                            style={{
                              fontSize: 14,
                              fontWeight: "bold",
                              textAlign: 'center'
                            }}
                          >
                            {" "}
                            {event.Period_Time_One + " น."}
                          </td>
                          <td
                            style={{
                              fontSize: 14,
                              fontWeight: "bold",
                              textAlign: 'center'
                            }}
                          >
                            {event.Period_Time_Two + " น."}
                          </td>
                          <td>
                            <div
                              style={{
                                width: 20,
                                height: 20,
                                marginLeft: 40,
                                backgroundColor: event.Period_Color,
                                borderRadius: 25
                              }}
                            >
                              {" "}
                            </div>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <img
                              src={remove}
                              style={{
                                width: 15,
                                height: 15,
                                marginTop: 0,
                                marginLeft: 15,
                              }}
                              onClick={() => this.DeletePeriodFromDB(event)}
                            ></img>
                          </td>
                        </tr>
                      );
                    })}

                    {this.state.periods.map((event, key) => {
                      return (
                        <tr style={{ backgroundColor: "#808080" }}>
                          <td
                            style={{
                              fontSize: 14,
                              fontWeight: "bold",
                              textAlign: "center"
                            }}
                          >
                            {event.periodName}
                          </td>
                          <td
                            style={{
                              fontSize: 14,
                              fontWeight: "bold",
                              textAlign: "center"
                            }}
                          >
                            {event.periodOne + " น."}
                          </td>
                          <td
                            style={{
                              fontSize: 14,
                              fontWeight: "bold",
                              textAlign: "center"
                            }}
                          >
                            {event.periodTwo + " น."}
                          </td>
                          <td>
                            <div
                              style={{
                                width: 20,
                                height: 20,
                                marginBottom: 20,
                                backgroundColor: event.color,
                                borderRadius: 25,
                                marginLeft: 42
                              }}
                            >
                              {" "}
                            </div>
                          </td>
                          <td>
                            <img
                              src={remove}
                              style={{
                                width: 15,
                                height: 15,
                                marginTop: 0,
                                marginLeft: 55
                              }}
                              onClick={() => this.remove(key)}
                            ></img>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <input
                  className="submit"
                  onClick={() => this.onAfterInsertRow()}
                  type="submit"
                  value="Submit"
                />
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
