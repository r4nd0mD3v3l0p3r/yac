import * as Actions from '../actions/actions'

export const reduce = (state, action) => {
    switch (action.type) {
        case Actions.LOGIN_REQUEST:
            return state.merge({ 'fetching': true, 'invalidCredentials': false, 'loggedIn': false })
        case Actions.LOGIN_OK:
            return state.merge({ 'fetching': false, 'invalidCredentials': false, 'loggedIn': true })
        case Actions.LOGIN_KO:
            return state.merge({ 'fetching': false, 'invalidCredentials': true, 'loggedIn': false })
        default:
            return state
    }
}