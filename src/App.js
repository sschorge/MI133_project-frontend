import React,{Component} from 'react';
import Menue from './Menue';
import './App.css';
import { connect } from 'react-redux';

class App extends Component {
//  constructor(){
//    super();
//  }
  render() {
    //const {user} = this.props;
    return (
      <div className="App">
      <h2> Water Sports Lookbook</h2>
      <h4>Welcome {this.props.user}</h4>
        <Menue/>
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
    user: state.user
  };
}
export default connect(mapStateToProps)(App);
