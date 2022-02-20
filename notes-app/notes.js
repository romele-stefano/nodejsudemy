import chalk from 'chalk'
import fs from 'fs'
import { argv } from 'process'

export function getNotes(){
    return 'Your notes...'
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

export function saveNotes(notes){
    // check /playground/1-json.mjs for notes
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

export function addNote(title, body){
    const notes = loadNotes()
    // check if note title already exists
    const duplicateNotes = notes.filter(function(note){
        // return true if title already exist
        return note.title === title
    })
    // if no duplicate exist
    if (duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
    } else {
       console.log(chalk.red('Note title taken!')) 
    }
   
}