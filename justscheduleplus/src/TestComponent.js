import React, { Component } from 'react';
import InputColor from 'react-input-color';
import color from '@material-ui/core/colors/deepPurple';

class TestComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            setcolor : {color:"#5e72e4"}
        }
    }

    

    handleChange = (event) => {
        let { setcolor } = this.state
        setcolor[event.target.name] = event.target.value
        this.setState({ setcolor })
      }

    render(){
        return(
            <div>
                <div
        style={{
          width: 50,
          height: 50,
          marginBottom: 20,
          backgroundColor: this.state.setcolor.color
        }}
      >
      </div>
        {/* <InputColor
        initialHexColor={this.state.setcolor}
        placement="right"
        name="color"
        onChange={this.handleChange}
      /> */}
      <input
        type="color"
        value={this.state.setcolor.color}
        onChange={e => this.handleChange(e)}
        name="color"
      />
     
      {console.log(this.state.setcolor.color)}
    </div>
    


            
        );
    }
}

export default TestComponent