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
            this.props.dispatch(requestLogin(this.state.username, this.state.password))
        }

        this.handleChange = (event) => {
            this.setState({ [event.target.name]: event.target.value })
        }
    }

    render() {
        const { username, password } = this.state
        return (
            <div>
                {this.props.login ?
                    <button onClick={this._onButtonClickLogout}>Logout</button>
                    :
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <label>Username</label>
                                <input type="text" name='username' value={username} onChange={evt => this.handleChange(evt)} />
                            </div>
                            <div>
                                <label>Password</label>
                                <input type="password" name='password' value={password} onChange={evt => this.handleChange(evt)} />
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