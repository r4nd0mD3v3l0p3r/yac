import socketIo from 'socket.io'
import { userLogsIn } from './database'

export const setup = async (server) => {
    const io = socketIo(server)
    const chat = io.of('/chat')

    chat.on('connection', async (socket) => await joinRoom(socket, chat))
}

const joinRoom = async (socket, chat) => {
    socket.on('join', async (data) => {
        const { user, room } = data

        await userLogsIn(user, room)

        socket.join(room)
        socket.in(room).emit('message', { message: { text: `${user} has joined the room!`, author: '' } })
    })

    socket.on('message', (data) => {
        const { message, room } = data

        chat.in(room).emit('message', { message })
    })

    socket.on('leave', async (data) => {
        const { user, room } = data

        socket.in(room).emit('message', { room, message: { text: `${user} has left the room`, author: '' } })
    })

    socket.on('disconnect', () => {
    })
}