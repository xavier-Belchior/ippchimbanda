'use strict';
import { openDb } from './db.js';



export async function createTable() {
    return openDb()
        .then(db => {
            return db.exec(`
                CREATE TABLE IF NOT EXISTS Register
                (
                    id INTEGER PRIMARY KEY, 
                    name TEXT,
                    email TEXT,
                    avatar TEXT,
                    password TEXT
                );
                
                CREATE TABLE IF NOT EXISTS Feedbacks
                (
                    id INTEGER PRIMARY KEY, 
                    name TEXT,
                    subject TEXT,
                    email TEXT,                
                    number TEXT,
                    msg TEXT,
                    register_id INTEGER,
                    FOREIGN KEY (register_id) REFERENCES Register(id)
                );
            `);
        })
        .catch(error => {
            console.error('Erro ao criar tabelas:', error);
            throw error; // Lança o erro para que o chamador possa lidar com ele
        });
}


// /*testando*/

// async function insertData() {
//     // Inserir um registro na tabela Register
//     const registerId = await registeInsert({ name: 'John Doe', email: 'john@example.com', avatar: 'avatar.jpg', password: '123456' });

//     // Inserir um feedback na tabela Feedbacks referenciando o ID do registro na tabela Register
//     await insert({ name: 'Feedback 1', subject: 'Subject 1', email: 'feedback1@example.com', number: '123456789', msg: 'Message 1', register_id: registerId });

//     console.log('Dados inseridos com sucesso');
// }

// insertData().catch(error => console.error('Erro ao inserir dados:', error));
// /*terminou*/

/* Register */

export async function registeInsert(register) {
    return openDb()
        .then(db => {
            return db.run('INSERT INTO Register(name, email, avatar, password) VALUES (?,?,?,?)', [register.name, register.email, register.avatar, register.password]);
        });
}

/* Feedbacks */
export async function insert(insetData) {
    return openDb()
        .then(db => {
            return db.run('INSERT INTO Feedbacks(name, subject, email, number, msg, register_id) VALUES (?,?,?,?,?,?)', [insetData.name, insetData.subject, insetData.email, insetData.number, insetData.msg, insetData.register_id]);
        });
}


 
export async function updateFeedback(upadateData) {
   return openDb().then(db => {
       return db.run('UPDATE Feedbacks SET name=?, subject=?, email=?, number=?, msg=?  WHERE id=?', [upadateData.name, upadateData.subject, upadateData.email, upadateData.number, upadateData.msg, upadateData.id]);
    });
}

export async function selectFeedbacks() {
    return openDb().then(db => {
        return db.all('SELECT * FROM Feedbacks').then(res => res);
    });
}

export async function selectFeedback(id) {
    return openDb().then(db => {
        return db.get('SELECT * FROM Feedbacks WHERE id=?', [id]).then(res => res);
    });
}

export async function deleteFeedback(id) {
    return openDb().then(db => {
        return db.get('DELETE FROM Feedbacks WHERE id=?', [id]).then(res => res);
    });
}
