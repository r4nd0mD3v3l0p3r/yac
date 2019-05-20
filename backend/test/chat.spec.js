import { app, server, port } from '../app'
import io from 'socket.io-client'
import chai from 'chai'
import { expect } from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)
let requester
const ioOptions = {
    transports: ['websocket']
    , forceNew: true
    , reconnection: false
}
const room = 'aRoom'

const connectUser = () => {
    return io(`http://localhost:${port}/chat`, ioOptions)
}

describe('Chat', () => {
    before(() => {
        requester = chai.request(app).keepOpen()
    })

    after(() => {
        requester.close()
        server.close()
    })

    describe('A client connects to a room', () => {
        it('should notify other users in the room', () => {
            const firstClient = connectUser()

            firstClient.on('connect', function () {
                firstClient.emit('join', { user: 'firstClient', room })
            })

            const secondClient = connectUser()

            firstClient.on('connect', function () {
                firstClient.emit('join', { user: 'firstClient', room })
                firstClient.on('message', (msg) => {
                    expect(msg).to.equal('firstClient has joined the room!')
                })
            })

            firstClient.disconnect()
            secondClient.disconnect()
        })
    })
})