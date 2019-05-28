import { take, call, put } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import * as Actions from '../actions/actions'
import * as chatApi from '../apis/chatApi'
import io from 'socket.io-client'

const endpoint = 'http://localhost:3001/chat'

export function* fetchRooms() {
    yield take(Actions.FETCH_ROOMS_REQUEST)

    const rooms = yield call(chatApi.fetchRooms)

    if (rooms !== null)
        yield put(Actions.fetchRoomsOk(rooms))
    else
        yield put(Actions.fetchRoomsKo())
}

export function* joinRoom() {
    while (true) {
        const data = yield take(Actions.JOIN_ROOM_REQUEST)

        const { room, user } = data;

        const socket = io(endpoint)

        const socketChannel = yield call(createSocketChannel, socket, room, user)

        while (true) {
            try {
                const payload = yield take(socketChannel)
            }
            catch (e) {

            }
        }
    }
}

function createSocketChannel(socket, room, user) {
    return eventChannel(emit => {
        const joinRoom = (event) => {
            socket.emit('join', room)
        }

        const incomingMessageHandler = (event) => {
            emit(event.payload)
        }

        const errorHandler = (errorEvent) => {
            emit(new Error(errorEvent.reason))
        }

        socket.on('connect', joinRoom)
        socket.on('message', incomingMessageHandler)
        socket.on('error', errorHandler)

        const unsubscribe = () => {
            socket.off('join', joinRoom)
            socket.off('message', incomingMessageHandler)
        }

        return unsubscribe
    })
}