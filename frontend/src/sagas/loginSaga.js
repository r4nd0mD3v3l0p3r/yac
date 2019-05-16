import { take, call, put } from 'redux-saga/effects'
import * as Actions from '../actions/actions'
import * as LoginApi from '../apis/loginApi'

export function* loginFlow() {
    while (true) {
        const { data } = yield take(Actions.LOGIN_REQUEST)

        const { user, password } = data

        let token = null

        try {
            token = yield call(LoginApi.login, user, password)
        }
        catch (e) {
            yield put(Actions.loginKo())
        }

        if (token !== null)
            yield put(Actions.loginOk(token))
        else
            yield put(Actions.loginKo())

    }
}