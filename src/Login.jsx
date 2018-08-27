import React from 'react';
import { connect } from 'react-redux';
import { requestLogin, set_logout } from './actions'

class Login extends React.Component {
    constructor() {
        super();
        this.state = { username: '', password: '' }
        //this._onButtonClick = () =>{this._onButtonClick.bind(this);
        //dispatch(set_login(data))
        //this._onButtonClickLogin = ()=>{this.props.dispatch(set_login())}
        this._onButtonClickLogout = () => { this.props.dispatch(set_logout()) }

        this._onButtonClickLogin = () => {
  
            this.props.dispatch(requestLogin(this.state.username,this.state.password))
        }

        this.updateUsernameValue=(evt) => {
            this.setState({
                username: evt.target.value
            })
        }
        this.updatePasswordValue=(evt) => {
            this.setState({
                password: evt.target.value
            })
        }      
    }

        render() {
            return (
                <div>
                    {this.props.login ?
                        <button onClick={this._onButtonClickLogout}>Logout</button>
                        :
                        <div>
                            <form onSubmit={this.handleSubmit}>
                                <div>
                                    <label>Username</label>
                                    <input type="text" value={this.state.username} onChange={evt => this.updateUsernameValue(evt)} />
                                </div>
                                <div>
                                    <label>Password</label>
                                    <input type="password" value={this.state.password} onChange={evt => this.updatePasswordValue(evt)} />
                                </div>
                                <button onClick={this._onButtonClickLogin}>Login</button>
                            </form>
                        </div>
                    }
                </div>
            );
        }

    }

  function mapStateToProps(state) {
    return {
        user: state.user,
        login: state.login
    };
}
export default connect(mapStateToProps)(Login);