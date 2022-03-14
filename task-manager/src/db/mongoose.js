import mongoose from 'mongoose'

const uri = 'mongodb+srv://nox:nox@cluster0.qcfhr.mongodb.net/task-manager?retryWrites=true&w=majority'
export const dbConnection = mongoose.connect(uri, {
    useNewUrlParser: true
})

