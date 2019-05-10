import chai from 'chai'
import { expect } from 'chai'
import chaiHttp from 'chai-http'
import { app, server } from '../app'

chai.use(chaiHttp);
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
})