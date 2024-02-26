'use strict'
import { createTable, insert, updateFaculty, selectFaculty, selectTeachers, deletContact, registeInsert } from './database/person.js';
createTable();

// servidor
import express from 'express'
const server = express();
//ENDSERVER

import facultys from "./database/datas.js";
import fs from 'fs';
import https from 'https';
import cors from 'cors';
import bcrypt from 'bcrypt' //import bcrypt package
import passport from 'passport';
import { initilize } from './passport.js'
import flash from 'express-flash';
import session from 'express-session';
import methodOverride from 'method-override'
import dotenv from 'dotenv';
dotenv.config();

export default bcrypt;


initilize(
        passport,
        email => users.find(user => user.email === email),
        id => users.find(user => user.id === id)
)


server.use(cors());

//configurar nunjucks
import nunjucks from 'nunjucks'
nunjucks.configure('src/views', {
        express: server,
        noCache: true
})







server.use(flash())
server.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false, //WE CAN RESAVE THE SESSION VARIABLE IF NOTHING IS CHANGED
        saveUninitialized: false
}))
server.use(passport.initialize())
server.use(passport.session())
server.use(methodOverride("_method"))

const users = []

//receber os dados do req.body
server.use(express.json())
        .use(express.urlencoded({ extended: true }))
        //configurar arquivos estaticos(css, style, scripts, img, blogImg...)
        .use(express.static("public"))
        .use(express.static("publi"))


/*ENVIAR OS DADOS NO MEU SERVIDOR / IPPCHIMBANDA*/
function saveChimbanda(req, res) {
        insert(req.body)

        return res.redirect("/sucess")
}


// inicio e configuração do meu servidor

//send my datas of formular of ippChimbanda to database 
server.post('/save-chimbanda', saveChimbanda)

//VERIFICAR SE A AUTENTIFICACAO FOI DO LOGIN FOI REALIZADA COM SUCESSO
server.post('/pagelogin', checkNotAuthenticate, passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
}))
/*ENVIAR OS DADOS NO MEU SERVIDOR / REGISTER E EMPURAR OS DADOS DO REGISTER PARA O MEU ARRAY USERS */
server.post('/regist-save', checkNotAuthenticate, async (req, res) => {
        registeInsert(req.body)
        try {
                const hashedPasswor = await bcrypt.hash(req.body.password, 10)
                users.push({
                        id: Date.now().toString(),
                        name: req.body.name,
                        email: req.body.email,
                        password: hashedPasswor,
                })
                console.log(users);
                res.redirect("/login")
        } catch (e) {
                console.log(e);
                res.redirect("/register")
        }

})

//roter main
server.get("/", checkAuthenticate, (req, res) => {
        const data = req.body
        const inspect = Object.keys(data).length != 0
        if (inspect) {
                // console.log("open")
                alert("ola")
        }
        return res.render("ippChimbanda.html", { facultys, name: req.user.name })
})
//Roters de login
server.get("/login", checkNotAuthenticate, (req, res) => {
        return res.render("index.html")
})
//Roter de registro
server.get("/register", checkNotAuthenticate, (req, res) => {
        return res.render("index.html")
})
//Roter de sucesso do contacto do ippchimbanda
server.get("/sucess", (req, res) => {
        return res.render("sucess-page.htm")
})
//Roters DESENVOLVIDOR
server.get("/developer", (req, res) => {
        return res.render("myBlog.html")
})



//serch all datas of my database IPPCHIMBANDA
server.get("/alldatas", async function (req, res) {
        let teacher = await selectFaculty()
        res.json(teacher)
})
//serch datas in the my database only with "id" IPPCHIMBANDA
server.get('/save-chimbanda', async function (req, res) {
        let teachers = await selectTeachers(req.body.id)
        res.json(teachers)
})

//update the my database of IPPCHIMBANDA
server.put('/save-chimbanda', function saveChimbanda(req, res) {
        if (req.body && !req.body.id) {
                res.json({
                        "statucCode": "400",
                        "msg": "Voce precisa informar um Id"
                })
        } else {
                updateFaculty(req.body)
                res.json({
                        "statucCode": 200
                })
        }

})

server.delete('/delet-contact', async function (req, res) {
        let delet = await deletContact(req.body.id)
        res.json(delet)
})
//roter do meu buttin de logout do meu site para sair da pagina 
server.delete('/logout', (req, res) => {
        req.logout(req.user, err => {
                if (err) return next(err)
                res.redirect('/login')
        })

})
//end router

//A MINHA FUNÇÃO PARA AUTENTIFICAÇÃO DO MEU  REGIATER AND LOGIN
function checkAuthenticate(req, res, next) {
        if (req.isAuthenticated()) {
                return next()
        }
        res.redirect('/login')
}
function checkNotAuthenticate(req, res, next) {
        if (req.isAuthenticated()) {
                return res.redirect('/')
        }
        return next()
}
//start do servidor
server.listen(5500, () => console.log("server main rodando"))

//INSERINDO O HTTPS PARA O MEU WEBSITE
https.createServer({
        cert: fs.readFileSync('src/SSL/code.crt'),
        key: fs.readFileSync('src/SSL/code.key')
}.server).listen(5501, () => console.log("rodando https"))

