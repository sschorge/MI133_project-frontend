import React from 'react';
import { connect } from 'react-redux';
import {
    //actions from ./actions
    reset_state,
    set_create_trip,
    set_sign_trip,
    set_start_trip,
    set_end_trip
} from './actions'
import CreateTrip from './Create_Trip';
import SignTrip from './Sign_Trip';
import StartTrip from './Start_Trip';
import EndTrip from './End_Trip';
import './App.css';

class Trips extends React.Component {
    constructor() {
        super()

        this._create_trip = () => {
            this.props.dispatch(set_create_trip(true, true))
        }

        this._sign_trip = () => {
            this.props.dispatch(set_sign_trip(true, true))
        };

        this._start_trip = () => {
            this.props.dispatch(set_start_trip(true, true))
        }

        this._end_trip = () => {
            this.props.dispatch(set_end_trip(true, true))
        }

        this._back = () => {
            this.props.dispatch(reset_state())
        }
    }
    render() {
        const { hide_menue, create_trip, sign_trip, start_trip, end_trip } = this.props;

        return <div>
            {!hide_menue ?
                <div>
                    <div>
                        <button onClick={this._create_trip}>Create a Trip</button>
                    </div>
                    <div>
                        <button onClick={this._sign_trip}>Sign into existing Trip</button>
                    </div>
                    <div>
                        <button onClick={this._start_trip}>Start a Trip</button>
                    </div>
                    <div>
                        <button onClick={this._end_trip}>End a Trip</button>
                    </div>
                </div> : false
            }
            <div>
                {sign_trip ?
                    <div>
                        <SignTrip />
                    </div>
                    : false
                }
            </div>
            <div>
                {create_trip ?
                    <div>
                        <CreateTrip />
                    </div>
                    : false
                }
            </div>
            <div>
                {start_trip ?
                    <div>
                        <StartTrip />
                    </div>
                    : false
                }
            </div>
            <div>
                {end_trip ?
                    <div>
                        <EndTrip />
                    </div>
                    : false
                }
            </div>
            <div>
                <input type="button" value="back" onClick={this._back} />
            </div>
        </div>
    }
}
function mapStateToProps(state) {
    return {
        user_id: state.user_id,
        hide_menue: state.ui.hide_menue,
        create_trip: state.trips.create_trip,
        sign_trip: state.trips.sign_trip,
        start_trip: state.trips.start_trip,
        end_trip: state.trips.end_trip
    };
}
export default connect(mapStateToProps)(Trips);