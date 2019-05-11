import {Datastore} from 'nedb-async-await'

const usersDb = new Datastore()
const chatRooms = new Datastore()

export const setupDb = async() => {
    await setupUsers()
    await setupRooms()
}

export const checkCredentials = async(user, password) => {
   const result = await usersDb.findOne({name : user, password: password})

   return result !== null
}

export const changeStatus = async (user, isOnline) => {
    await usersDb.update({ name: user}, { $set : {online: isOnline} })
}

export const findUser = async(user) =>{
    return await usersDb.findOne({name : user})
}

const setupUsers = async() => {
    await usersDb.insert([{ name: 'Dana Scully', password: 'Dana', online: false},
                    { name: 'Fox Mulder', password: 'Fox', online: false},
                    { name: 'Penny', password: 'Penny', online: false},
                    { name: 'Sheldon Cooper', password: 'Sheldon', online: false}
                   ])
}

const setupRooms = async() => {
    await chatRooms.insert([{name: 'Sports', loggedUsers: [], messages: []}, 
                      {name: 'Music', loggedUsers: [], messages: []},
                      {name: 'Weather', loggedUsers: [], messages: []}])

}