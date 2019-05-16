import express from 'express'
import bodyParser from 'body-parser'
import { setupDb } from './dbManager'
import { mapLoginRoutes } from './api/login'

const app = express()
const port = 3001

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

const server = app.listen(port, () => {
    setupDb()
    mapLoginRoutes(app)
})

module.exports = {
    app: app,
    server: server
}