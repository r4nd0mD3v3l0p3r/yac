import { put, takeLatest, all } from 'redux-saga/effects'
import { loginFlow } from './loginSaga'

export default function* rootSaga() {
    yield all([
        loginFlow()
    ])
 }