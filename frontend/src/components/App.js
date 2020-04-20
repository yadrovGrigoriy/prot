import React, { Component } from "react";
import { render } from "react-dom";
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data:{
          status:'',
          block: false
        },
        editStatus:false
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
        data:{
          ...this.state.data,
          block:event.target.checked
        }
    })
    // axios.post('api/block', event.target.checked)
    console.log(event.target.checked)
  }


  render() {
    
    return (
    <>
      <div>
        {
          this.state.editStatus ?  
          <div>
            <input type="text" value={this.state.status} />
            <button onClick={() => this.setState({editStatus: !this.state.editStatus})}>cancel</button>
          </div>
          : 
          <h3 onClick={() => this.setState({editStatus: !this.state.editStatus})}> Status: { this.state.data.status  } </h3>
        }
      </div>   

      <input
        type="checkbox"
        id="block"
        value={this.state.data.block}
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