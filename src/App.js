import React, {Component } from 'react';
import Trips from './Trips'
import './App.css';
import { connect } from 'react-redux';
import Register from './Register';
import Login from './Login';
class App extends Component {
  render() {
    const { user } = this.props;
    const { registration } = this.props;
    return (
      <div className="App">
        <h2> Water Sports Lookbook</h2>
        <div class="row">
          <div class="col-4"> </div>
          {!registration ?
            <div class="col-4">
              <h4>Welcome {user}</h4>
              <Trips />
            </div> :
            false
          }
          <div class="col-4" >
            <Login />
            <Register />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    registration: state.ui.registration,
  };
}
export default connect(mapStateToProps)(App);
