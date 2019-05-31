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
            cookies.set(Constants.USER_COOKIE, JSON.stringify(user), { path: '/' })

            return token
        }

        return null
    }
    catch (e) {
        return null
    }
}

export const logout = async (user, token) => {
    try {
        const response = await endpoint.post('/logout', { user, token })

        if (response.status === 200) {
            const cookies = new Cookies()

            cookies.remove (Constants.LOGIN_COOKIE)

            return true
        }

        return false
    }
    catch (e) {
        return false
    }
}
