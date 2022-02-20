import { writeFileSync, readFileSync } from 'fs'

/* const book = {
    title: 'The Lord of the Rings',
    author: 'JRR Tolkien'
}

// fs module knows how to work with strings, not JSON
const bookJSON = JSON.stringify(book)
writeFileSync('1-json.json', bookJSON) */

/* // read binary data
const dataBuffer = readFileSync('1-json.json')
// convert binary data to string
const dataJSON = dataBuffer.toString()
// parse JSON data into an object
const data = JSON.parse(dataJSON)
console.log(data.title) */

// read data and convert
const dataBuffer = readFileSync('1-json.json')
const dataJSON = dataBuffer.toString()
const data = JSON.parse(dataJSON)
// change name and age attribute
data.name = 'Stefano'
data.age = 30
const personJSON = JSON.stringify(data)
writeFileSync('1-json.json', personJSON)
