import * as actions from './actions'
import reducer from './reducer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetch from 'cross-fetch'

const setLoginUser = (user_id, username) => 
		actions.set_login({ user: user_id }, { username:username });
		
const randomString = () => {
	var text = ""
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

	for (var i=0;i<20;++i)
		text += possible.charAt(Math.floor(Math.random() * possible.length))

	return text
}

describe('the app logic', () => {
	let middlewares, mockStore, initialState, username, user_id = 0, loginSuccessful;
	
	beforeAll(() => {
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
		
		// First, we need to login a dummy user
		const store = mockStore({})
		username = randomString()
		
		store.dispatch(actions.requestRegister(username, 'password', 'John', 'Doe'))
			.then(() => {
				if (store.getActions()[0].payload.bool) { // registering was successful
					store.dispatch(actions.requestLogin(username, 'password'))
						.then(() => {
							const storeActions = store.getActions()
							
							if (storeActions[0].type == actions.SET_LOGIN) 
								user_id = storeActions[0].payload.user_id
						})
				}
			})
			.catch(e => {
				console.error(e)
			})
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
		
		// check, whether the state is changed properly by testing the reducer
		const newState = reducer(undefined, { type: actions.SET_LOGOUT })
		
		expect(newState.ui.login).toBeFalsy()
		expect(newState.user).toEqual('')
		expect(newState.user_id).toEqual(0)
	});	
	
	it('should request register, login and logout at the backend', () => {
		const store = mockStore({})
		const user = randomString()
		
		return store.dispatch(actions.requestRegister(randomString(), 'password', 'John', 'Doe'))
			.then(() => {
				const expectedAction = { 
					type: actions.SET_REGISTRATION, 
					payload: {bool:true}
				}
				// check, whether the action is dispatched properly
				expect(store.getActions()[0]).toEqual(expectedAction)
				
				return store.dispatch(actions.requestLogin(user, 'password'))
					.then(() => {
						expect(store.getActions()[0].type).toEqual(actions.SET_LOGIN)
						
						return store.dispatch(actions.set_logout())
							.then(() => {
								expect(store.getActions()[0].type).toEqual(actions.SET_LOGOUT)
							})
					})
			})
	});
	
	it('should create, start and end a trip at the backend', () => {
		const store = mockStore({})
		
		// We need a user to perform the tests
		expect(user_id).not.toEqual(0)
		
		return fetch("http://localhost:3000/get_boats", {
				 method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
				credentials: "same-origin"
			})
			.then(response => { return response.json() })
			.then(data => {
				const boats = data.boat
				
				// We have to ensure, that at least 1 boat is available for testing
				expect(boats.length).toBeGreaterThan(0)
				
				return store.dispatch(actions.createTrip(boats[0].id, [username], 50, 50, 1506067538, 1535959524))
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
						
						return fetch("http://localhost:3000/view_trips", {
							method: "POST",
							body: JSON.stringify({ id: "all" }),
							headers: {
								"Content-Type": "application/json"
							},
							credentials: "same-origin"
						})
						.then(response => 
							response.json()
						)
						.then(data => { 
							const trips = data.trips
							
							// We have to ensure, that at least 1 trip is available for testing
							expect(trips.length).toBeGreaterThan(0)
							
							return store.dispatch(actions.startTrip(1506067538, trips[0].trip_id))
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
									
									return store.dispatch(actions.endTrip(1506067600, trips[0].trip_id))
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
								})
						})
					})
			})
		
	});
});