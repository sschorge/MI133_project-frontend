// JavaScript File to define Actions for the Reducer

export const SET_REGISTRATION = 'REGISTRATION'
export const set_registration = (bool) => ({ type: SET_REGISTRATION, payload: bool })

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
    return { type: SET_LOGIN, payload: data }
}

export const requestLogin = (username, password) => async dispatch => {
    //alert("requestLogin wird ausgeführt \n" + "username: " + username + "\n" + "password: " + password)
    try {
        let url = "http://rcpoonkk8vbqkyiw.myfritz.net:3000/login";
        let data = { username: username, password: password };
        /*
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
           */
          const response = await    fetch(url, {
            method: 'post',
            //mode: 'cors',
            //redirect: 'follow',
            body: JSON.stringify(data),
            headers: {
                //Accept: 'application/json',
                //'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
            
        });
        const json = await response.text();
        console.log(json);
            /*(response) => response.text())
        .then((responseJson) => {        
          console.log(responseJson);
        })
        .catch((error) => {
          console.error(error);
        });
        /*fetch('http://rcpoonkk8vbqkyiw.myfritz.net:3000/login', {
            method: 'post',
            body: JSON.stringify(data)
          }).then(
            dispatch(set_login(data))
            )
        */

    } catch (e) {
        console.error(e)
    }
}

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