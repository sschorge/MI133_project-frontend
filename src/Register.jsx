import React from 'react';
import Registration from './Registration';
import { connect } from 'react-redux';
import { set_registration } from './actions'

class Register extends React.Component {
  constructor() {
    super();
    this._onButtonClick = () => { this.props.dispatch(set_registration({ bool: true })) }
  }

  render() {
    return (
      <div>
        <button onClick={this._onButtonClick}>Registration</button>
        {this.props.registration ?
          <Registration /> :
          false
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    registration: state.ui.registration
  };
}
export default connect(mapStateToProps)(Register);