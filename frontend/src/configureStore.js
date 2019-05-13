import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers/rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        composeWithDevTools(applyMiddleware(loggerMiddleware))
    );
}