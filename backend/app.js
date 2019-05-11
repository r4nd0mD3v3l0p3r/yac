import express from 'express'
import bodyParser from 'body-parser'
import {setupDb} from './dbManager'
import { mapLoginRoutes } from './api/login'

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const server = app.listen(port, () =>{
    setupDb()
    mapLoginRoutes(app)
})

module.exports = {
    app: app,
    server: server
}