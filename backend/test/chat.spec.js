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

    describe('A user connects to a room', () => {
        it('should notify other users in the room', function (done) {

            const firstClient = connectUser()

            firstClient.on('connect', function () {
                firstClient.emit('join', { user: 'firstClient', room })

                firstClient.on('system-message', (msg) => {
                    expect(msg).to.eql({ message: 'secondClient has joined the room!', room })
                    done()
                })
            })

            const secondClient = connectUser()

            
            secondClient.on('connect', function () {
                secondClient.emit('join', { user: 'secondClient', room })
            })

            firstClient.disconnect()
            secondClient.disconnect()
        })
    })
})