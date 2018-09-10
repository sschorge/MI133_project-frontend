import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { startTrip, timeConverter, checkID } from './actions'

class StartTrip extends React.Component {
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
            let departure = Math.round(Date.now() / 1000);
            this.props.dispatch(startTrip(departure, tripid))
            this.forceUpdate(function () {
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
                    return response.json()
                })
                    .then(data => { this.setState({ data: data.trips }) });
            })

        }
    }

    createTable = () => {
        let table = []
        let tbody = []
        tbody.push(<tr><td>Departure</td><td>Arrival</td><td>Boat</td><td>Location</td><td>Member</td></tr>)
        // Outer loop to create parent
        let children = []
        let crew_names = []
        let trip_id = -1
        let user_id = this.props.user_id
        let user_id_arr = []
        for (let i = 0; i < this.state.data.length; i++) {
            if (trip_id === this.state.data[i].trip_id && i > 0) {
                crew_names.push(<br />, this.state.data[i].first_name + " " + this.state.data[i].last_name)
                user_id_arr.push(this.state.data[i].member_id)
            } else {
                if (i > 0) {
                    children.push(<td nowrap="true">{crew_names}</td>)
                    if ((checkID(user_id_arr, user_id)) && (this.state.data[i-1].active === 0)) {
                        tbody.push(<tr>{children}</tr>)
                    }
                    children = []
                    crew_names = []
                    user_id_arr = []
                }
                children.push(<td>
                    <button id={this.state.data[i].trip_id} value={this.state.data[i].trip_id} onClick={evt => this._onButtonClickJoinTrip(evt)} >Start Trip</button>
                </td>)
                children.push(<td>{timeConverter(this.state.data[i].arrival)}</td>)
                children.push(<td>{this.state.data[i].boat_name}</td>)
                children.push(<td>{this.state.data[i].latitude + " " + this.state.data[i].longitude}</td>)
                crew_names.push(this.state.data[i].first_name + " " + this.state.data[i].last_name)
                user_id_arr.push(this.state.data[i].member_id)
                trip_id = this.state.data[i].trip_id
            }
            if (i === this.state.data.length - 1) {
                children.push(<td nowrap="true">{crew_names}</td>)
                if ((checkID(user_id_arr, user_id)) && (this.state.data[i].active === 0)) {
                    tbody.push(<tr>{children}</tr>)
                }
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
            return response.json()
        })
            .then(data => { console.log(data), this.setState({ data: data.trips }) });
    }

    render() {
        return <div>
            <h4>Start a Trip</h4>
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
export default connect(mapStateToProps)(StartTrip);
