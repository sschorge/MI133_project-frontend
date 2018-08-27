import {
    //actions from ./actions
    ACTION1,
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
        
        switch (type) {
            case SET_REGISTRATION: {
                return {
                    ...state,registration:true
                }
            }
            case SET_LOGIN: {
                return {
                    ...state, login:true
                }
            }
            case SET_LOGOUT: {
                return {
                    ...state, login:false
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
    