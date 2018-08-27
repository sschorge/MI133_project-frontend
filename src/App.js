import React,{Component} from 'react';
import Trips from './Trips'
import './App.css';
import { connect } from 'react-redux';
import Register from './Register';
import Login from './Login';
class App extends Component {

  render() {
    const {user} = this.props;
    const {registration} = this.props;
    return (
      <div className="App">
      <h2> Water Sports Lookbook</h2>
      <Login/>
      <Register/>
      {!registration ?
        <div>
          <h4>Welcome {user}</h4> 
          <Trips/>
          </div>:
        false
      }
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
    user: state.user,
    registration: state.registration,
  };
}
export default connect(mapStateToProps)(App);
