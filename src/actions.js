// JavaScript File to define Actions for the Reducer
import fetch from 'cross-fetch'

export const SET_REGISTRATION = 'REGISTRATION'
export const set_registration = (bool) => ({ type: SET_REGISTRATION, payload: bool })

export const SET_LOGOUT = 'LOGOUT'
export const set_logout = () => {
    let url = "http://rcpoonkk8vbqkyiw.myfritz.net:3000/logout";
    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }).then(res => res.json())
        .then(data => { alert(data.message) })
    return ({ type: SET_LOGOUT })
}

export const RESET_STATE = 'RESET_STATE'
export const reset_state = () => ({ type: RESET_STATE })

export const SET_HIDE_MENUE = 'SET_HIDE_MENUE'
export const set_hide_menue = () => ({ type: SET_HIDE_MENUE })

export const SET_CREATE_TRIP = 'SET_CREATE_TRIP'
export const set_create_trip = (create_trip, hide_menue) => ({ type: SET_CREATE_TRIP, payload: { create_trip, hide_menue } })

export const SET_SIGN_TRIP = 'SET_SIGN_TRIP'
export const set_sign_trip = (sign_trip, hide_menue) => ({ type: SET_SIGN_TRIP, payload: { sign_trip, hide_menue } })

export const SET_START_TRIP = 'SET_START_TRIP'
export const set_start_trip = (start_trip, hide_menue) => ({ type: SET_START_TRIP, payload: { start_trip, hide_menue } })

export const SET_END_TRIP = 'SET_END_TRIP'
export const set_end_trip = (end_trip, hide_menue) => ({ type: SET_END_TRIP, payload: { end_trip, hide_menue } })


export const SET_LOGIN = 'LOGIN'
export const set_login = (data, daten) => {
    let user_id = data.user;
    let username = daten.username;
    return { type: SET_LOGIN, payload: { username, user_id } }
}

export const requestLogin = (username, password) => async dispatch => {
    let url = "http://rcpoonkk8vbqkyiw.myfritz.net:3000/login";
    let daten = { username: username, password: password };
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(daten),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }).then(res => res.json())
        .then(data => {
            if (data.success) {
                dispatch(set_login(data, daten))
            } else {
                alert(data.message)
            }
        }
        )
}

export const requestRegister = (username, password, first_name, last_name) => async dispatch => {
    try {
        let url = "http://rcpoonkk8vbqkyiw.myfritz.net:3000/register";
        let daten = { username: username, password: password, first_name: first_name, last_name: last_name };
        return fetch(url, {
            method: "POST",
            body: JSON.stringify(daten),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        }).then(res => res.json())
            .then(data => {
                alert(data.message)
                dispatch(set_registration({ bool: data.success }))
            })
    } catch (e) {
        console.error(e)
    }
}

export const createTrip = (boat_id, crew, latitude, longitude, departure, arrival) => async dispatch => {
    try {
        let url = "http://rcpoonkk8vbqkyiw.myfritz.net:3000/create_trip";
        let daten = { boat_id, crew, latitude, longitude, departure, arrival };
        return fetch(url, {
            method: "POST",
            body: JSON.stringify(daten),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        }).then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert("Create Trip was Successful!")
                } else {
                    alert("Create Trip failed!")
                }
                dispatch(set_create_trip(data.success, data.success))
            })
    } catch (e) {
        console.error(e)
    }
}

export const joinTrip = (userid, tripid) => async dispatch => {
    try {
        let url = "http://rcpoonkk8vbqkyiw.myfritz.net:3000/join_trip";
        let member_id = userid
        let trip_id = tripid
        let daten = { trip_id, member_id };
        return fetch(url, {
            method: "POST",
            body: JSON.stringify(daten),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        }).then(res => res.json())
            .then(data => {
                console.log(data)
				dispatch(set_sign_trip(data.success, data.success))
            })
    } catch (e) {
        console.error(e)
    }
}

export const startTrip = (departure, tripid) => async dispatch => {
    try {
        let url = "http://rcpoonkk8vbqkyiw.myfritz.net:3000/start_trip";
        //let member_id = userid
        let trip_id = tripid
        let daten = { trip_id, departure };
        return fetch(url, {
            method: "POST",
            body: JSON.stringify(daten),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        }).then(res => res.json())
            .then(data => {
                console.log(data)
				dispatch(set_start_trip(data.success, data.success))
            })
    } catch (e) {
        console.error(e)
    }
}

export const endTrip = (arrival, tripid) => async dispatch => {
    try {
        let url = "http://rcpoonkk8vbqkyiw.myfritz.net:3000/end_trip";
        //let member_id = userid
        let trip_id = tripid
        let daten = { trip_id, arrival };
        return fetch(url, {
            method: "POST",
            body: JSON.stringify(daten),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        }).then(res => res.json())
            .then(data => {
                console.log(data)
				dispatch(set_end_trip(data.success, data.success))
            })
    } catch (e) {
        console.error(e)
    }
}

export function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();

    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
    return time;
}

export function checkID(array, member_id) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === member_id)
            return true;
    }
    return false;
}

//http://rcpoonkk8vbqkyiw.myfritz.net:3000/login