import React from 'react';
import { connect } from 'react-redux';
import {
    //actions from ./actions
    set_hide_menue,
    reset_state
    } from './actions'
import CreateTrip from './Create_Trip';
    

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
   
    createTable = () => {
        let table = []
    
        // Outer loop to create parent
        for (let i = 0; i < 3; i++) {
          let children = []
          //Inner loop to create children
          for (let j = 0; j < 5; j++) {
            children.push(<td>{`Column ${j + 1}`}</td>)
          }
          //Create the parent and add the children
          table.push(<tr>{children}</tr>)
        }
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
                    <h4>sign a triiipp</h4>
                    <table>
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