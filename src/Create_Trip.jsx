import React from 'react'
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import marker from './marker.png'
import './App.css';
const AnyReactComponent = ({ text }) => <div> <img src={marker} alt="Marker" height="15" width="15" /> </div>;

class CreateTrip extends React.Component {
	constructor() {
		super()
		this.handleSubmit = event => { };
		this.state = {
			lat: 54.32329270,
			lng: 10.12276520,
			zoom: 11
		};
		this._onClick = this._onClick.bind(this);
	}

	handleClick(letter) {
		this.setState({ justClicked: letter });
	}
	_onClick(obj) {
		this.setState({
			lat: obj.lat,
			lng: obj.lng
		})
	}

	render() {
		console.log("lat: "+this.state.lat)
		console.log("lng: "+this.state.lng)
		return <div className="CreateTrip">
			<h4>Create a Trip</h4>
			<form onSubmit={this.handleSubmit}>
				<div>
					<label>Boot</label>
					<input type="boot" />
				</div>
				<div>
					<label>Crew</label>
					<input type="text" />
					<input type="button" value="+" />
				</div>
				<div style={{ height: '50vh', width: '50%', margin: '0px auto' }}>
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
					<input type="date" />
					<input type="time" />
				</div>

				<div>
					<label>Arrival</label>
					<input type="date" />
					<input type="time" />
				</div>

				<div className="row">
					<input type="submit" value="Create Trip" />
				</div>
			</form>
		</div>
	}
}

function mapStateToProps(state) {
	return {
		create_trip: state.create_trip
	};
}
export default connect(mapStateToProps)(CreateTrip);