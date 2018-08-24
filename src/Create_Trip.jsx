import React from 'react'
import { connect } from 'react-redux';

class CreateTrip extends React.Component {
    constructor() {
        super()
        this.handleSubmit = event => {};
    }

    render() {
         return <div className="CreateTrip">
          <h4>Create a Trip</h4>
          <form onSubmit={this.handleSubmit}>
            <div>
                <label>Boot</label>
                <input type="boot"/>
            </div>
            <div>
                <label>Crew</label>
                <input type="text"/>
                <input type="button" value="+"/>
            </div>
			
			<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAd2nDFBZR6bqEuDnpxNzGM08Xlh1RTkWc&callback=initMap" async defer></script>
            <div id="map">
                {
					var map;
					var curMarker;
					var geocoder, addressString = "";

					function getLocationByLatLng(geocoder, latLng) {
						var needsRetry = true;
						
						while (needsRetry) {
							needsRetry = false;
						
							geocoder.geocode({
								'latLng': latLng
							}, 
							function (results, status) {
								switch (status) {
									case google.maps.GeocoderStatus.OK:
										if (results[0]) {
											addressString = results[0].formatted_address;
											console.log(addressString);
										}
										else {
											console.log('No place found for latlng: ' + latLng);
											addressString = "";
										}
										break;
										
									case google.maps.GeocoderStatus.OVER_QUERY_LIMIT: 
										needsRetry = true;
										
									default:
										addressString = "";
										console.log('Geocoder failed due to: ' + status);
										break;
								}
							})
						}
					}
					
					function onMapClick(event) {
						var latLng = event.latLng;

						if (curMarker != null) 
							curMarker.setMap(null);
						
						curMarker = new google.maps.Marker({
							position: latLng,
							label: 'Trip',
							map: map
						});

						getLocationByLatLng(geocoder, latLng);
					}

					function initMap() {
					  map = new google.maps.Map(document.getElementById('map'), {
							center: {lat: 54.32329270, lng: 10.12276520}, // Kiel
							zoom: 10
						});
						
						geocoder = new google.maps.Geocoder();
						
						google.maps.event.addListener(map, 'click', onMapClick);
					}
				}
            </div>

            <div>
                <label>Departure</label>
                <input type="date"/>
                <input type="time"/>
            </div>

            <div>
                <label>Arrival</label>
                <input type="date"/>
                <input type="time"/>
            </div>

            <div className="row">
                <input type="submit" value="Create Trip"/>
            </div>
        </form>
          </div>
    }
}

function mapStateToProps(state){
    return {
        create_trip: state.create_trip
    };
  }
  export default connect(mapStateToProps)(CreateTrip);