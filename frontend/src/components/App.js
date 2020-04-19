import React, { Component } from "react";
import { render } from "react-dom";
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{}
     };
  }

  componentDidMount() {
    axios.get("api/state").then(res => {
        console.log(res.data[0])
        this.setState({
            data: res.data[0]
            })
        })
    }
  handleChange = (event) => {
    this.setState({
    })
    console.log(event.target.checked)
  }


  render() {
    return (

    <div>

           <h1> Status: { this.state.data.status  } </h1>
         <input
            type="checkbox"
            id="block"
            defaultValue={this.state.data.blocked}
            onChange={(event) => this.handleChange(event)}
        />
         <label htmlFor="block"> block</label>
    </div>

    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);