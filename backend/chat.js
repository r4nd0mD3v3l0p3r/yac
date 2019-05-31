import socketIo from 'socket.io'
import { userLogsIn } from './database'

export const setup = async (server) => {
    const io = socketIo(server)
    const chat = io.of('/chat')

    chat.on('connection', async (socket) => await joinRoom(socket))
}

const joinRoom = async (socket) => {
    socket.on('join', async (data) => {
        const { user, room } = data

        await userLogsIn(user, room)

        socket.join(room)
        socket.to(room).emit('messages', { messages: [{ text: `${user} has joined the room!`, author: '' }] })
    })

    socket.on('messages', (data) => {
        const { messages, room } = data

        socket.to(room).emit('messages', { messages })
    })

    socket.on('disconnect', () => {

    })
}