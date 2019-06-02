export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_OK = 'LOGIN_OK'
export const LOGIN_KO = 'LOGIN_KO'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_OK = 'LOGOUT_OK'
export const LOGOUT_KO = 'LOGOUT_KO'
export const FETCH_ROOMS_REQUEST = 'FETCH_ROOMS_REQUEST'
export const FETCH_ROOMS_OK = 'FETCH_ROOMS_OK'
export const FETCH_ROOMS_KO = 'FETCH_ROOMS_KO'
export const JOIN_ROOM_REQUEST = 'JOIN_ROOM_REQUEST'
export const JOIN_ROOM_OK = 'JOIN_ROOM_OK'
export const JOIN_ROOM_KO = 'JOIN_ROOM_KO'
export const LEAVE_ROOM_REQUEST = 'LEAVE_ROOM_REQUEST'
export const LEAVE_ROOM_OK = 'LEAVE_ROOM_OK'
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE'

export const loginRequest = (data) => {
    return { type: LOGIN_REQUEST, data }
}

export const loginOk = ({ token, user }) => {
    return { type: LOGIN_OK, data: { token, user } }
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

export const fetchRoomsRequest = () => {
    return { type: FETCH_ROOMS_REQUEST }
}

export const fetchRoomsOk = (data) => {
    return { type: FETCH_ROOMS_OK, data }
}

export const fetchRoomsKo = (message = '') => {
    return { type: FETCH_ROOMS_KO, message }
}

export const receiveMessage = (message) => {
    return { type: RECEIVE_MESSAGE, message }
}

export const joinRoomRequest = (data) => {
    return { type: JOIN_ROOM_REQUEST, data }
}

export const joinRoomOk = (data) => {
    return { type: JOIN_ROOM_OK, data }
}

export const sendMessage = (message) => {
    return { type: SEND_MESSAGE, message }
}

export const leaveRoomRequest = () => {
    return { type: LEAVE_ROOM_REQUEST }
}

export const leaveRoomOk = () => {
    return { type: LEAVE_ROOM_OK }
}