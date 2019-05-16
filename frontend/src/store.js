import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers/rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/rootSaga'
import { Map } from 'immutable'

const loggerMiddleware = createLogger()
const sagaMiddleware = createSagaMiddleware()

const store = configureStore()

function configureStore() {

    const store = createStore(
        rootReducer,
        Map({}),
        composeWithDevTools(applyMiddleware(sagaMiddleware, loggerMiddleware))
    )

    sagaMiddleware.run(rootSaga)

    return store
}

export default store