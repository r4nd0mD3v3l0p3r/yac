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
        socket.in(room).emit('system-message', { message: `${user} has joined the room!`, room })
    })

    socket.on('disconnect', () => {

    })
}