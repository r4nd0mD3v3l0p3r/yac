import { checkCredentials, changeStatus } from '../dbManager'

export const mapLoginRoutes = (app) => {
    app.post('/login', async (req, res) => {
        const { user, password } = req.body
        const validCredentials = await checkCredentials(user, password)

        if (!validCredentials)
            res.status(404).send()

        await changeStatus(user, true)

        return res.status(200).send()
    })
}
