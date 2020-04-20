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

        axios.get('api/block').then(res => {
            this.setState({

                data:{
                    ...this.state.data,
                    ...res.data[0]
                }
            })
        })

        axios.get("api/status").then(res => {
           this.setState({
               data:{
                ...this.state.data,
                ...res.data[0]
                }
            })
        })

}
  handleChange = (event) => {
    this.setState({
        data:{block:event.target.checked}
    })
    axios.post('api/block', event.target.checked)
    console.log(event.target.checked)
  }


  render() {
    return (
    <>
       <h1> Status: { this.state.data.status  } </h1>
         <input
            type="checkbox"
            id="block"
            checked={this.state.data.block}
            onChange={(event) => this.handleChange(event)}
        />
         <label htmlFor="block"> block</label>
    </>

    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);