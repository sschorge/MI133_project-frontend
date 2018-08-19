import React,{Component} from 'react';
import Menue from './Menue';
import './App.css';
import { connect } from 'react-redux';
import Register from './Register';

class App extends Component {
//  constructor(){
//    super();
//  }
  render() {
    const {user} = this.props;
    const {registration} = this.props;
    return (
      <div className="App">
      <h2> Water Sports Lookbook</h2>
      <Register/>
      
      {!registration ?
        <div>
          <h4>Welcome {user}</h4>
          <Menue/> 
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
    registration: state.registration
  };
}
export default connect(mapStateToProps)(App);
