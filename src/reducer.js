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
                    ...state, 
					ui: {
						...state.ui,
						registration: payload.bool
					}
                }
            }
            case SET_LOGIN: {
                return {
                    ...state, 
					ui: {
						...state.ui,
						login: true
					},					
					user: payload.username, 
					user_id: payload.user_id
                }
            }
            case SET_LOGOUT: {
                return {
                    ...state, 
					ui: {
						...state.ui,
						login: false
					},
					user_id: 0,
					user: ''
                }
            }
            case SET_HIDE_MENUE:{
                return {
                    ...state, 
					ui: {
						...state.ui,
						hide_menue: true
					}
                }
            }
            case SET_CREATE_TRIP:{
                return {
                    ...state, 
					trips: {
						...state.trips,
						create_trip: payload.create_trip
					},
					ui: {
						...state.ui,
						hide_menu: payload.hide_menue
					}
                }
            }
            case SET_SIGN_TRIP:{
                return {
                    ...state, 
					trips : {
						...state.trips,
						sign_trip: payload.sign_trip
					},
					ui: {
						...state.ui,
						hide_menue: payload.hide_menue
					}
                }
            }
            case RESET_STATE:{
                return {	
					...state, 
					trips: {
						...state.trips,
						create_trip: false, 
						sign_trip: false, 
						start_trip: false, 
						end_trip: false 
					}, 
					ui: {
						...state.ui,
						registration: false,
						hide_menue: false
					}
				}
            }
            default:
                return state
        }
    }
    