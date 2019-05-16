export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_OK = 'LOGIN_OK'
export const LOGIN_KO = 'LOGIN_KO'
export const LOGOUT = 'LOGOUT'

export const loginRequest = (data) => {
    return { type: LOGIN_REQUEST, data }
}

export const loginOk = (token) => {
    return { type: LOGIN_OK, token }
}

export const loginKo = (message = '') => {
    return { type: LOGIN_KO, message }
}