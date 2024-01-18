// const contact= [
//         {
//          name:"Xavier Belchior",
//          email:"xavierbelchior190@gmail",
//          number:955195350,
//          email:"xavierbelchior0502gmail.com",
//          msg:"Hi there"
//         }
// ]
const facultys=[
       {
        name:"Jose Melban",
        img:"img/teachers/teacher06.jpg",
        alt:"Jose Melban",
        subject:"Ui design",
        whatsapp:955195350,
       },
       {
         name:"Ana Milly",
         img:"img/teachers/teacher03.jpg",
         alt:"Ana Milly",
         subject:"Marketing",
         whatsapp:955195350,
      
        }, 
        {
         name:"Diogo Billie",
         img:"img/teachers/teacher04.jpg",
         alt:"Diogo Billie",
         subject:"Economy",
         whatsapp:955195350,
             
         }, 
         {
         name:"Christopher Xavier",
         img:"img/teachers/teacher05.jpg",
         alt:"Christopher Xavier",
         subject:"Design",
         whatsapp:955195350,
             
         }, 
        {
         name:"Suzana Fell",
         img:"img/teachers/teacher02.jpg",
         alt:"Suzana Fell",
         subject:"UX Design",
         whatsapp:955195350,
             
         },
         {
         name:"Jenny Mill",
         img:"img/teachers/teacher01.jpg",
         alt:"Jenny Mill",
         subject:"Art",
         whatsapp:955195350,
             
         }
]


function ippChimbanda(req, res){
        console.log(req.query)
        return res.render("ippChimbanda.html",
        {facultys})
}
function myBlog(req, res){
         return res.render("myBlog.html")
}

const express= require('express')
const server= express()

//configurar nunjucks
const nunjucks= require('nunjucks')
nunjucks.configure('src/views',{
        express:server,
        noCache:true
})

server

//configurar arquivos estaticos(css, style, scripts, img, blogImg...)
.use(express.static("public"))
.use(express.static("publi"))

.get("/ippChimbanda", ippChimbanda)
.get("/myBlog",myBlog)
.listen(5500)

