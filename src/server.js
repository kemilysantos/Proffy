const { respageStudy, resSaveClass } = require('./pages')

const { subjects, weekdays, getSubject, convertHoursToMinutes }= require('./utils/format') 


const express = require('express')
const server = express()

const nunjucks = require('nunjucks')


nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server.use(express.static("public")) 

.get("/", (req, res) => {   
    return res.render("index.html") 
    // return res.sendFile(__dirname + "/views/index.html") = esse é o padrão do js
})

.get("/study", respageStudy)


.use(express.urlencoded({ extended: true }))
.get("/give-classes", (req, res) => {
    return res.render("give-classes.html", {subjects,weekdays})
})
// Criando rota para receber os dados pelo metodo post
.post("/save-class", resSaveClass)

.listen(3000) 