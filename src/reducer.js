import {
    //actions from ./actions
    ACTION1,
    SET_REGISTRATION,
    RESET_STATE
    } from './actions'
    
    const initialState = () => ({
        user:'',
        registration:false,
       
    })
    
    export default function reducer(state = initialState(), action) {
        const {type, payload} = action
        
        switch (type) {
            case SET_REGISTRATION: {
    
                return {
                    ...state,registration:true
                }
            }
            case RESET_STATE:{
                return state = initialState()

            }
            default:
                return state
        }
    }
    