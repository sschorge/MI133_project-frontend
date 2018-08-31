import * as actions from './actions'
import reducer from './reducer';
import initialState from './reducer';
import {requestLogin} from './actions';

describe('the app logic', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState());
	});

	it('should reset the state (RESET_STATE action)', () => {
		expect(reducer(undefined, actions.reset_state())).toEqual(initialState());
	});
	
	it('should set the regisration', () => {
		const newState = reducer(undefined, actions.set_registration())
		expect(newState).toHaveProperty('registration')
	});
	
	it('should set the login', () => {
		const expectedAction = {
		  type: actions.SET_LOGIN,
		  payload: "username"
		}
		const data = {message: "Congrats username! You logged in successfully!"}
		const daten = {username: "username", password: "password"}
		
		expect(actions.set_login(data, daten)).toEqual(expectedAction)
	});
	
	it('should hide the menu', () => {
		const newState = reducer(undefined, actions.set_hide_menue())
		expect(newState.hide_menue).toEqual(true)
	});
	
	it('should set the logout', () => {
		const newState = reducer(undefined, actions.set_logout())
		expect(newState.login).toEqual(false)
	});	
	
	it('should request register', () => {
		requestRegister('test', 'test', 'Test', 'Test')
	});

	it('should log in', () => {
		requestLogin('test', 'test')
	});
});