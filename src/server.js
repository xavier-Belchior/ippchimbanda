"use strict";
import {
  createTable,
  insert,
  // updateFaculty,
  // selectFaculty,
  // selectTeachers,
  // deletContact,
  registeInsert,
} from "./database/person.js";
createTable();

// servidor

//ENDSERVER

import facultys from "./database/datas.js";
import fs from "fs";
import https from "https";
import cors from "cors";
import bcrypt from "bcrypt"; //import bcrypt package
import passport from "passport";
import { initilize } from "./passport.js";
import { empresa } from "./database/datas.js";
import { empresaCursos } from "./database/datas.js";
import {
  modalCursos,
  propinaTenClasses,
  propinaElevenClasses,
  propinaTwelveClasses,
  propinaThirteenClasses,
  uniformes,
  testemunhas,
  events,
  equipa
} from "./database/datas.js";
import flash from "express-flash";
import session from "express-session";
import methodOverride from "method-override";
import dotenv from "dotenv";
dotenv.config();

export default bcrypt;
import express from "express";
import http from 'http';


const app = express();
const server = http.createServer(app);


// Restante do seu código...
/*importando o socket.io*/

import { Server } from 'socket.io';

/*criando uma variavel que ira set os numeros de clientes no chat*/
const socketsConnected=new Set()


/*connectando o server socket.io na minha apliacação*/
const io = new Server(server);

io.on('connection',onConnection)

function onConnection(socket){
  console.log(socket.id);
  socketsConnected.add(socket.id)

  /*enviando numeros de clientes total para o cliente */
  io.emit('clients-total',socketsConnected.size)

  /*deletando os sockets.id quando um client se desconected*/
  socket.on('disconnect', ()=>{
    socketsConnected.delete(socket.id)
  io.emit('clients-total',socketsConnected.size)
  })
  /*enviar mensagem exceto o cliente que envio nao ira receber*/
  socket.on('message', (data)=>{
    socket.broadcast.emit('chat-message', data)
  })
   /*when the user will be typing will appear one text/  and this code i puch to my or send to my chat or clients */
   socket.on("feedback", (data) => {
    socket.broadcast.emit("feedback", data)
  })
  
  
}
/*Importando o nodemailer para enviar sms por email*/
import nodemailer from 'nodemailer';

// Configurar o transporte
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'xavierbelchior190@gmail.com',
        pass: 'zdgt vihn monp hctu'
    }
});

// Função para enviar e-mail
function enviarEmail(destinatario, remetente, assunto, corpo) {
    let mailOptions = {
        from: destinatario,
        to:remetente ,
        subject: assunto,
        text: corpo
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('E-mail enviado: ' + info.response);
        }
    });
}


initilize(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

app.use(cors());

//configurar nunjucks
import nunjucks from "nunjucks";
nunjucks.configure("src/views", {
  express: app,
  noCache: true,
});

app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, //WE CAN RESAVE THE SESSION VARIABLE IF NOTHING IS CHANGED
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

const users = [];

//receber os dados do req.body
app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  //configurar arquivos estaticos(css, style, scripts, img, blogImg...)
  .use(express.static("public"))
  .use(express.static("publi"));

/*ENVIAR OS DADOS NO MEU SERVIDOR / IPPCHIMBANDA*/
function saveChimbanda(req, res) {
  const { name, number, subject, email, msg } = req.body;

    // Construir o corpo do e-mail
    const corpoEmail = `Nome: ${name}\nNumber: ${number}\nSubject: ${subject}\nEmail: ${email}\nMensagem: ${msg}`;

    // Enviar e-mail
    enviarEmail( 'xavierbelchior190@gmail.com', `Email:${email}`, 'Novo formulário submetido dos usuario da pagina', corpoEmail);

    // Aqui você pode adicionar qualquer outra lógica necessária, como salvar os dados no banco de dados

  console.log(req.body)
  insert(req.body);

  return res.redirect("/sucess");
}

// inicio e configuração do meu servidor

//send my datas of formular of ippChimbanda to database
app.post("/save-chimbanda", saveChimbanda);

//VERIFICAR SE A AUTENTIFICACAO FOI DO LOGIN FOI REALIZADA COM SUCESSO
app.post(
  "/pagelogin",
  checkNotAuthenticate,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
/*ENVIAR OS DADOS NO MEU SERVIDOR / REGISTER E EMPURAR OS DADOS DO REGISTER PARA O MEU ARRAY USERS */
app.post("/regist-save", checkNotAuthenticate, async (req, res) => {
  registeInsert(req.body);
  try {
    const hashedPasswor = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      avatar: req.body.avatar,
      password: hashedPasswor,
    });
    console.log(users);
    res.redirect("/login");
  } catch (e) {
    console.log(e);
    res.redirect("/register");
  }
});

