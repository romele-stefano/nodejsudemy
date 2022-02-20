import chalk from 'chalk'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { getNotes, addNote } from './notes.js'

// in command line we can use --help to list all commands and options for yargs
// node app.js --help

const y = yargs()
y.version('1.1.1')

// create add command
y.command({
    command: 'add',
    describe: 'Add a new note',
    // use to add all options the command can have
    builder: {
        title: {
            describe: 'Note title',
            // is field required
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        addNote(argv.title, argv.body)
    }
})

// create remove command
y.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function() {
        console.log(chalk.red.italic('Removing note...'))
    }
})

// create list command
y.command({
    command: 'list',
    describe: 'Listing out all notes',
    handler: function(){
        console.log(chalk.blue('Getting all notes...'))
    }
})

// create read command
y.command({
    command: 'read',
    describe: 'Read a note',
    handler: function(){
        console.log(chalk.bgBlue.yellow('Reading note!'))
    }
})

// parse command given by user
y.parse(process.argv.slice(2))

console.log(yargs(hideBin(process.argv)).argv)