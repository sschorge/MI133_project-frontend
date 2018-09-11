import React from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import marker from './marker.png';
import './App.css';
import { createTrip } from './actions'

const AnyReactComponent = ({ text }) => <div> <img src={marker} alt="Marker" height="15" width="15" /> </div>;

class CreateTrip extends React.Component {
	constructor() {
		super()
		this.handleSubmit = event => { };
		this.state = {
			lat: 54.32329270,
			lng: 10.12276520,
			zoom: 11,
			boats: [], //array aus strings
			selected_boat: '',
			selected_boat_id: 0,
			crew_size: 0,
			crew_names: [],
			dep_date: '',
			dep_time: '',
			arrival_date: '',
			arrival_time: ''
		};
		this._onClick = this._onClick.bind(this);

		this.handleChange = (event) => {
			this.setState({ [event.target.name]: event.target.value, })
		}

		this.handleboatwithcrew = (e) => {
			const value = this.state.boats.filter(function (item) {
				return item.id === parseInt(e.target.value, 10)
			})
			this.setState({
				selected_boat_id: value[0].id,
				crew_size: value[0].boat_size,
				selected_boat: value[0].boat_name
			})
		}

		this.handleCrewMember = (e, i) => {
			let crewmember = this.state.crew_names;
			crewmember[i] = e.target.value;
			this.setState({
				crew_names: crewmember
			})
		}
		this._onButtonClickCreateTrip = () => {
			let departure = this.state.dep_date + " " + this.state.dep_time;
			let dep_unix = (new Date(departure.replace(/-/g, '/')).getTime() / 1000)
			let arrival = this.state.arrival_date + " " + this.state.arrival_time;
			let arrival_unix = (new Date(arrival.replace(/-/g, '/')).getTime() / 1000);
			let lat = this.state.lat * 1000000
			let tmp = Math.round(lat)
			let slat = tmp / 1000000

			let lng = this.state.lng * 1000000
			let tmp2 = Math.round(lng)
			let slng = tmp2 / 1000000

			this.props.dispatch(createTrip(this.state.selected_boat_id, this.state.crew_names, slat, slng, dep_unix, arrival_unix))
			//boat, crew, latitude, longitude, departure, arrival
		}
	}

	handleClick(letter) {
		this.setState({ justClicked: letter });
	}
	_onClick(obj) {
		this.setState({
			lat: obj.lat,
			lng: obj.lng
		})

		this.handleSubmit = (event) => {
			event.preventDefault();
		}
	}
	createTable = () => {
		let table = []
		let tbody = []
		tbody.push(<tr><td>Crewnames</td></tr>)
		// Outer loop to create parent
		let children = []
		for (let i = 0; i < this.state.crew_size; i++) {
			children.push(<tr><input onChange={evt => this.handleCrewMember(evt, i)} type="text" /></tr>)
		}
		tbody.push(<tr>{children}</tr>)
		table.push(<tbody>{tbody}</tbody>)
		return table
	}

	componentDidMount() {
		let boats = [];
		fetch('http://localhost:3000/get_boats')
			.then(response => { return response.json() })
			.then(data => {
				boats = data.map((boat) => {
					return boat
				});
				this.setState({
					boats: boats,
				});
			})
	}

	render() {
		let boats = this.state.boats;
		if (boats[0] !== ' ') {
			boats.unshift(' ')
		}

		const { dep_date, dep_time, arrival_date, arrival_time } = this.state
		return <div className="CreateTrip">

			<h4>Create a Trip</h4>
			<form onSubmit={this.handleSubmit}>
				<div>
					<label>Boat</label>
					<select name='selected_boat' onChange={evt => this.handleboatwithcrew(evt)}>
						{this.state.boats.map(function (data) {
							return (
								<option key={data.id} value={data.id} >{data.boat_name}</option>)
						})}
					</select>
				</div>
				<table id="table">
					{this.createTable()}
				</table>
				<div style={{ height: '50vh', width: '100%', margin: '0px auto' }}>
					<GoogleMapReact
						bootstrapURLKeys={{ key: "AIzaSyAd2nDFBZR6bqEuDnpxNzGM08Xlh1RTkWc" }}
						center={{
							lat: this.state.lat,
							lng: this.state.lng,
						}}
						defaultZoom={this.state.zoom}
						onClick={this._onClick}
					>
						<AnyReactComponent
							lat={this.state.lat}
							lng={this.state.lng}
							text={'Kreyser Avrora'}
						/>
					</GoogleMapReact>
				</div>
				<div>
					<label>Departure</label>
					<input type="date" name='dep_date' value={dep_date} onChange={evt => this.handleChange(evt)} />
					<input type="time" name='dep_time' value={dep_time} onChange={evt => this.handleChange(evt)} />
				</div>
				<div>
					<label>Arrival</label>
					<input type="date" name='arrival_date' value={arrival_date} onChange={evt => this.handleChange(evt)} />
					<input type="time" name='arrival_time' value={arrival_time} onChange={evt => this.handleChange(evt)} />
				</div>
				<div>
					<input type="submit" value="Create Trip" onClick={this._onButtonClickCreateTrip} />
				</div>
			</form>
		</div>
	}
}

function mapStateToProps(state) {
	return {
		create_trip: state.trips.create_trip
	};
}
export default connect(mapStateToProps)(CreateTrip);
