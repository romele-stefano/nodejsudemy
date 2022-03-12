import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = 'mongodb+srv://nox:nox@cluster0.qcfhr.mongodb.net/sample_airbnb?retryWrites=true&w=majority'
const databaseName = 'task-manager'

MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to DB')
    }

    const db = client.db(databaseName)
    /* // add one user
    db.collection('users').insertOne({
        name: 'Aragorn',
        age: 66
    }, (error, result) => { // callback
        if (error) {
            return console.log('Unable to insert user')
        }

        console.log(result)
    }) */

    /* db.collection('users').insertMany([
        {
            name: 'Frodo',
            age: 33
        }, {
            name: 'Bilbo',
            age: 122
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert user')
        }

        console.log(result)
    }) */

    db.collection('tasks').insertMany([
        {
            description: 'task 1',
            completed: true
        }, {
            description: 'task 2',
            completed: true
        },
        {
            description: 'task 3',
            completed: false
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert tasks')
        }

        console.log(result)
    })
})



