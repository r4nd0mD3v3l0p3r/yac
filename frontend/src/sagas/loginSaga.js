import { take, call, put } from 'redux-saga/effects'
import * as Actions from '../actions/actions'
import * as LoginApi from '../apis/loginApi'

export function* loginFlow() {
    while (true) {
        const { data } = yield take(Actions.LOGIN_REQUEST)

        const { user, password } = data

        const token = yield call(LoginApi.login, user, password)

        if (token !== null) {
            yield put(Actions.loginOk({ token, user }))

            yield take(Actions.LOGOUT_REQUEST)

            const logoutOk = yield call(LoginApi.logout, user, token)

            if (logoutOk)
                yield put(Actions.logoutOk())
            else
                yield put(Actions.logoutKo())
        }
        else {
            yield put(Actions.loginKo())
        }
    }
}