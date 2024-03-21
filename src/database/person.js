'use strict'
import { openDb } from './db.js'


export async function createTable() {
    openDb().then(db => {
        db.exec(`
            CREATE TABLE IF NOT EXISTS Faculty
            (
                id INTEGER PRIMARY KEY, 
                name TEXT,
                lastName TEXT,
                email TEXT,                
                number TEXT,
                msg TEXT
             );
             
            CREATE TABLE IF NOT EXISTS Register
            (
                id INTEGER PRIMARY KEY, 
                name TEXT,
                email TEXT,
                avatar TEXT,
               password TEXT
            );
            `
        )
    })
}

/*faculty*/

/*INSERT DATA IN THE MY DATABASE OF CONTACT*/
export async function insert(insetData) {
   return openDb().then(db => {
       return db.run('INSERT INTO Faculty( name, lastName, email, number, msg) VALUES (?,?,?,?,?)', [insetData.name, insetData.lastName, insetData.email, insetData.number, insetData.msg])
    })

}
/*UPADATE DATAS IN THE MY DATABASE CONTACT*/
export async function updateFaculty(upadateData) {
   return openDb().then(db => {
       return db.run('UPDATE Faculty SET  name=?, lastName=?, email=?, number=?, msg=?  WHERE id=?', [upadateData.name, upadateData.lastName, upadateData.email, upadateData.number, upadateData.msg, upadateData.id])
    })

}
/*SELECT DATA IN THE MY DATABASE CONTACT*/
export async function selectFaculty() {
    return openDb().then(db => {
        return db.all('SELECT * FROM Faculty ')
            .then(res => res)

    })

}
/*TAKE DATA IN THE MY DATABASE WITH "ID" ONLY*/
export async function selectTeachers(id) {
    return openDb().then(db => {
        return db.get('SELECT * FROM Faculty  WHERE id=?', [id])
            .then(res => res)

    })

}

/*DELECT DATA IN THE MY DATABASE*/
export async function deletContact(id) {
    return openDb().then(db => {
        return db.get('DELETE FROM Faculty  WHERE id=?', [id])
            .then(res => res)

    })

}

/*Register*/
export async function registeInsert(register) {
    return openDb().then(db => {
        return db.run('INSERT INTO Register(name, email, avatar, password) VALUES (?,?,?,?)', [register.name, register.email, register.avatar, register.password])


    })
}
