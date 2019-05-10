import express from 'express'
import { checkCredentials } from '../dbManager'

const router = express.Router()

router.post('/login', async (req, res) => {
    const { user, password } = req.body
    const validCredentials = await checkCredentials(user, password)

    if (!validCredentials)
        res.status(404).send()


})