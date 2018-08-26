import React from 'react';
import { connect } from 'react-redux';
import {
    //actions from ./actions
    set_hide_menue,
    reset_state
    } from './actions'
import CreateTrip from './Create_Trip';
import './App.css';

class Trips extends React.Component {
    constructor() {
        super()

        this.state = {
            ui:{
                create_trip:false,
                sign_trip:false,
                start_trip:false,
                end_trip:false,
            },
            data:{
                //select data for table
            }
        };

        this._create_trip = () => {
            this.setState({
                create_trip: true
            })
            this.props.dispatch(set_hide_menue())
        } 

        this._sign_trip = () =>{ 
            this.setState({
                sign_trip: true
            }) 
            this.props.dispatch(set_hide_menue())  
        };

        this._start_trip = () => {
            this.setState({
                start_trip:true
            })
            this.props.dispatch(set_hide_menue())  
        }

        this._end_trip = () => {
            this.setState({
                end_trip:true
            })
            this.props.dispatch(set_hide_menue()) 
        }
        
        this._back = () => {
            this.setState({
                create_trip:false,
                sign_trip:false,
                start_trip:false,
                end_trip:false,
            })
            this.props.dispatch(reset_state())
        } 
    }
    componentDidMount() {
        fetch('http://rcpoonkk8vbqkyiw.myfritz.net:3000/trips/17')
          .then(response => {return response.json()})
          .then(data => {this.setState({ data }),console.log({data})});
          
      }
    createTable = () => {
        console.log("createTable")
         const {data} =this.state;
         console.log();
        let table = []
        let tbody = []
        let crew_id = -1;
        tbody.push(<tr><td>Departure</td><td>Arrival</td><td>Boat</td><td>Location</td><td>Member</td><td>Join</td></tr>)
        // Outer loop to create parent
        let children = []  
        let crew_names = []
        for (let i = 0; i < this.state.data.length; i++) {
                
          //Inner loop to create children
          
            //children.push(<td>{`Column ${j + 1}`}</td>)

            if(crew_id == this.state.data[i].crew ){
                crew_names.push(<br/>,this.state.data[i].first_name + " " + this.state.data[i].last_name)
            }else{
                children.push(<td>{this.state.data[i].departure}</td>)
                children.push(<td>{this.state.data[i].arrival}</td>)
                children.push(<td>{this.state.data[i].boat_name}</td>)
                crew_names.push(this.state.data[i].first_name + " " + this.state.data[i].last_name)
                crew_id=this.state.data[i].crew
            }
          
          //children.push(<button>Join Trip</button>)
          
        }
        children.push(<td nowrap="true">{crew_names}</td>)
        tbody.push(<tr>{children}</tr>)
        table.push(<tbody>{tbody}</tbody>)
        return table
      }   
 
    render() {
        const {email, nickname, password, retypedPassword, lastValidation} = this.state
        const errorInfoLine = !lastValidation
            ? null
            : <div >{lastValidation}</div>

        const {hide_menue} = this.props;

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
            </div> :false   
            }
            <div>
                {this.state.sign_trip ?
                    <div>
                    <h4>Sign into a Trip</h4>
                    <table id="triptable">
                        {this.createTable()}
                    </table>
                    </div>
                :false}
            </div>
            {this.state.create_trip ? 
                <div>
                    <CreateTrip/>
               </div>
               :false
            }
            <div className="row">
               <input type="button" value="back" onClick={this._back}/>
            </div>
        </div>
    }
}
function mapStateToProps(state){
    return {
        hide_menue: state.hide_menue
    };
  }
  export default connect(mapStateToProps)(Trips);