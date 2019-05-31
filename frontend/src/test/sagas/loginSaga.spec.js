import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { loginFlow } from '../../sagas/loginSaga'
import * as Actions from '../../actions/actions'
import * as LoginApi from '../../apis/loginApi'

it('lets the user log in and then out', () => {
    return expectSaga(loginFlow)
        .provide([[matchers.call.fn(LoginApi.login), 'token'], [matchers.call.fn(LoginApi.logout), true]])
        .put({ type: Actions.LOGIN_OK, data: { token: 'token', user: 'aUser' } })
        .put({ type: Actions.LOGOUT_OK })
        .dispatch({ type: Actions.LOGIN_REQUEST, data: { user: 'aUser', password: 'aPassword' } })
        .dispatch({ type: Actions.LOGOUT_REQUEST })
        .silentRun()
})