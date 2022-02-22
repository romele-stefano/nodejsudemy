// Object property shorthand

const userName = 'Andrew'
const userAge = 27

const user = {
    // userName is shorthand syntax. Only if property has the same name of the variable
    userName,
    age: userAge,
    location: 'New York City'
}

console.log(user)


// Object destructuring

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
}

// we could write 
// const label = product.label
// for each single property of the object. Or we can use object destructuring
// we can rename properties like in label example
// we can give a default value (if property does not exist) like in rating
const {label:productLabel, stock, rating = 5} = product
console.log(rating)

// we can destructure even in function argument
// const transaction = (type, { label, stock }) => {...}

