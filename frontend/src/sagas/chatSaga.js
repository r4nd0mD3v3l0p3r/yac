import { take, call, put } from 'redux-saga/effects'
import * as Actions from '../actions/actions'
import * as chatApi from '../apis/chatApi'

export function* fetchRooms() {
    yield take(Actions.FETCH_ROOMS_REQUEST)

    const rooms = yield call(chatApi.fetchRooms)

    if (rooms !== null)
        yield put(Actions.fetchRoomsOk(rooms))
    else
        yield put(Actions.fetchRoomsKo())
}