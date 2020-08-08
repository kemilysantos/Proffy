module.exports = async function(db, { proffyValue, classValue, classScheduleValues }){
    //inserir dados na tabela de teachers
    const insertedProffy = await db.run(`
        INSERT INTO proffys(
            nome,
            avatar,
            whatsapp,
            bio
        ) VALUES(
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)

    const proffy_id = insertedProffy.lastID


    //inserir dados na tabela classes
    const insertedClass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            );
    `)
    const class_id = insertedProffy.lastID

    //inserir dados na tabela class_shedule
    const insertedAllClassesScheduleValues = classScheduleValues.map((classScheduleValue) => { // o map concatena os arrays que ele encontra no return
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)
    })

    //aqui vou executar todos os db.runs() das classes Shedule
    await Promise.all(insertedAllClassesScheduleValues)
    

}