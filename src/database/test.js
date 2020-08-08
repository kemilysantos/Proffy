const Database = require('./db')
const createProffy = require('./createProffy')


Database.then(async (db)=>{
//inserir dados
    proffyValue = {
        name:"Kemily Santos",
        avatar: "https://avatars1.githubusercontent.com/u/64219991?s=460&u=9dac88478e0d025398b74d4fd18ff2c96b39e034&v=4",
        whatsapp: "8999989878",
        bio:"Estudante",
    }

    classValue ={
        subject: 1,
        cost: 20,
        //o proffy id virá pelo banco de dados
    }

    classScheduleValues = [
        //class_id virá pelo banco de dados, após cadastrarmos a class
        {
            weekday: 0,
            time_from: 720,
            time_to: 1200
        },
        {
            weekday: 1,
            time_from: 520,
            time_to: 1200
        }
    ]

    //await createProffy(db, {proffyValue, classValue, classSheduleValue})

    //consultar dados inseridos

    //todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")

  
    //consultar as classes de um determinado professor 
    //e trazer junto os dados do professor 
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys 
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)    
    const selectClassesSchedules = await db.all(`
    SELECT class_schedule.*
    FROM class_schedule 
    WHERE class_schedule.class_id = 1
    AND class_schedule.weekday = 0
    AND class_schedule.time_from <= 520
    AND class_schedule.time_to > 520   
`)

    //console.log(selectClassesSchedules)
})