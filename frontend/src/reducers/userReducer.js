import * as Actions from '../actions/actions'
import * as Constants from '../Constants'
import { fromJS } from 'immutable'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()

const initialState = fromJS(
    {
        loggedIn: cookies.get(Constants.LOGIN_COOKIE) !== undefined,
        fetching: false,
        invalidCredentials: false,
        user: cookies.get(Constants.USER_COOKIE) || ''
    })

export default (state = initialState, action) => {
    switch (action.type) {
        case Actions.LOGIN_REQUEST:
            return state.merge({ 'fetching': true, 'invalidCredentials': false, 'loggedIn': false, user: '' })
        case Actions.LOGIN_OK:
            return state.merge({ 'fetching': false, 'invalidCredentials': false, 'loggedIn': true, user: action.data.user })
        case Actions.LOGIN_KO:
            return state.merge({ 'fetching': false, 'invalidCredentials': true, 'loggedIn': false, user: '' })
        case Actions.LOGOUT_REQUEST:
            return state.merge({ 'fetching': true, 'invalidCredentials': false, 'loggedIn': true })
        case Actions.LOGOUT_OK:
            return state.merge({ 'fetching': false, 'invalidCredentials': false, 'loggedIn': false, user: '' })
        case Actions.LOGOUT_KO:
            return state.merge({ 'fetching': false, 'invalidCredentials': false, 'loggedIn': true })
        default:
            return state
    }
}