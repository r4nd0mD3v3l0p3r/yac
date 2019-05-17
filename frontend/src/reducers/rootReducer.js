import { combineReducers } from 'redux-immutable'
import user from './userReducer'

const rootReducer = combineReducers({
    user
})

export default rootReducer