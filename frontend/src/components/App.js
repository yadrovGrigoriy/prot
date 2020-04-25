import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

const client = new Paho.MQTT.Client('192.168.202.70', 9001, 'clientId');

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			kran1: {
				status: '',
				hard_block: '',
				soft_block: '',
			},
			kran2: {
				status: '',
				hard_block: '',
				soft_block: '',
			},
		};
	}
	onConnect = () => {
		// Once a connection has been made, make a subscription and send a message.
		console.log('onConnectWS');
		client.subscribe('BBox/client/#')
	};

	onMessageArrived = (msg) => {
		const [name, source, topic, kran_id] =  msg.destinationName.split('/')
		if(source == 'client'){
			switch(`${topic}/${kran_id}`){	
				case 'status/1':
					this.setState({
						...this.state,
						kran1:{
							...this.state.kran1,
							status:msg.payloadString
						}
					})
				break;
				case 'status/2':
					this.setState({
						...this.state,
						kran2:{
							...this.state.kran2,
							status:msg.payloadString
						}
					})
				break;
				case 'soft_block/1':
				case 'hard_block/1':
					this.setState({
						...this.state,
						kran1:{
							...this.state.kran1,
							[topic]:Boolean(Number(msg.payloadString))
						}
					})
					break;
				case 'soft_block/2':
				case 'hard_block/2':
					this.setState({
						...this.state,
						kran2:{
							...this.state.kran2,
							[topic]:Boolean(Number(msg.payloadString))
						}
					})
				break;
				default:
					console.log(this.state);
				}
					
		}
		else 
		 console.log(source);
			
	};

	componentDidMount() {
		client.connect({ onSuccess: this.onConnect });
		client.onMessageArrived = this.onMessageArrived;
		Promise.all(
			[
				axios.get('api/status'),
				axios.get('api/hard_block'),
				axios.get('api/soft_block')
			]).then(([
				statuses,
				hard_blocks,
				soft_blocks
			]) => {
				this.setState({
					kran1: {
						status: statuses.data.find(item => item.kran_id == 1).status,
						soft_block: soft_blocks.data.find(item => item.kran_id == 1).block,
						hard_block: hard_blocks.data.find(item => item.kran_id == 1).block
					},
					kran2: {
						status: statuses.data.find(item => item.kran_id == 2).status,
						soft_block: soft_blocks.data.find(item => item.kran_id == 2).block,
						hard_block: hard_blocks.data.find(item => item.kran_id == 2).block
					}

				})

			})
	}

	handleChange = (event, kran_id) => {
		
		const value = Number(event.target.checked).toString()
		const message = new Paho.MQTT.Message(value);
		message.destinationName = `BBox/server/${event.target.name}/${kran_id}`
		client.send(message);
		const fileldName = event.target.name
		console.log(message.destinationName);
		
		axios.post(`api/${fileldName}/`, { kran_id, block: event.target.checked })
			.then(res => {
				if (res.data.kran_id == 1) {
					this.setState({
						...this.state,
						kran1: {
							...this.state.kran1,
							[fileldName]: res.data.block
						}
					})
				}
				if (res.data.kran_id == 2) {
					this.setState({
						...this.state,
						kran2: {
							...this.state.kran2,
							[fileldName]: res.data.block
						}
					})
				}
			})
	}


	render() {
		return (
			<div className="container">
				<div className="section">
					<h3>Tap 1 </h3>
					<h4 className="status"> Status: {this.state.kran1.status} </h4>
					{/* checkboxes block */}
					<div className="buttons">
						<input
							className="hidden"
							type="checkbox"
							id="soft_block1"
							name='soft_block'
							value={this.state.kran1.soft_block}
							checked={this.state.kran1.soft_block}
							onChange={(event) => this.handleChange(event, 1)}
						/>
						<button className="button" style={{ borderColor: this.state.kran1.soft_block ? 'red' : 'green' }}><label htmlFor="soft_block1"> soft block</label></button>
										
						<input
							className="hidden"
							type="checkbox"
							id="hard_block1"
							name="hard_block"
							value={this.state.kran1.hard_block}
							checked={this.state.kran1.hard_block}
							onChange={(event) => this.handleChange(event, 1)}
						/>
						<button className="button" style={{ borderColor: this.state.kran1.hard_block ? 'red' : 'green' }}><label htmlFor="hard_block1"> hard block</label></button>
					</div>		
				</div>

				<div className="section">
					<h3> Tap 2</h3>
					<h4 className="status"> Status: {this.state.kran2.status} </h4>
					<div className="buttons">
					<input
						className="hidden"
						type="checkbox"
						id="soft_block2"
						name="soft_block"
						value={this.state.kran2.soft_block}
						checked={this.state.kran2.soft_block}
						onChange={(event) => this.handleChange(event, 2)}
					/>
					<button className="button" style={{ borderColor: this.state.kran2.soft_block ? 'red' : 'green' }}><label htmlFor="soft_block2">soft  block</label></button>
					<input
						className="hidden"
						type="checkbox"
						id="hard_block2"
						name="hard_block"
						value={this.state.kran2.hard_block}
						checked={this.state.kran2.hard_block}
						onChange={(event) => this.handleChange(event, 2)}
					/>
					<button className="button" style={{ borderColor: this.state.kran2.hard_block ? 'red' : 'green' }}><label htmlFor="hard_block2"> hard block</label></button>
					</div>
				</div>
			</div>
		);
	}
}


export default App;

const container = document.getElementById('app');
render(<App />, container);
