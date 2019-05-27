import { all } from 'redux-saga/effects'
import { loginFlow } from './loginSaga'
import { fetchRooms } from './chatSaga'

export default function* rootSaga() {
    yield all([
        loginFlow(),
        fetchRooms()
    ])
}