const {School} = require('../models/models')
const ApiError = require('../error/ApiError')
class SchoolController {
    async create(req:any,res:any){
        const {name}= req.body
        const school = await School.create({name})
        return res.json(school)
    }
    async getAll(req:any,res:any){
        const school = await School.findAll()
        return res.json(school)
    }
    async getForId(req:any,res:any){
        const {id} = req.params
        const school = await School.findOne({where:{id}})
        return res.json(school)
    }
}
module.exports = new SchoolController()
export{}