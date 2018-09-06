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

export const SET_CREATE_TRIP = 'SET_CREATE_TRIP'
export const set_create_trip = (create_trip, hide_menue) => ({ type: SET_CREATE_TRIP, payload: create_trip, hide_menue })

export const SET_SIGN_TRIP = 'SET_SIGN_TRIP'
export const set_sign_trip = (sign_trip, hide_menue) => ({ type: SET_SIGN_TRIP, payload: sign_trip, hide_menue })

export const SET_LOGIN = 'LOGIN'
export const set_login = (data, daten) => {
    let user_id = data.user.id;
    let username = daten.username;
    return { type: SET_LOGIN, payload: { username, user_id } }
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
        .then(data => dispatch(set_login(data, daten)))
}

export const requestRegister = (username, password, first_name, last_name) => async dispatch => {
    try {
        let url = "http://rcpoonkk8vbqkyiw.myfritz.net:3000/register";
        let daten = { username: username, password: password, first_name: first_name, last_name: last_name };
        fetch(url, {
            method: "POST",
            body: JSON.stringify(daten),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        }).then(res => res.json())
            .then(data => {
                alert(data.message)
                dispatch(set_registration({ bool: !data.success }))
            })
    } catch (e) {
        console.error(e)
    }
}

export const createTrip = (boat_id, crew, latitude, longitude, departure, arrival) => async dispatch => {
    try {
        let url = "http://rcpoonkk8vbqkyiw.myfritz.net:3000/create_trip";
        let daten = { boat_id, crew, latitude, longitude, departure, arrival };
        console.log(daten)
        fetch(url, {
            method: "POST",
            body: JSON.stringify(daten),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    alert("Create Trip was Successful!")
                } else {
                    alert("Create Trip failed!")
                }
                dispatch(set_create_trip({ bool: !data.success, hide_menue: false }))
            })
    } catch (e) {
        console.error(e)
    }
}

export const joinTrip = (userid, tripid) => async dispatch => {
    console.log("joinTrip funcsion " + userid + " " + tripid)
    try {
        let url = "http://rcpoonkk8vbqkyiw.myfritz.net:3000/join_trip";
        let member_id = userid
        let trip_id = tripid
        let daten = {trip_id,member_id };
        console.log(daten)
        fetch(url, {
            method: "POST",
            body: JSON.stringify(daten),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        }).then(res => res.json())
            .then(data => {
                console.log(data)
            })
    } catch (e) {
        console.error(e)
    }
}


//http://rcpoonkk8vbqkyiw.myfritz.net:3000/login