//roter main
app.get("/", checkAuthenticate, (req, res) => {
  const data = req.body;
  const inspect = Object.keys(data).length != 0;
  if (inspect) {
    // console.log("open")
    alert("ola");
  }
  return res.render("ippChimbanda.html", {
    facultys,
    empresa: empresa[0],
    empresaSobre: empresa[1],
    CursoInformatico: empresaCursos[0],
    CursoRecursos: empresaCursos[1],
    CursoEmpresarial: empresaCursos[2],
    modalInformatico: modalCursos[0],
    modalRecursos: modalCursos[1],
    modalEmpresarial: modalCursos[2],
    propinaTenClasses,
    propinaElevenClasses,
    propinaTwelveClasses,
    propinaThirteenClasses,
    uniformes,
    testemunhas,
    events,
    equipa,
    name: req.user.name,
    email: req.user.email,
  });
});
//Roters de login
app.get("/login", checkNotAuthenticate, (req, res) => {
  return res.render("index.html");
});
//Roter de registro
app.get("/register", checkNotAuthenticate, (req, res) => {
  return res.render("index.html");
});
//Roter de sucesso do contacto do ippchimbanda
app.get("/sucess", (req, res) => {
  return res.render("sucess-page.htm");
});
//Roters DESENVOLVIDOR
app.get("/developer", (req, res) => {
  return res.render("myBlog.html");
});
//Galery
app.get("/galery", (req, res) => {
  return res.render("galeria.html");
});
//Noticias
app.get("/noticia", (req, res) => {
  return res.render("noticias.html", {    empresa: empresa[0],});
});
//Noticias
app.get("/adminitrador", (req, res) => {
  return res.render("administrativa.html", {    empresa: empresa[0],});
});
app.get('/chat', (req, res) => {
 return res.render('chat.html');
});

// //serch all datas of my database IPPCHIMBANDA
// app.get("/alldatas", async function (req, res) {
//         let teacher = await selectFaculty()
//         res.json(teacher)
// })
// //serch datas in the my database only with "id" IPPCHIMBANDA
// app.get('/save-chimbanda', async function (req, res) {
//         let teachers = await selectTeachers(req.body.id)
//         res.json(teachers)
// })

// //update the my database of IPPCHIMBANDA
// app.put('/save-chimbanda', function saveChimbanda(req, res) {
//         if (req.body && !req.body.id) {
//                 res.json({
//                         "statucCode": "400",
//                         "msg": "Voce precisa informar um Id"
//                 })
//         } else {
//                 updateFaculty(req.body)
//                 res.json({
//                         "statucCode": 200
//                 })
//         }

// })

app.delete("/delet-contact", async function (req, res) {
  let delet = await deletContact(req.body.id);
  res.json(delet);
});
//roter do meu buttin de logout do meu site para sair da pagina
app.delete("/logout", (req, res) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.redirect("/login");
  });
});
//end router

//A MINHA FUNÇÃO PARA AUTENTIFICAÇÃO DO MEU  REGIATER AND LOGIN
function checkAuthenticate(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
function checkNotAuthenticate(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return next();
}
//start do servidor
server.listen(5500, () => console.log("server main rodando"));

//INSERINDO O HTTPS PARA O MEU WEBSITE
// https
//   .createServer(
//     {
//       cert: fs.readFileSync("src/SSL/code.crt"),
//       key: fs.readFileSync("src/SSL/code.key"),
//     }.server
//   )
//   .listen(5501, () => console.log("rodando https"));
