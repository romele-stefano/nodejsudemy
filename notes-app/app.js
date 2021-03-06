import chalk from 'chalk'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { listNotes, addNote, removeNote, readNote } from './notes.js'

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
    // short version of
    // handler: function(argv){ ... }
    handler(argv) {
        addNote(argv.title, argv.body)
    }
})

// create remove command
y.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        removeNote(argv.title)
    }
})

// create list command
y.command({
    command: 'list',
    describe: 'Listing out all notes',
    handler(){
        listNotes()
    }
})

// create read command
y.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        readNote(argv.title)
    }
})

// parse command given by user
y.parse(process.argv.slice(2))

console.log(yargs(hideBin(process.argv)).argv)