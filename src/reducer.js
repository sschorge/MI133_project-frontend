import {
    //actions from ./actions
    ACTION1
    } from './actions'
    
    const initialState = () => ({
       
    })
    
    export default function reducer(state = initialState(), action) {
        const {type, payload} = action
    
        switch (type) {
            case ACTION1: {
    
                return {
                    ...state
                }
            }
            default:
                return state
        }
    }
    