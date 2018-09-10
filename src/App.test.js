import * as actions from './actions'
import reducer from './reducer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const setLoginUser = (user_id, username) => 
		actions.set_login({ user: user_id }, { username:username });
		
const randomString = () => {
	var text = ""
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

	for (var i=0;i<10;++i)
		text += possible.charAt(Math.floor(Math.random() * possible.length))

	return text
}

describe('the app logic', () => {
	let middlewares, mockStore, initialState;
	
	beforeEach(() => {
		middlewares = [ thunk ];
		mockStore = configureStore(middlewares);
	
		initialState = { 
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
		}
	})
	
	it('should return the initial state', () => {
		const newState = reducer(undefined, {})
		expect(newState).toEqual(initialState)
	});
	
	it('should set the login action', () => {
		const store = mockStore({})
		
		const expectedAction = {
			type: actions.SET_LOGIN,
			payload: {
				username: 'John Doe',
				user_id: 1,
			}
		}
		
		// check, whether the action is dispatched properly
		store.dispatch(setLoginUser(1, 'John Doe'))
		expect(store.getActions()[0]).toEqual(expectedAction)
		
		// check, whether the state is changed properly by testing the reducer
		const newState = reducer(undefined, setLoginUser(1, 'John Doe'))
		
		expect(newState.ui.login).toBeTruthy()
		expect(newState.user).toEqual('John Doe')
		expect(newState.user_id).toEqual(1)
	});

	it('should reset the state (RESET_STATE action)', () => {
		const store = mockStore({})
		
		// first, we have an arbitrarily state, where the user John Doe is logged in
		const currentState = {
			user: 'John Doe', 
			user_id: 1,
			ui:{
				login: true,
				registration:true,
				hide_menue:true,
			},
			trips:{
				create_trip: false,
				sign_trip: true,
				start_trip: false,
				end_trip: false,
			}  
		}
		
		const expectedState = {
			...currentState,
			ui:{
				...currentState.ui,
				registration:false,
				hide_menue:false,
			},
			trips:{
				...currentState.trips,
				create_trip: false,
				sign_trip: false,
				start_trip: false,
				end_trip: false,
			}  
		}
		
		// check, whether the action is dispatched properly
		store.dispatch(actions.reset_state())
		expect(store.getActions()[0].type).toEqual(actions.RESET_STATE)
		
		// We pass the currentState to the reducer, so that we can check
		// if the reducer works correctly
		const newState = reducer(currentState, actions.reset_state())
		expect(newState).toEqual(expectedState);
	});
	
	it('should set the regisration action', () => {
		const store = mockStore({})
		
		const expectedAction = { 
			type: actions.SET_REGISTRATION, 
			payload: {bool:true}
		}
		
		// check, whether the action is dispatched properly
		store.dispatch(actions.set_registration({bool:true}))
		expect(store.getActions()[0]).toEqual(expectedAction)
		
		// check, whether the state is changed properly by testing the reducer
		const newState = reducer(undefined, actions.set_registration({bool:true}))
		expect(newState.ui.registration).toBeTruthy()
	});
	
	it('should set the SET_CREATE_TRIP action', () => {
		const store = mockStore({})
		
		const expectedAction = { 
			type: actions.SET_CREATE_TRIP, 
			payload: {
				create_trip: true, 
				hide_menue: true
			}
		}
		
		// check, whether the action is dispatched properly
		store.dispatch(actions.set_create_trip(true, true))
		expect(store.getActions()[0]).toEqual(expectedAction)
		
		// check, whether the state is changed properly by testing the reducer
		const newState = reducer(undefined, actions.set_create_trip(true, true))
		
		expect(newState.trips.create_trip).toBeTruthy()
		expect(newState.ui.hide_menue).toBeTruthy()
	});
	
	it('should set the SET_START_TRIP action', () => {
		const store = mockStore({})
		
		const expectedAction = { 
			type: actions.SET_START_TRIP, 
			payload: {
				start_trip: true, 
				hide_menue: true
			}
		}
		
		// check, whether the action is dispatched properly
		store.dispatch(actions.set_start_trip(true, true))
		expect(store.getActions()[0]).toEqual(expectedAction)
		
		// check, whether the state is changed properly by testing the reducer
		const newState = reducer(undefined, actions.set_start_trip(true, true))
		
		expect(newState.trips.start_trip).toBeTruthy()
		expect(newState.ui.hide_menue).toBeTruthy()
	});
	
	it('should set the SET_END_TRIP action', () => {
		const store = mockStore({})
		
		const expectedAction = { 
			type: actions.SET_END_TRIP, 
			payload: {
				end_trip: true, 
				hide_menue: true
			}
		}
		
		// check, whether the action is dispatched properly
		store.dispatch(actions.set_end_trip(true, true))
		expect(store.getActions()[0]).toEqual(expectedAction)
		
		// check, whether the state is changed properly by testing the reducer
		const newState = reducer(undefined, actions.set_end_trip(true, true))
		
		expect(newState.trips.end_trip).toBeTruthy()
		expect(newState.ui.hide_menue).toBeTruthy()
	});
	
	it('should set the SET_SIGN_TRIP action', () => {
		const store = mockStore({})
		
		const expectedAction = { 
			type: actions.SET_SIGN_TRIP, 
			payload: {
				sign_trip: true, 
				hide_menue: true
			}
		}
		
		// check, whether the action is dispatched properly
		store.dispatch(actions.set_sign_trip(true, true))
		expect(store.getActions()[0]).toEqual(expectedAction)
		
		// check, whether the state is changed properly by testing the reducer
		const newState = reducer(undefined, actions.set_sign_trip(true, true))
		
		expect(newState.trips.sign_trip).toBeTruthy()
		expect(newState.ui.hide_menue).toBeTruthy()
	});
	
	it('should set the hide menu action', () => {
		const store = mockStore({})
	
		// check, whether the action is dispatched properly
		store.dispatch(actions.set_hide_menue())
		expect(store.getActions()[0].type).toEqual(actions.SET_HIDE_MENUE)
		
		// check, whether the state is changed properly by testing the reducer
		const newState = reducer(undefined, actions.set_hide_menue())
		expect(newState.ui.hide_menue).toBeTruthy()
	});
	
	it('should set the logout action', () => {
		const store = mockStore({})
		
		// check, whether the action is dispatched properly
		store.dispatch(actions.set_logout())
		expect(store.getActions()[0].type).toEqual(actions.SET_LOGOUT)
		
		// check, whether the state is changed properly by testing the reducer
		const newState = reducer(undefined, actions.set_logout())
		
		expect(newState.ui.login).toBeFalsy()
		expect(newState.user).toEqual('')
		expect(newState.user_id).toEqual(0)
	});	
	
	it('should request register at the backend', () => {
		const store = mockStore({})
		
		return store.dispatch(actions.requestRegister(randomString(), 'password', 'John', 'Doe'))
			.then(() => {
				const expectedAction = { 
					type: actions.SET_REGISTRATION, 
					payload: {bool:true}
				}
				// check, whether the action is dispatched properly
				expect(store.getActions()[0]).toEqual(expectedAction)
			})
	});

	it('should request log in at the backend', () => {
		const store = mockStore({})
		
		return store.dispatch(actions.requestLogin('username', 'password'))
			.then(() => {
				// check, whether the action is dispatched properly
				expect(store.getActions()[0].type).toEqual(actions.SET_LOGIN)
			})
	});
	
	it('should create a trip at the backend', () => {
		const store = mockStore({})
		
		return store.dispatch(actions.createTrip(1, ['username'], 50, 50, 1506067538, 1535959524))
			.then(() => {
				const expectedAction =  { 
					type: actions.SET_CREATE_TRIP, 
					payload: {
						create_trip: true, 
						hide_menue: true
					}
				}
				// check, whether the action is dispatched properly
				expect(store.getActions()[0]).toEqual(expectedAction)
			})
	});
	
	it('should start a trip at the backend', () => {
		const store = mockStore({})
		
		return store.dispatch(actions.startTrip(1506067538, 1))
			.then(() => {
				const expectedAction =  { 
					type: actions.SET_START_TRIP, 
					payload: {
						start_trip: true, 
						hide_menue: true
					}
				}
				// check, whether the action is dispatched properly
				expect(store.getActions()[0]).toEqual(expectedAction)
			})
	});
	
	it('should end a trip at the backend', () => {
		const store = mockStore({})
		
		return store.dispatch(actions.endTrip(1506067600, 1))
			.then(() => {
				const expectedAction =  { 
					type: actions.SET_END_TRIP, 
					payload: {
						end_trip: true, 
						hide_menue: true
					}
				}
				// check, whether the action is dispatched properly
				expect(store.getActions()[0]).toEqual(expectedAction)
			})
	});
	
	it('should join a trip at the backend', () => {
		const store = mockStore({})
		
		return store.dispatch(actions.joinTrip(1, 1))
			.then(() => {
				const expectedAction =  { 
					type: actions.SET_SIGN_TRIP, 
					payload: {
						sign_trip: true, 
						hide_menue: true
					}
				}
				// check, whether the action is dispatched properly
				expect(store.getActions()[0]).toEqual(expectedAction)
			})
	});
});