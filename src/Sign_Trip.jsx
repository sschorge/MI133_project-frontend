import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { joinTrip } from './actions'

class SignTrip extends React.Component {
	constructor() {
		super()
		this.handleSubmit = event => { };
		this.state = {
			data: {
				//select data for table
			}
		};
		this._onButtonClickJoinTrip = (event) => {
			let tripid = parseInt(event.target.value, 10)
			this.props.dispatch(joinTrip(this.props.user_id, tripid))
			this.forceUpdate(function(){
				console.log("funnccssiiooonnn")
				let url = "http://rcpoonkk8vbqkyiw.myfritz.net:3000/view_trips";
				let daten = { id: "all" };
				fetch(url, {
					method: "POST",
					body: JSON.stringify(daten),
					headers: {
						"Content-Type": "application/json"
					},
					credentials: "same-origin"
				}).then(response => {
					console.log(response)
					return response.json()
				})
					.then(data => { this.setState({ data: data.trips }) });
			
			})
		}
	}

	createTable = () => {
		console.log("createTable")
		console.log(this.state.data);
		let table = []
		let tbody = []
		tbody.push(<tr><td>Departure</td><td>Arrival</td><td>Boat</td><td>Location</td><td>Member</td><td>Join</td></tr>)
		// Outer loop to create parent
		let children = []
		let crew_names = []
		let names = []
		let trip_id = -1
		for (let i = 0; i < this.state.data.length; i++) {
			if (trip_id === this.state.data[i].trip_id && i > 0) {
				crew_names.push(<br />, this.state.data[i].first_name + " " + this.state.data[i].last_name)
				names.push(this.state.data[i].first_name + " " + this.state.data[i].last_name)
			} else {
				if (i > 0) {
					children.push(<td nowrap="true">{crew_names}</td>)
					if (names.length < this.state.data[i - 1].boat_size) {
						children.push(<td><button id={this.state.data[i - 1].trip_id} value={this.state.data[i - 1].trip_id} onClick={evt => this._onButtonClickJoinTrip(evt)} >Join Trip</button></td>)
					}
					tbody.push(<tr>{children}</tr>)
					children = []
					crew_names = []
					names = []
				}
				children.push(<td>{this.state.data[i].departure}</td>)
				children.push(<td>{this.state.data[i].arrival}</td>)
				children.push(<td>{this.state.data[i].boat_name}</td>)
				children.push(<td>{this.state.data[i].latitude + " " + this.state.data[i].longitude}</td>)
				crew_names.push(this.state.data[i].first_name + " " + this.state.data[i].last_name)
				names.push(this.state.data[i].first_name + " " + this.state.data[i].last_name)
				trip_id = this.state.data[i].trip_id
			}
		}
		table.push(<tbody>{tbody}</tbody>)
		return table
	}

	componentDidMount() {
		let url = "http://rcpoonkk8vbqkyiw.myfritz.net:3000/view_trips";
		let daten = { id: "all" };
		fetch(url, {
			method: "POST",
			body: JSON.stringify(daten),
			headers: {
				"Content-Type": "application/json"
			},
			credentials: "same-origin"
		}).then(response => {
			console.log(response)
			return response.json()
		})
			.then(data => { this.setState({ data: data.trips }) });
	}

	render() {
		return <div>
			<h4>Sign into a Trip</h4>
			<table id="table" key="1">
				{this.createTable()}
			</table>
		</div>
	}
}
function mapStateToProps(state) {
	return {
		user_id: state.user_id,
	};
}
export default connect(mapStateToProps)(SignTrip);
