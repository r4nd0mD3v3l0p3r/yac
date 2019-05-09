import express from 'express'
import {setupDb} from './dbManager'

const app = express()
const port = 3000

app.listen(port, () =>{
    setupDb()
    console.log(`JAC backend listening on port ${port}!`)
})