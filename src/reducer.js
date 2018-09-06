import {
    //actions from ./actions
    SET_REGISTRATION,
    RESET_STATE,
    SET_HIDE_MENUE,
    SET_LOGIN,
    SET_LOGOUT,
    SET_CREATE_TRIP,
    SET_SIGN_TRIP
    } from './actions'
    
    const initialState = () => ({
        user:'',
        user_id:0,
        ui:{
            registration:false,
            hide_menue:false,
            login:false
        },
        trips:{
            create_trip: false,
            sign_trip: false,
            start_trip: false,
            end_trip: false,
        }   
    })
    
    export default function reducer(state = initialState(), action) {
        const {type, payload} = action
        switch (type) {
            case SET_REGISTRATION: {
                return {               
                    ...state,registration: payload.bool
                }
            }
            case SET_LOGIN: {
                return {
                    ...state, login:true, user: payload.username, user_id: payload.user_id
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
            case SET_CREATE_TRIP:{
                let trips = state.trips;
                trips.create_trip = payload.create_trip
                return {
                    
                    ...state, state: trips, hide_menue: payload.hide_menue
                }
            }
            case SET_SIGN_TRIP:{
                let trips = state.trips;
                trips.sign_trip = payload.sign_trip
                return {
                    ...state, state: trips, hide_menue: payload.hide_menue
                }
            }
            case RESET_STATE:{
                let trips = state.trips;
                trips.create_trip = false;
                trips.sign_trip = false;
                trips.start_trip = false;
                return {...state, state:trips ,registration:false, hide_menue:false}
            }
            default:
                return state
        }
    }
    