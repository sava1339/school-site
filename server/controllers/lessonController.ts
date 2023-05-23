const {School_Lesson} = require('../models/models')
const ApiError = require('../error/ApiError')
class LessonController {
    async create(req:any,res:any){
        const {name}= req.body
        const school_Lesson = await School_Lesson.create({name})
        return res.json(school_Lesson)
    }
    async getAll(req:any,res:any){
        const school_Lesson = await School_Lesson.findAll()
        return res.json(school_Lesson)
    }
    async getForId(req:any,res:any){
        const {id} = req.params
        const school_Lesson = await School_Lesson.findOne({where:{id}})
        return res.json(school_Lesson)
    }
    async getForLesson(req:any,res:any){
        const {name} = req.params
        const school_lesson = await  School_Lesson.findOne({where:{name:name}})
        return res.json(school_lesson)
    }
}
module.exports = new LessonController()
export{}