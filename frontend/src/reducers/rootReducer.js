import { combineReducers } from 'redux'

const initialState = {}

const store = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    store
});

export default rootReducer;