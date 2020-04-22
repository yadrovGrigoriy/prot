import React, { Component } from "react";
import { render } from "react-dom";
import axios from 'axios';

var client;// Create a client instance
//
client = new Paho.MQTT.Client('localhost', 9001, "clientId");
//
//// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
//
//// connect the client
client.connect({onSuccess:onConnect});
//
//
//// called when the client connects
function onConnect() {
 // Once a connection has been made, make a subscription and send a message.
 console.log("onConnect");
 client.subscribe("BBox/from/status")
 client.subscribe("BBox/from/blocked")
//  message = new Paho.MQTT.Message("Hello");
//  message.destinationName = "World";
//  client.send(message);
}
//
//// called when the client loses its connection
function onConnectionLost(responseObject) {
 if (responseObject.errorCode !== 0) {
   console.log("onConnectionLost:"+responseObject.errorMessage);
 }
}
//
//// called when a message arrives
function onMessageArrived(message) {
 console.log("onMessageArrived:"+message.payloadString);
}
//







class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data:{
          status:'',
          block: false
        },
        newStatus:''

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
    if (event){

      message = new Paho.MQTT.Message('0');
      message.destinationName = "BBox/from/block";
      client.send(message)
      this.setState({
          data:{
              ...this.state.data,
              ...res.data
          }
      })

      
//      axios.post('api/block/', { block:event.target.checked})
//        .then(res => {
//           this.setState({
//            data:{
//                ...this.state.data,
//                ...res.data
//            }
//        })
//      } )
    }
    else {
      console.log(this.state.newStatus)
      message = new Paho.MQTT.Message();
      message.destinationName = "BBox/from/status";
      client.send(message);
//      axios.post('api/status/', { status:this.state.newStatus})
//      .then( res => {
//      console.log(res.data)
//        this.setState({
//           data:{
//            ...this.state.data,
//            ...res.data,
//            newStatus:''
//            }
//        })
//        }
//      )
    }
  }


  render() {
    
    return (
    <>
      <div>
          <h3> Status: { this.state.data.status  } </h3>
          <div>
            <input type="text" value={this.state.newStatus} onChange={(event) => this.setState({newStatus: event.target.value})}/>
            <button onClick={() => this.handleChange()}>Send</button>
          </div>
      </div>

      <input
        type="checkbox"
        id="block"
        // value={this.state.data.block}
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



