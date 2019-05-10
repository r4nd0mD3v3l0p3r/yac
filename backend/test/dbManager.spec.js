import {setupDb, checkCredentials} from '../dbManager'
import {expect} from 'chai'

beforeEach('Setting up the db', () => {
    setupDb()
  })

  describe('dbManager', () => {
      describe('#checkCredentials', () =>{
          it('should return true for existing user', () =>{
            checkCredentials('Dana Scully', 'Dana').then((userFound) =>{
                expect(userFound).to.be.true
            })
          })
          it('should return false for unexisting user', () =>{
            checkCredentials('John Doe', 'Dana').then((userFound) =>{
                expect(userFound).to.be.false
            })
          })
      })
  })
