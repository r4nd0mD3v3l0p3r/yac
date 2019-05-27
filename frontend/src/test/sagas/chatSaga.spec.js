import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { fetchRooms } from '../../sagas/chatSaga'
import * as Actions from '../../actions/actions'
import * as ChatApi from '../../apis/chatApi'

it('fetches chat rooms', () => {
    return expectSaga(fetchRooms)
        .provide([[matchers.call.fn(ChatApi.fetchRooms), ['Music', 'Sport']]])
        .put({ type: Actions.FETCH_ROOMS_OK, data: ['Music', 'Sport'] })
        .dispatch({ type: Actions.FETCH_ROOMS_REQUEST })
        .silentRun()
})