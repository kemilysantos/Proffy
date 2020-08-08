const Database = require('./database/db')
const { subjects, weekdays, getSubject, convertHoursToMinutes }= require('./utils/format')
const express = require('express')
const server = express()

async function respageStudy(req, res) {
    const filters = req.query 

    if (!filters || !filters.weekday || !filters.time) {  
        return res.render("study.html", { filters, subjects, weekdays }) 
    }

    // Convertendo em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys 
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule 
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'
    `
    
    // Tratamento de erros e consultando os dados 
    try {
        const db = await Database
        const proffys = await db.all(query)
        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })
        return res.render("study.html", {proffys, subjects, filters, weekdays}) // exibe a pagina
    } catch (error) {
        console.log(error)
    }
}

async function resSaveClass(req, res) {
    // const data = req.body  Pegando os dados do formulario
    const createProffy = require('./database/createProffy')
    // Pegando os valores do formulario
    const proffyValue = {
        name: req.body.name, // Pegando os dados do formulario do html
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }
    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }
    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday, // nao precisa do req.body pois a funcao ja esta pegando no map()
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index]),
        }
    })

    try { // salvando no banco 
        const db = await Database
        await createProffy(db, { proffyValue, classValue, classScheduleValues })
        
        let queryString = "?subject=" + req.body.subject 
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect("/study" + queryString) 
    } catch (error) {
        console.log(error)
    }

    
}

module.exports = { 
    respageStudy,
    resSaveClass
}