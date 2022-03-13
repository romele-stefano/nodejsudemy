const doWorkPromise = new Promise((resolve, reject) => {
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
})