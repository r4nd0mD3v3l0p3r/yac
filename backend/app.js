import express from 'express'
import bodyParser from 'body-parser'
import { setupDb } from './database'
import { mapLoginRoutes } from './api/login'
import http from 'http'
import { setup as setupChat } from './chat'

const app = express()
const port = 3001

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

const server = http.createServer(app)

server.listen(port, () => {
    setupDb()
    mapLoginRoutes(app)
})

setupChat(server)

module.exports = {
    app: app,
    server: server,
    port: port
}