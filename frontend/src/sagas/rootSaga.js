import { all } from 'redux-saga/effects'
import { loginFlow } from './loginSaga'
import { fetchRooms, joinRoom } from './chatSaga'

export default function* rootSaga() {
    yield all([
        loginFlow(),
        fetchRooms(),
        joinRoom()
    ])
}