import { combineReducers } from 'redux-immutable'
import { fromJS } from 'immutable'
import * as Actions from '../actions/actions'
import * as Constants from '../Constants'
import { reduce as reduceUser } from './userReducer'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()

const initialState = fromJS(
    {
        user: {
            loggedIn: cookies.get(Constants.LOGIN_COOKIE) !== undefined,
            fetching: false,
            invalidCredentials: false
        }
    })

const store = (state = initialState, action) => {
    switch (action.type) {
        case Actions.LOGIN_REQUEST:
        case Actions.LOGIN_OK:
        case Actions.LOGIN_KO:
            return state.setIn(['user'], reduceUser(state.get('user'), action))
        default:
            return state
    }
}

const rootReducer = combineReducers({
    store
})

export default rootReducer