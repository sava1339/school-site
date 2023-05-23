const {Block_Answer} = require('../models/models')
class BlockAnswersController{
    async create(req:any,res:any){
        const {userId,blockTaskId}= req.body
        const blockAnswer = await Block_Answer.create({userId,blockTaskId})
        return res.json(blockAnswer)
    }
    async getAll(req:any,res:any){
        let {page,limit} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page*limit-limit
        const blockAnswer = await Block_Answer.findAndCountAll({limit,offset})
        return res.json(blockAnswer)
    }
    async checkOne(req:any,res:any){
        const {userId} =req.params
        const blockAnswer = await Block_Answer.findAll({where:{userId:userId}})
        return res.json(blockAnswer)
    }
    async getForId(req:any,res:any){
        const {id,userId} = req.query
        try {
            const blockAnswer = await Block_Answer.findOne({where:{blockTaskId:id,userId:userId}})
            return res.json(blockAnswer)
        }catch (e) {
            return res.json(false)
        }
    }
    async getForIdAll(req:any,res:any){
        const {id} = req.params
        const blockAnswer = await Block_Answer.findAll({where:{blockTaskId:id}})
        return res.json(blockAnswer)
    }
    async postPoints(req:any,res:any) {
        let {id, points} = req.body;
        const blockAnswer = await Block_Answer.update(
            {points: points},
            {
                where: {id: id}
            })
        return res.json(blockAnswer)
    }
}
module.exports = new BlockAnswersController()
export{}