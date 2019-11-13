import React, { Component } from "react";
import './Css/Position.css';
import close from './Images/error.png';
import url from './url';

class Position extends Component {

  constructor(props) {
    super(props)
    this.state = {
      newposition: "",
      newpositions: [],
      positions: [],
      departmentId: null,
      check: 0,
      edituser: null,
      validate: null,
      validate2: null
    }
  }

  componentDidMount() {
    this.getPosition()
  }
  
  getPosition = () => {
    const othepram = {
      headers: {
        departid: this.props.test.Department_ID
      },
      method: "GET"
    };

    fetch(url + "/position", othepram)
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({ positions: myJson });
      });
  };

  onClose = e => {
    if (this.props.onClose != undefined) {
      this.props.onClose(e);
    }
    this.setState({
      newpositions:[]
    })
  };

  handleSubmit = (event) => {
    if (this.state.newposition.trim() == "") {
      this.setState({ validate: "Please insert position" })
    } else {
      this.state.newpositions.push(this.state.newposition)
      this.setState({ newposition: "", validate: null })
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ newposition: event.target.value })
  }


  insertPosition = () => {

    if(this.state.newpositions.length < 1){
      alert("Please add position first")
    }else{
      const Url = url + "/position/insert";
      const othepram = {
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          departid: this.props.test.Department_ID,
          position: this.state.newpositions
        }),
        method: "POST"
      };
      fetch(Url, othepram)
        .then(res => {
          this.setState({ newpositions: [] });
          alert("Insert Position Success")
          this.getPosition();
          this.props.getPosition();
        })
        .catch(error => console.log(error));
    }
  }

  editPosition = (id, Position_Name) => {
    this.setState({
      check: id,
      edituser: Position_Name
    })
  }

  cancelEdit = () => {
    this.setState({ check: 0, validate2: null })
  }

  saveEdit = (event) => {
    const Url = url + "/position/update";
    if (this.state.edituser.trim() == "") {
      this.setState({ validate2: "Please insert position" })
    } else {
      const othepram = {
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          departid: event,
          position: this.state.edituser
        }),
        method: "POST"
      };
      fetch(Url, othepram)
        .then(res => {
          this.setState({ edituser: null, validate: null });
          this.cancelEdit();
          this.getPosition();
        })
        .catch(error => console.log(error));
    }
  }

  changePosition = (event) => {
    this.setState({ edituser: event.target.value })
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    const { newposition, newpositions, positions, check } = this.state

    return (
      <div className="position-popup">
        <div className="position-popup_inner">
          <div className="position-header">
            <span>Create Position</span>
            <img src={close} onClick={(e) => this.onClose(e)} className="close-create"></img>
          </div>
          <div className="position-content">
            <span style={{color:'red',fontWeight:'bold',fontSize:13,marginLeft:20}}>** Every department must have 1 manager</span>
            <div className="add-position">
              <span>Position : </span>
              <input name="newposition" placeholder="position" value={newposition} onChange={event => this.handleChange(event)}></input>
              <button style={{ marginLeft: 7 }} onClick={this.handleSubmit} className="addp-but" >Add</button>
            </div>
            <span className="val">{this.state.validate}</span>
            <div className="test">
              {positions.map((position, key) => {
                return <div className="new-position">
                  {position.Position_ID == check ? <div style={{ display: 'flex', marginTop: 10 }}>
                    <div >
                      <span>{key + 1 + "." + " "}</span>
                      <input style={{ width: 150 }} type="text" onChange={event => this.changePosition(event)} value={this.state.edituser} />
                      <span className="val2">{this.state.validate2}</span>
                    </div>
                    <button className="addp-but3" onClick={this.cancelEdit}>Cancle</button>
                    <button className="addp-but2" onClick={() => this.saveEdit(position.Position_ID)}>Save</button>
                  </div>
                    : <div style={{ display: 'flex', marginTop: 10 }}>
                      <div style={{ width: 150 }}>
                        <span>{key + 1 + "." + " "}</span>
                        <span style={{ marginLeft: 10 }}>{position.Position_Name}</span>
                      </div>
                      <button className="addp-but2" onClick={() => this.editPosition(position.Position_ID, position.Position_Name)}>Edit</button>
                    </div>}

                </div>
              })}
              {newpositions.map((position, key) => {
                return <div style={{ display: 'flex', marginTop: 10 }}>
                  <div style={{ width: 120 }}>
                    <span>{key + positions.length + 1 + "." + "  "}</span>
                    <span style={{ marginLeft: 10 }}>{position}</span>
                  </div>
                  <span style={{ marginLeft: 20, color: "red" }}>Please save data</span>
                </div>
              })}
            </div>
          </div>
          <div className="position-footer">
            <button className="save-position" onClick={this.insertPosition}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Position