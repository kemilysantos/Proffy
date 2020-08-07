//dados
const proffys = [
    {
        name:"Kemily Santos",
        avatar: "https://avatars1.githubusercontent.com/u/64219991?s=460&u=9dac88478e0d025398b74d4fd18ff2c96b39e034&v=4",
        whatsapp: "8999989878",
        bio:"Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "20",
        weekday:[0],
        time_from:[720],
        time_to:[120]
    },
    {
        name:"Carlos Daniel",
        avatar: "https://avatars0.githubusercontent.com/u/53876041?s=460&u=aa4ae11913a46392bf76f88bf43ae8c7b8ad8f5d&v=4",
        whatsapp: "8999989878",
        bio:"Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "20",
        weekday:[0],
        time_from:[720],
        time_to:[120]
    }
]
const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]
//funcionalidades

function getSubject(subjectNumber) { // Pega o número passado no formulario e transforma em palavra
    const arrayPosition = +subjectNumber - 1 
    return subjects[arrayPosition] 
}

function pageLanding(req, res){
    return res.render("index.html")
}

function pageStudy(req, res){
    const filters = req.query
    return res.render("study.html", {proffys, filters, subjects, weekdays})
}

function pageGiveClasses(req, res){
    const data = req.query
    //se tiver dados (data)
    const isNotEmpty = Object.keys(data).length > 0
    if(isNotEmpty){

        data.subject = getSubject(data.subject)

        //adicionar dados a lista de proffys
        proffys.push(data)
        return res.redirect("/study")
        
    }
    //se não,mostrar a pagina
    return res.render("give-classes.html", {subjects, weekdays})

}

//configurando meu servidor
const express = require('express')
const server = express()

//configurar nunjucks (template engine )
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

//inicio e configuração do servidor
server
//configurar arquivos estáticos (css, scripts, imagens)
.use(express.static("public"))
//rotas de aplicação 
.get("/",pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
//start do servidor
.listen(3000)
