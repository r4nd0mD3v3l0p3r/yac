export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_OK = 'LOGIN_OK'
export const LOGIN_KO = 'LOGIN_KO'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_OK = 'LOGOUT_OK'
export const LOGOUT_KO = 'LOGOUT_KO'

export const loginRequest = (data) => {
    return { type: LOGIN_REQUEST, data }
}

export const loginOk = (token) => {
    return { type: LOGIN_OK, token }
}

export const loginKo = (message = '') => {
    return { type: LOGIN_KO, message }
}

export const logoutRequest = () => {
    return { type: LOGOUT_REQUEST }
}

export const logoutOk = () => {
    return { type: LOGOUT_OK }
}

export const logoutKo = () => {
    return { type: LOGOUT_KO }
}