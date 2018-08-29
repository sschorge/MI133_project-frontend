import React from 'react';
import { connect } from 'react-redux';
import {
    //actions from ./actions
    reset_state,
    requestRegister
} from './actions'


class Registration extends React.Component {
    constructor() {
        super()

        this.state = {
            username: '',
            password: '',
            validation_password: '',
            first_name: '',
            last_name: ''
        }
        this.register = () => {
            if (this.state.password === this.state.validation_password) {
                this.props.dispatch(requestRegister(this.state.username, this.state.password, this.state.first_name, this.state.last_name))
            } else {
                alert("validation password do not match!")
            }

        }

        this.resetState = () => { this.props.dispatch(reset_state()) }

        this.handleChange = (event) => {
            this.setState({ [event.target.name]: event.target.value })
        }
        this.handleSubmit = (event) => {
            event.preventDefault();
         }
    }

    render() {
        const { username, password, validation_password, first_name, last_name } = this.state

        return <form onSubmit={this.handleSubmit}>
            <div>
                <label>Username</label>
                <input type="text" name='username' value={username} onChange={evt => this.handleChange(evt)} />
            </div>
            <div>
                <label>First Name</label>
                <input type="text" name='first_name' value={first_name} onChange={evt => this.handleChange(evt)} />
            </div>
            <div>
                <label>Last Name</label>
                <input type="text" name='last_name' value={last_name} onChange={evt => this.handleChange(evt)} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" name='password' value={password} onChange={evt => this.handleChange(evt)} />
            </div>
            <div>
                <label>Repeat Password</label>
                <input type="password" name='validation_password' value={validation_password} onChange={evt => this.handleChange(evt)} />
            </div>
            <div>
                <input type="submit" value="sign up" onClick={this.register} />

                <input type="button" value="cancel" onClick={this.resetState} />
            </div>
        </form>
    }
}

export default connect()(Registration);