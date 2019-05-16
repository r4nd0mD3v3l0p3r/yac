import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { loginFlow } from '../../sagas/loginSaga'
import * as Actions from '../../actions/actions'
import * as LoginApi from '../../apis/loginApi'

it('lets the user log in and then out', () => {
    return expectSaga(loginFlow)
        .provide([[matchers.call.fn(LoginApi.login), 'token']])
        .put({ type: Actions.LOGIN_OK, token: 'token' })
        .dispatch({ type: Actions.LOGIN_REQUEST, data: { user: 'aUser', password: 'aPassword' } })
        .silentRun()
})