// JavaScript File to define Actions for the Reducer

export const ACTION1 = 'ACTION1'
export const action1 = () => ({ type: ACTION1, payload: "" })

export const SET_REGISTRATION = 'REGISTRATION'
export const set_registration = () => ({ type: SET_REGISTRATION })

export const SET_LOGOUT = 'LOGOUT'
export const set_logout = () => ({ type: SET_LOGOUT })

export const RESET_STATE = 'RESET_STATE'
export const reset_state = () => ({ type: RESET_STATE })

export const SET_HIDE_MENUE = 'SET_HIDE_MENUE'
export const set_hide_menue = () => ({ type: SET_HIDE_MENUE })

export const SET_LOGIN = 'LOGIN'
export const set_login = (data) => {
    alert("set_login wird ausgeführt" + data);
    console.log(data)
    //console.log("backenddata" + data)
    return { type: SET_LOGIN, payload: data }
}

export const requestLogin = (username, password) => async dispatch => {
    alert("requestLogin wird ausgeführt \n" + "username: " + username + "\n" + "password: " + password)
    try {
        let url = "http://rcpoonkk8vbqkyiw.myfritz.net:3000/login";
        let data = {username:username,password:password};
        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        }).then(
        dispatch(set_login(data))
        )
    } catch (e) {
        console.error(e)
    }
}

//http://rcpoonkk8vbqkyiw.myfritz.net:3000/login