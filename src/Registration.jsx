import React from 'react';
import { connect } from 'react-redux';
import {
    //actions from ./actions
    reset_state
    } from './actions'
    

class Registration extends React.Component {
    constructor() {
        super()

        this.state = {
            email: '',
            nickname: '',
            password: '',
            retypedPassword: '',
            lastValidation: null
        }
        this.handleSubmit = event => {};

        this.resetState = ()=>{this.props.dispatch(reset_state())} 
            
    }
 
    render() {
        const {email, nickname, password, retypedPassword, lastValidation} = this.state
        const errorInfoLine = !lastValidation
            ? null
            : <div >{lastValidation}</div>

        return <form onSubmit={this.handleSubmit}>
            <div>
                <label>email</label>
                <input type="email" value={email}/>
            </div>
            <div>
                <label>nickname</label>
                <input type="text" value={nickname}/>
            </div>
            <div>
                <label>password</label>
                <input type="password" value={password}/>
            </div>
            <div>
                <label>repeat password</label>
                <input type="password" value={retypedPassword}/>
            </div>


            <div>
                <input type="submit" value="sign up"/>

                <input type="button" value="cancel" onClick={this.resetState}/>
            </div>
        </form>
    }
}

export default connect()(Registration);