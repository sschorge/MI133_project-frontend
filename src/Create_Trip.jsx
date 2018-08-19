import React from 'react'
import { 
    set_create_trip,
    reset_state
} from './actions'
import { connect } from 'react-redux';

class CreateTrip extends React.Component {
    constructor() {
        super()
        this.handleClick = (val)=>()=>{this.props.dispatch(set_create_trip())}
        this.handleSubmit = event => {};
        this.resetState = ()=>{this.props.dispatch(reset_state())}
    }

    render() {
        //const {width, height} = this.props
        const {create_trip} = this.props;

        return <div className="CreateTrip">
      {create_trip ?
        <div>
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

                <input type="button" value="cancel" onClick={this.resetState}/>
            </div>
        </form>
          
          </div>:
        <button onClick={this.handleClick()}> create </button>
      }


            
        </div>
    }
}

function mapStateToProps(state){
    return {
        create_trip: state.create_trip
    };
  }
  export default connect(mapStateToProps)(CreateTrip);