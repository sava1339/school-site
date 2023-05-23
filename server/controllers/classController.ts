const {Class} = require('../models/models')
const ApiError = require('../error/ApiError')
class ClassController {
    async create(req:any,res:any){
        const {word_class,schoolId}= req.body
        const _class = await Class.create({word_class,schoolId})
        return res.json(_class)
    }
    async getAll(req:any,res:any){
        const _class = await Class.findAll()
        return res.json(_class)
    }
    async getForSchool(req:any,res:any){
        const {schoolId} = req.query
        const _class = await Class.findAll({where:{schoolId}})
        return res.json(_class)
    }
    async getForId(req:any,res:any){
        const {id} = req.params
        const _class = await Class.findOne({where:{id}})
        return res.json(_class)
    }
    async getClassIdForWordClass(req:any,res:any){
        const {word_class} = req.params
        const _class = await Class.findOne({where:{word_class:word_class.toUpperCase() }})
        if(_class){
            return res.json(_class.id)
        }else{
            return res.json(false)
        }
    }
}
module.exports = new ClassController()
export{}