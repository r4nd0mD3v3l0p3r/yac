import express from 'express'
import bodyParser from 'body-parser'
import {setupDb} from './dbManager'

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const server = app.listen(port, () =>{
    setupDb()
    console.log(`JAC backend listening on port ${port}!`)
})

module.exports = {
    app: app,
    server: server
}