import React from 'react';
import { connect } from 'react-redux';
import {
    //actions from ./actions
    set_hide_menue,
    reset_state,
    set_create_trip,
    set_sign_trip,
} from './actions'
import CreateTrip from './Create_Trip';
import './App.css';

class Trips extends React.Component {
    constructor() {
        super()

        this.state = {
            data: {
                //select data for table
            }
        };

        this._create_trip = () => {
            this.props.dispatch(set_create_trip({ create_trip: true, hide_menue: true }))
        }

        this._sign_trip = () => {
            this.props.dispatch(set_sign_trip({ sign_trip: true, hide_menue: true }))
        };

        this._start_trip = () => {
            this.props.dispatch(set_hide_menue())
        }

        this._end_trip = () => {
            this.setState({
                end_trip: true
            })
            this.props.dispatch(set_hide_menue())
        }

        this._back = () => {
            this.setState({
                create_trip: false,
                sign_trip: false,
                start_trip: false,
                end_trip: false,
            })
            this.props.dispatch(reset_state())
        }
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
    //string all für ID

    createTable = () => {
        console.log("createTable")
        console.log(this.state.data);
        let table = []
        let tbody = []
        tbody.push(<tr><td>Departure</td><td>Arrival</td><td>Boat</td><td>Location</td><td>Member</td><td>Join</td></tr>)
        // Outer loop to create parent
        let children = []
        let crew_names = []
        let trip_id = -1
        for (let i = 0; i < this.state.data.length; i++) {
            if (trip_id === this.state.data[i].trip_id && i > 0) {
                crew_names.push(<br />, this.state.data[i].first_name + " " + this.state.data[i].last_name)
            } else {
                if (i > 0) {
                    children.push(<td nowrap="true">{crew_names}</td>)
                    if (crew_names.length < this.state.data[i-1].boat_size){
                        children.push(<td><button>Join Trip</button></td>)
                    }
                    tbody.push(<tr>{children}</tr>)
                    children = []
                    crew_names = []
                }
                children.push(<td>{this.state.data[i].departure}</td>)
                children.push(<td>{this.state.data[i].arrival}</td>)
                children.push(<td>{this.state.data[i].boat_name}</td>)
                children.push(<td>{this.state.data[i].latitude + " " + this.state.data[i].longitude}</td>)
                crew_names.push(this.state.data[i].first_name + " " + this.state.data[i].last_name)
                trip_id = this.state.data[i].trip_id
            }
        }
        table.push(<tbody>{tbody}</tbody>)
        return table
    }

    render() {
        const { hide_menue, create_trip, sign_trip } = this.props;

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
                        <h4>Sign into a Trip</h4>
                        <table id="table" key="1">
                            {this.createTable()}
                        </table>
                    </div>
                    : false
                }
            </div>
            {create_trip ?
                <div>
                    <CreateTrip />
                </div>
                : false
            }
            <div>
                <input type="button" value="back" onClick={this._back} />
            </div>
        </div>
    }
}
function mapStateToProps(state) {
    return {
        hide_menue: state.hide_menue,
        create_trip: state.trips.create_trip,
        sign_trip: state.trips.sign_trip,
        start_trip: state.trips.start_trip,
        end_trip: state.trips.end_trip
    };
}
export default connect(mapStateToProps)(Trips);