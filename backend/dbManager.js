import Datastore from 'nedb'

var usersDb = new Datastore()

export function setupDb() {
    console.log('setting up db')
    setupUsers()

    console.log('db setup done')
}

const setupUsers = () => {
    usersDb.insert([{ name: 'Dana Scully', password: 'Dana', online: false},
                    { name: 'Fox Mulder', password: 'Fox', online: false},
                    { name: 'Penny', password: 'Penny', online: false},
                    { name: 'Sheldon Cooper', password: 'Sheldon', online: false}
                   ])
}