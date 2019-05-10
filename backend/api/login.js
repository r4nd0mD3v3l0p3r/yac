import express from 'express'

const router = express.Router();

router.post('/login', (req, res) => {
    const user = req.body.user
    const password = req.body.password
})