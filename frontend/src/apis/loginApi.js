import { Cookies } from 'react-cookie'
import * as Constants from '../Constants'
import { endpoint } from './commonApi'

export const login = async (user, password) => {
    try {
        const response = await endpoint.post('/login', { user, password })

        if (response.status === 200) {
            const { token } = response.data
            const cookies = new Cookies()

            cookies.set(Constants.LOGIN_COOKIE, JSON.stringify(token), { path: '/' })

            return token
        }

        return null
    }
    catch (e) {
        return null
    }
}
