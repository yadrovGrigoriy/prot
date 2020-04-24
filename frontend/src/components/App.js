import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

const client = new Paho.MQTT.Client('192.168.202.70', 9001, 'clientId');

const TOPICS = [
	'BBox/client/status/1',
	'BBox/client/status/2',
	'BBox/client/soft_block/1',
  'BBox/client/soft_block/2',
  'BBox/server/soft_block/1',
  'BBox/server/soft_block/2',
  'BBox/client/hard_block/1',
	'BBox/client/hard_block/2',
	'BBox/server/hard_block/1',
	'BBox/server/hard_block/2',
];

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			kran1: {
				status: '',
				hard_block: false,
				soft_block: false,
			},
			kran2: {
				status: '',
				hard_block: false,
				soft_block: false,
			},
		};
	}
	onConnect = () => {
		// Once a connection has been made, make a subscription and send a message.
		console.log('onConnectWS');

		for (let topic of TOPICS){
      client.subscribe(topic)
    }
	};

	onMessageArrived = (msg) => {
		if (msg.destinationName == TOPICS.client_topic_status) {
			
		}

		console.log('destinationName ' + msg.destinationName);
		console.log('onMessageArrived' + msg.payloadString);
	};

	componentDidMount() {
		client.connect({ onSuccess: this.onConnect });
    client.onMessageArrived = this.onMessageArrived;
    
    // const statuses = axios.get('api/status')
    // const hard_block = axios.get('api/hard_block')
    // const soft_block = axios.get('api/soft_block')

    // Promise.all(
    //   []
    // )



		axios.get('api/hard_block').then((res) => {

			const hard_block1 = res.data.filter((item) => item.kran_id == 0).reverse()[0]
				.block;
			const hard_block2 = res.data.filter((item) => item.kran_id == 1).reverse()[0]
				.block;
			this.setState({
				kran1: {
					...this.state.kran1,
					hard_block: hard_block1,
				},
				kran2: {
					...this.state.kran2,
					hard_block: hard_block2,
				},
			});
		});
		axios.get('api/soft_block').then((res) => {
			// console.log('soft', res.data);

			const soft_block1 = res.data.filter((item) => item.kran_id == 0).reverse()[0]
				.block;
			const soft_block2 = res.data.filter((item) => item.kran_id == 1).reverse()[0]
				.block;
			this.setState({
				kran1: {
					...this.state.kran1,
					soft_block: soft_block1,
				},
				kran2: {
					...this.state.kran2,
					soft_block: soft_block2,
				},
			});
		});

		axios.get('api/status').then((res) => {
			const status1 = res.data.filter((item) => item.kran_id == 0).reverse()[0].status;
			const status2 = res.data.filter((item) => item.kran_id == 1).reverse()[0].status;
			this.setState({
				kran1: {
					...this.state.kran1,
					status: status1,
				},
				kran2: {
					...this.state.kran2,
					status: status2,
				},
			});
		});
	}

	handleChange = (event) => {
    const value = event.target.checked ? '1': '0'
    let message = new Paho.MQTT.Message(value);
    
    switch(event.target.id){
      case 'soft_block1': 
			  message.destinationName = 'BBox/server/soft_block/1';
        break;
      case 'soft_block2':
        message.destinationName = '';
        break;
      case 'hard_block1':
        message.destinationName = '';
        break;
      case 'hard_block1':
        message.destinationName = '';
    }
    client.send(message);

    console.log(event.target.id);
    
	
	};

	render() {
		console.log(this.state);

		return (
			<>
				<div>
					<h3> Status1: {this.state.kran1.status} </h3>
					<input
						type="checkbox"
						id="soft_block1"
						value={this.state.kran1.soft_block}
						checked={this.state.kran1.soft_block}
						onChange={(event) => this.handleChange(event)}
					/>
					<button><label htmlFor="soft_block1">  block</label></button>
          <input
						type="checkbox"
						id="hard_block1"
						value={this.state.kran1.hard_block}
            checked={this.state.kran1.hard_block}
						onChange={(event) => this.handleChange(event)}
					/>
						<button><label htmlFor="hard_block1">  block</label></button>
				</div>
				<div>
					<h3> Status2: {this.state.kran2.status} </h3>
					<input
						type="checkbox"
						id="soft_block2"
						value={this.state.kran2.soft_block}
            checked={this.state.kran2.soft_block}
						onChange={(event) => this.handleChange(event)}
					/>
					<button><label htmlFor="soft_block2">  block</label></button>
          <input
						type="checkbox"
						id="hard_block2"
						value={this.state.kran2.hard_block}
            checked={this.state.kran2.hard_block}
						onChange={(event) => this.handleChange(event)}
					/>
					<button><label htmlFor="hard_block2">  block</label></button>
				</div>
			</>
		);
	}
}

export default App;

const container = document.getElementById('app');
render(<App />, container);
