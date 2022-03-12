import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = 'mongodb+srv://nox:nox@cluster0.qcfhr.mongodb.net/sample_airbnb?retryWrites=true&w=majority'
const databaseName = 'task-manager'

MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to DB')
    }

    const db = client.db(databaseName)
    // add one user
    db.collection('users').insertOne({
        name: 'Aragorn',
        age: 66
    })
})



