import { MongoClient, ObjectId } from 'mongodb'

const uri = 'mongodb+srv://nox:nox@cluster0.qcfhr.mongodb.net/sample_airbnb?retryWrites=true&w=majority'
const databaseName = 'task-manager'

// generate a new Id before creating a new document
const id = new ObjectId()
console.log(id)
// console.log(id.getTimestamp())

MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to DB')
    }

    const db = client.db(databaseName)

    // fetch data
    /* db.collection('users').findOne({ name: 'Gandalf' }, (error, user) => {
        if (error){
            return console.log('Unable to fetch data')
        }

        console.log(user)
    })
 */

   /*  db.collection('tasks').findOne({ _id: new ObjectId('622cd1d7421df1a48cf960a4') }, (error, task) => {
        console.log(task)
    }) */

    db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
        console.log(tasks)
    })


    // add one user
    /* db.collection('users').insertOne({
        name: 'Gimli',
        age: 192
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

    /* db.collection('tasks').insertMany([
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
    }) */
})



