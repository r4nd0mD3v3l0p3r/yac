import { take, call, put, fork, cancel } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import * as Actions from '../actions/actions'
import * as ChatApi from '../apis/chatApi'
import io from 'socket.io-client'

const endpoint = 'http://localhost:3001/chat'

export function* fetchRooms() {
    yield take(Actions.FETCH_ROOMS_REQUEST)

    const rooms = yield call(ChatApi.fetchRooms)

    if (rooms !== null)
        yield put(Actions.fetchRoomsOk(rooms))
    else
        yield put(Actions.fetchRoomsKo())
}

export function* joinRoom() {
    while (true) {
        const { data } = yield take(Actions.JOIN_ROOM_REQUEST)

        const { room, user } = data;

        const socket = io(endpoint)

        const socketChannel = yield call(createSocketChannel, socket, room, user)

        const receiverTask = yield fork(messageReceiver, socketChannel)
        const senderTask = yield fork(messageSender, socket, user, room)

        yield put(Actions.joinRoomOk(room))

        yield take(Actions.LEAVE_ROOM_REQUEST)

        yield cancel(receiverTask)
        yield cancel(senderTask)
        socketChannel.close()

        yield put(Actions.leaveRoomOk())
    }
}

function createSocketChannel(socket, room, user) {
    return eventChannel(emit => {
        const joinRoom = (event) => {
            socket.emit('join', { room, user })
        }

        const incomingMessageHandler = (event) => {
            emit(event.message)
        }

        const errorHandler = (errorEvent) => {
            emit(new Error(errorEvent.reason))
        }

        socket.on('connect', joinRoom)
        socket.on('message', incomingMessageHandler)
        socket.on('error', errorHandler)

        const unsubscribe = () => {
            socket.emit('leave', { room, user })

            socket.off('join', joinRoom)
            socket.off('message', incomingMessageHandler)
            socket.off('error', errorHandler)
        }

        return unsubscribe
    })
}

function* messageReceiver(socketChannel) {
    while (true) {
        try {
            const message = yield take(socketChannel)

            yield put(Actions.receiveMessage(message))
        }
        catch (e) {
        }
    }
}

function* messageSender(socket, user, room) {
    while (true) {
        const { message } = yield take(Actions.SEND_MESSAGE)

        socket.emit('message', { room, message: { text: message, author: user } })
    }
}
