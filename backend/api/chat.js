import { rooms } from '../database'

export const mapChatRoutes = (app) => {
    app.get('/chat/rooms', async (req, res) => {
        const availableRooms = await rooms()

        res.json({ rooms: availableRooms })

        return res.status(200)
    })
}
