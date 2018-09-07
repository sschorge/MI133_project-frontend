import * as actions from './actions'
import reducer from './reducer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

describe('the app logic', () => {
	const middlewares = [ thunk ];
	const mockStore = configureStore(middlewares);
	const initialState = { 
		user:'',
		ui: {
			registration:false,
			hide_menue:false,
			login:false
		}   
	}
	
	it('should return the initial state', () => {
		const newState = reducer(undefined, {})
		expect(newState).toEqual(initialState);
	});

	it('should reset the state (RESET_STATE action)', () => {
		const newState = reducer(undefined, actions.reset_state())
		expect(newState).toEqual(initialState);
	});
	
	it('should set the regisration', () => {
		const store = mockStore({})
		
		const expectedAction = { 
			type: actions.SET_REGISTRATION, 
			payload: {bool:true}
		}
		
		// check, whether the action is dispatched properly
		store.dispatch(actions.set_registration({bool:true}))
		expect(store.getActions()[0]).toEqual(expectedAction)
		
		// check, whether the state is changed properly while testing the reducer
		const newState = reducer(undefined, actions.set_registration({bool:true}))
		expect(newState.ui.registration).toEqual(true)
	});
	
	it('should set the login', () => {
		const store = mockStore({})
		
		const expectedAction = {
		  type: actions.SET_LOGIN,
		  payload: "username"
		}
		const data = {message: "Congrats username! You logged in successfully!"}
		const daten = {username: "username", password: "password"}
		
		// check, whether the action is dispatched properly
		store.dispatch(actions.set_login(data, daten))
		expect(store.getActions()[0]).toEqual(expectedAction)
		
		// check, whether the state is changed properly while testing the reducer
		const newState = reducer(undefined, actions.set_login(data, daten))
		expect(newState.ui.login).toEqual(true)
	});
	
	it('should hide the menu', () => {
		const newState = reducer(undefined, actions.set_hide_menue())
		expect(newState.ui.hide_menue).toEqual(true)
	});
	
	it('should set the logout', () => {
		const newState = reducer(undefined, actions.set_logout())
		expect(newState.ui.login).toEqual(false)
	});	
	
	it('should request register at the backend', () => {
		const store = mockStore({})
		
		return store.dispatch(actions.requestRegister('username', 'password', 'Test', 'Test'))
			.then(() => {
				const expectedAction = { 
					type: actions.SET_REGISTRATION, 
					payload: true
				}
				const actions = store.getActions()
				
				// check, whether the action is dispatched properly
				expect(actions[0]).toEqual(expectedAction)
			})
	});

	it('should request log in at the backend', () => {
		const store = mockStore({})
		
		return store.dispatch(actions.requestLogin('username', 'password'))
			.then(() => {
				const expectedAction = {
				  type: actions.SET_LOGIN,
				  payload: "username"
				}
				const actions = store.getActions()
				
				// check, whether the action is dispatched properly
				expect(actions[0]).toEqual(expectedAction)
			})
	});
	
	it('should create a trip at the backend', () => {
		const store = mockStore({})
		
		return store.dispatch(actions.createTrip(1, ['username'], 50, 50, 1506067538, 1535959524))
			.then(() => {
				const expectedAction =  { 
					type: 'CREATE_TRIP',
					payload: {
						boat_id: 1,
						crew: [ 'username' ],
						latitude: 50,
						longitude: 50,
						departure: 1506067538,
						arrival: 1535959524 
					}
				}
				const actions = store.getActions()
				
				// check, whether the action is dispatched properly
				expect(actions[0]).toEqual(expectedAction)
			})
	});
});