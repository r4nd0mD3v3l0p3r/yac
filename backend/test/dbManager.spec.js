import { setupDb, checkCredentials } from '../dbManager'
import { expect } from 'chai'

beforeEach('Setting up the db', () => {
    setupDb()
})

describe('dbManager', () => {
    describe('#checkCredentials', () => {
        it('should return true for existing user', async () => {
            const userFound = await checkCredentials('Dana Scully', 'Dana')
            expect(userFound).to.be.true
        })
        it('should return false for unexisting user', async () => {
            const userFound = await checkCredentials('John Doe', 'Dana')
            expect(userFound).to.be.false
        })
    })
})
