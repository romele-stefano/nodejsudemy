import '../src/db/mongoose.js'
import { Task } from '../src/models/task.js'

Task.findByIdAndDelete('622e45148e5c35194b888729').then((task) => {
    console.log(task)
    return Task.countDocuments({ completed: false })
}).then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err)
})