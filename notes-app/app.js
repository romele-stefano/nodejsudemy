import chalk from 'chalk'
import { getNotes } from './notes.js'

// take argument passed after node app.js
// by default argv return two standard paths 
const command = process.argv[2]

if (command === 'add'){
    console.log(chalk.green('Adding note!'))
} else if (command === 'remove'){
    console.log(chalk.red('Removing note!'))
}