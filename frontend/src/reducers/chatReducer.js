import * as Actions from '../actions/actions'
import { fromJS } from 'immutable'

const initialState = fromJS(
    {
        rooms: [],
        fetching: false,
        onlineUsers: [],
        messages: []
    }
)

export default (state = initialState, action) => {
    switch (action.type) {
        case Actions.FETCH_ROOMS_REQUEST:
            return state.merge({ 'fetching': true, rooms: [] })
        case Actions.FETCH_ROOMS_OK:
            return state.merge({ 'fetching': false, rooms: action.data })
        case Actions.FETCH_ROOMS_KO:
            return state.merge({ 'fetching': false, rooms: [] })
        case Actions.RECEIVE_MESSAGE:
            return state.update('messages', (messages) => Array.from(messages).concat(action.messages))
        default:
            return state
    }
}