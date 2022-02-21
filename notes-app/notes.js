import chalk from 'chalk'
import fs from 'fs'
import { argv } from 'process'

export function listNotes(){
    console.log(chalk.green.italic('Your notes'))
    const notes = loadNotes()
    notes.forEach((note) => {
        console.log(note.title)
    })
}

export function loadNotes(){
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (err) {
        return []
    }
    
}

export function readNote(title){
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if(!note){
        console.log(chalk.bgRed('Note does not exist'))
    } else {
        console.log(chalk.green(note.title))
        console.log(note.body)
    }
}

export function saveNotes(notes){
    // check /playground/1-json.mjs for notes
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

export function addNote(title, body){
    const notes = loadNotes()
    // instead of filter we can use 'find' because find stops the process if a duplicate
    // is found, filter loop through all elements even if a duplicate is already found
    const duplicateNote = notes.find((note) => note.title === title)

    debugger
    // if no duplicate exist
    if (!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
    } else {
       console.log(chalk.red('Note title taken!')) 
    }
}

export function removeNote(title){
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    // check if the note was removed
    if (notes.length > notesToKeep.length){
        console.log(chalk.bgGreen('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.bgRed('Note not found!'))
    }   
}  