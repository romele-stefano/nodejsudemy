import '../src/db/mongoose.js'
import { Task } from '../src/models/task.js'

/* Task.findByIdAndDelete('622e45148e5c35194b888729').then((task) => {
    console.log(task)
    return Task.countDocuments({ completed: false })
}).then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err)
}) */

const deleteTaskAndCount = async (id) =>{
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return task, count
}

deleteTaskAndCount('622f9517c43d5e42816842fc').then((count) => {
    console.log(count)
}).catch((err) => {
    console.log(err)
})