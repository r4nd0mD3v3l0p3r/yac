import chai from 'chai'
import { expect } from 'chai'
import chaiHttp from 'chai-http'
import { app, server } from '../../app'

chai.use(chaiHttp)
let requester

before(() => {
   requester = chai.request(app).keepOpen()
})

after(() =>{
    requester.close()
    server.close()
})

describe('login', () =>{
    it('should return 404 for unexisting user', async () =>{
        const response = await requester.post('/login').send({user : 'Johh Doe', password: 'Doe'})
        expect(response.status).to.equal(404)
    })
    
    it('should return 200 for existing user and token is present', async () =>{
        const response = await requester.post('/login').send({user : 'Dana Scully', password: 'Dana'})
        expect(response.status).to.equal(200)
        expect(response.body.token).not.to.be.empty
    })
})

describe('logout', () =>{
    it('should return 404 for invalid token', async () =>{
        const response = await requester.post('/logout').send({user : 'Johh Doe', token: 'aToken'})
        expect(response.status).to.equal(404)
    })

    it('should return 404 for non-existing user', async () =>{
        const response = await requester.post('/logout').send({user : 'Johh Doe', token: 'aToken'})
        expect(response.status).to.equal(404)
    })
    
    it('should return 200 for existing user with valid token', async () =>{
        const response = await requester.post('/logout').send({user : 'Dana Scully', token: '1911'})
        expect(response.status).to.equal(200)
    })
})