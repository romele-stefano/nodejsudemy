/* const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve([8, 8, 8])
        reject('Cannot solve promise')
    }, 2000)
})

// then allows to register a functions when things goes well
// catch for errors
doWorkPromise.then((result) => {
    console.log('Success!', result)
}).catch((error) => {
    console.log('Error!', error)
}) */

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

// without promise chaining
/* add(1, 2).then((sum) => {
    console.log(sum)
    add(sum, 5).then((sum2) => {
        console.log(sum2)
    }).catch((err) => {
        console.log(err)
    })
}).catch((err) => {
    console.log(err)
}) */

// PROMISE CHAINING
add(1, 1).then((sum) => {
    console.log(sum)
    // it is important to return the promise
    return add(sum, 4)
}).then((sum2) => {
    console.log(sum2)
}).catch((err) => {
    console.log(err)
})