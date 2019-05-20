import socketIo from 'socket.io'

export const setup = (server) => {
    const io = socketIo(server)
    const chat = io.of('/chat')

    chat.on('connection', (socket) => joinRoom(socket))
}

const joinRoom = (socket) => {
    socket.on('join', (data) => {
        const { user, room } = data

        socket.join(room)
        socket.emit('message', `${user} has joined the room!`)
    })

    socket.on('disconnect', () => {

    })
}