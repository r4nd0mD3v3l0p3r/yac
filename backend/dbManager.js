import Datastore from 'nedb'

var usersDb = new Datastore()
var chatRooms = new Datastore()

export function setupDb() {
    console.log('setting up db')
    setupUsers()
    setupRooms()
    console.log('db setup done')
}

const setupUsers = () => {
    usersDb.insert([{ name: 'Dana Scully', password: 'Dana', online: false},
                    { name: 'Fox Mulder', password: 'Fox', online: false},
                    { name: 'Penny', password: 'Penny', online: false},
                    { name: 'Sheldon Cooper', password: 'Sheldon', online: false}
                   ])
}

const setupRooms = () => {
    chatRooms.insert([{name: 'Sports', loggedUsers: [], messages: []}, 
                      {name: 'Music', loggedUsers: [], messages: []},
                      {name: 'Weather', loggedUsers: [], messages: []}])

}