import {
    //actions from ./actions
    SET_REGISTRATION,
    RESET_STATE,
    SET_HIDE_MENUE,
    SET_LOGIN,
    SET_LOGOUT
    } from './actions'
    
    const initialState = () => ({
        user:'',
        ui:{
            registration:false,
            hide_menue:false,
            login:false
        }
       
    })
    
    export default function reducer(state = initialState(), action) {
        const {type, payload} = action
        console.log(payload)
        switch (type) {
            case SET_REGISTRATION: {
                return {               
                    ...state,registration: payload.bool
                }
            }
            case SET_LOGIN: {
                return {
                    ...state, login:true, user:payload
                }
            }
            case SET_LOGOUT: {
                return {
                    ...state, login:false, user: ''
                }
            }
            case SET_HIDE_MENUE:{
                return {
                    ...state, hide_menue:true
                }
            }
            case RESET_STATE:{
                return state = initialState()
            }
            default:
                return state
        }
    }
    