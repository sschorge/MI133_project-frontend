import React from 'react'
import { connect } from 'react-redux'
import { action1 } from './actions'

export default class Menue extends React.Component {
    constructor() {
        super()
        this.handleClick = (val)=>()=>{this.props.dispatch(action1())}
    }

    render() {
        //const {width, height} = this.props

        return <div className="CreateTrip">
            <button onClick={this.handleClick()}> create </button>
        </div>
    }
}