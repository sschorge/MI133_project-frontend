import {
    //actions from ./actions
    ACTION1,
    SET_REGISTRATION,
    RESET_STATE,
    SET_CREATE_TRIP
    } from './actions'
    
    const initialState = () => ({
        user:'',
        ui:{
            registration:false,
            create_trip:false
        }
       
    })
    
    export default function reducer(state = initialState(), action) {
        const {type, payload} = action
        
        switch (type) {
            case SET_REGISTRATION: {
    
                return {
                    ...state,registration:true
                }
            }
            case SET_CREATE_TRIP:{
                return {
                    ...state, create_trip:true
                }
            }
            case RESET_STATE:{
                return state = initialState()

            }
            default:
                return state
        }
    }
    