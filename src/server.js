'use strict'
// import { openDb } from './database/db.js';
import { createTable, insert, updateFaculty, selectFaculty, selectTeachers } from './database/person.js';
createTable();


const facultys = [
        {
                name: "Jose Melban",
                img: "img/teachers/teacher06.jpg",
                alt: "Jose Melban",
                subject: "Ui design",
                whatsapp: 955195350,
        },
        {
                name: "Ana Milly",
                img: "img/teachers/teacher03.jpg",
                alt: "Ana Milly",
                subject: "Marketing",
                whatsapp: 955195350,

        },
        {
                name: "Diogo Billie",
                img: "img/teachers/teacher04.jpg",
                alt: "Diogo Billie",
                subject: "Economy",
                whatsapp: 955195350,

        },
        {
                name: "Christopher Xavier",
                img: "img/teachers/teacher05.jpg",
                alt: "Christopher Xavier",
                subject: "Design",
                whatsapp: 955195350,

        },
        {
                name: "Suzana Fell",
                img: "img/teachers/teacher02.jpg",
                alt: "Suzana Fell",
                subject: "UX Design",
                whatsapp: 955195350,

        },
        {
                name: "Jenny Mill",
                img: "img/teachers/teacher01.jpg",
                alt: "Jenny Mill",
                subject: "Art",
                whatsapp: 955195350,

        }
]


function ippChimbanda(req, res) {

        const data = req.body
        const inspect = Object.keys(data).length != 0
        if (inspect) {
                console.log("open")
                // return res.redirect("/myBlog")     
        }
        return res.render("ippChimbanda.html",
                { facultys })
}

function saveChimbanda(req, res) {
        insert(req.body)
        res.json({
                "statucCode": 200
        })
}
//update my database





function myBlog(req, res) {

        return res.render("myBlog.html")
}

// servidor
import express from 'express'
const server = express()

//configurar nunjucks
import nunjucks from 'nunjucks'
nunjucks.configure('src/views', {
        express: server,
        noCache: true
})


//inicio e configuração do meu servidor
server
//receber os dados do req.body
server.use(express.json())
        .use(express.urlencoded({ extended: true }))
        //configurar arquivos estaticos(css, style, scripts, img, blogImg...)
        .use(express.static("public"))
        .use(express.static("publi"))
        //roter main
        .get("/ippChimbanda", ippChimbanda)

        //serch all datas of my database
        .get('/save-chimbanda', async function (req, res) {
                let teacher = await selectFaculty()
                res.json(teacher)
        })
        //serch all datas of my database
        .get('/save-chimbandas', async function (req, res) {
                let teachers = await selectTeachers(req.body.id)
                res.json(teachers)
        })
        //send my datas of formular to database
        .post('/save-chimbanda', saveChimbanda)
        //update the my database
        .put('/save-chimbanda', function saveChimbanda(req, res) {
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
        .get("/myBlog", myBlog)

        //start do servidor
        .listen(5500)

