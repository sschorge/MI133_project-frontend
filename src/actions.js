// JavaScript File to define Actions for the Reducer
import fetch from 'cross-fetch'

export const SET_REGISTRATION = 'REGISTRATION'
export const set_registration = (bool) => ({ type: SET_REGISTRATION, payload: bool })

export const SET_LOGOUT = 'LOGOUT'
export const set_logout = () => ({ type: SET_LOGOUT })

export const RESET_STATE = 'RESET_STATE'
export const reset_state = () => ({ type: RESET_STATE })

export const SET_HIDE_MENUE = 'SET_HIDE_MENUE'
export const set_hide_menue = () => ({ type: SET_HIDE_MENUE })

export const SET_LOGIN = 'LOGIN'
export const set_login = (data,daten) => {
    //console.log("username:"+ username)
    console.log( data)
    return { type: SET_LOGIN, payload:daten.username}
}

export const requestLogin = (username, password) => async dispatch => {
    //alert("requestLogin wird ausgeführt \n" + "username: " + username + "\n" + "password: " + password)
    console.log("in requestLogin " + username, password);
    let url = "http://rcpoonkk8vbqkyiw.myfritz.net:3000/login";
    let daten = { username: username, password: password };
    fetch(url, {
        method: "POST",
        body: JSON.stringify(daten),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }).then(res => res.json())
        .then(data => dispatch(set_login(data,daten))
        )
}


/*export const requestLogin = (username, password) => async dispatch => {
    const loginRes = await axios.post('http://rcpoonkk8vbqkyiw.myfritz.net:3000/login', {username, password})
    dispatch(set_login(loginRes.data))
  }
*/
export const requestRegister = (username, password, first_name, last_name) => async dispatch => {
    try {
        let url = "http://rcpoonkk8vbqkyiw.myfritz.net:3000/register";
        let data = { username: username, password: password, first_name: first_name, last_name: last_name };
        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        }).then(
            dispatch(set_registration({ bool: false }))
        )
    } catch (e) {
        console.error(e)
    }
}

//http://rcpoonkk8vbqkyiw.myfritz.net:3000/login