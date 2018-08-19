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

            <div>
                {/* Div for Google Maps Code */}
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