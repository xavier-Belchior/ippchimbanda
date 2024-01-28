'use strict'
import { openDb } from './db.js'

export async function createTable() {
    openDb().then(db => {
        db.exec(
            `CREATE TABLE IF NOT EXISTS Faculty
            (
                id INTEGER PRIMARY KEY, 
                name TEXT,
                lastName TEXT,
                email TEXT,                
                number TEXT,
                msg TEXT
             );
            ` )
    })
}

export async function insert(faculty) {
    openDb().then(db => {
        db.run('INSERT INTO faculty( name, lastName, email, number, msg) VALUES (?,?,?,?,?)', [faculty.name, faculty.lastName, faculty.email, faculty.number, faculty.msg])
    })

}

export async function updateFaculty(faculty) {
    openDb().then(db => {
        db.run('UPDATE Faculty SET  name=?, lastName=?, email=?, number=?, msg=?  WHERE id=?', [faculty.name, faculty.lastName, faculty.email,  faculty.number, faculty.msg, faculty.id])
    })

}

export async function selectFaculty() {
   return openDb().then(db => {
       return db.all('SELECT * FROM Faculty ')
        .then(res=>res)

    })

}
export async function selectTeachers(id) {
    return openDb().then(db => {
        return db.get('SELECT * FROM Faculty  WHERE id=?', [id])
         .then(res=>res)
 
     })
 
 }