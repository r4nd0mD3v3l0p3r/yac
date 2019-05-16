import { checkCredentials, changeStatus } from '../dbManager'

const token = '1911'

export const mapLoginRoutes = (app) => {
    app.post('/login', async (req, res) => {
        const { user, password } = req.body
        const validCredentials = await checkCredentials(user, password)

        if (!validCredentials)
            return res.status(404).send()

        await changeStatus(user, true)

        res.json({ token })
        
        return res.status(200)
    })

    app.post('/logout', async (req, res) => {
        const { user, password } = req.body
        const validCredentials = await checkCredentials(user, password)

        if (!validCredentials)
            res.status(404).send()

        await changeStatus(user, false)

        return res.status(200).send()
    })
}
