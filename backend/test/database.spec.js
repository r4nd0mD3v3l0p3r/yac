import { setupDb, checkCredentials, changeStatus, findUser } from '../database'
import { expect } from 'chai'

describe('dbManager', () => {
    beforeEach('Setting up the db', () => {
        setupDb()
    })
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
    describe('#changeStatus', () => {
        it('user status should be online', async () => {
            await changeStatus('Dana Scully', true)
            expect((await findUser('Dana Scully')).online).to.be.true
        })
    })
})
