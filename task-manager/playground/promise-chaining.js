import '../src/db/mongoose.js'
import { User } from '../src/models/user.js'

/* User.findByIdAndUpdate('622f934e2d662bc16cd7305e', { age: 31 }).then((user) => {
    console.log(user)
    // promise chaining
    return User.countDocuments({ age: 31 })
}).then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err)
}) */

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age: age})
    const count = await User.countDocuments({ age: age })
    return count
}

updateAgeAndCount('622f934e2d662bc16cd7305e', 30).then((count) => {
    console.log(count)
}).catch((err) => {
    console.log(err)
})