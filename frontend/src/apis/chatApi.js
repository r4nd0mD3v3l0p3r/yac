import { endpoint } from './commonApi'

export const fetchRooms = async () => {
    try {
        const response = await endpoint.get('/chat/rooms')

        if (response.status === 200) {

            return response.data.rooms
        }

        return null
    }
    catch (e) {
        return null
    }
}