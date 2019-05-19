import { checkCredentials, changeStatus, findUser } from '../dbManager'

const authenticationToken = '1911'

export const mapLoginRoutes = (app) => {
    app.post('/login', async (req, res) => {
        const { user, password } = req.body
        const validCredentials = await checkCredentials(user, password)

        if (!validCredentials)
            return res.status(404).send()

        await changeStatus(user, true)

        res.json({ token: authenticationToken })

        return res.status(200)
    })

    app.post('/logout', async (req, res) => {
        const { user, token } = req.body

        const registeredUser = await findUser(user)

        if (authenticationToken !== token || registeredUser === null)
            res.status(404).send()

        await changeStatus(user, false)

        return res.status(200).send()
    })
}
