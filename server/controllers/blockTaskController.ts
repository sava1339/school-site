import * as stream from "stream";

const {Block_tasks} = require('../models/models')
const ApiError = require('../error/ApiError')
class BlockTaskController {
    async create(req:any,res:any){
        let {name,classId,schoolLessonId} = req.body
        const blockTasks = await Block_tasks.create({name,classId,schoolLessonId})
        return res.json(blockTasks)
    }
    async getAll(req:any,res:any){
        let {limit,page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page*limit-limit
        const blockTask = await Block_tasks.findAndCountAll({limit,offset})
        return res.json(blockTask)
    }
    async getForClass(req:any,res:any){
        let {limit,page,classId} = req.query
        page = page || 1
        limit = limit || 9
        classId = classId || 1
        let offset = page*limit-limit
        const blockTask = await Block_tasks.findAndCountAll({limit,offset,where:{classId}})
        return res.json(blockTask)
    }
    async getForeignBlockTask(req:any,res:any){
        let {name,classId} = req.query
        const foreign_block_task = await Block_tasks.findOne({where:{name:name,classId:classId}})
        return res.json(foreign_block_task)
    }
    async  getBlockTaskForId(req:any,res:any){
        let {id} = req.params
        const block_task = await Block_tasks.findOne({where:{id:id}})
        return res.json(block_task)
    }
    async  destroyBlockTaskForId(req:any,res:any){
        let {id} = req.params
        try {
            await Block_tasks.destroy({where:{id:id}})
            return res.json(true)
        }catch (er){
            return res.json(false)
        }
    }
}
module.exports = new BlockTaskController()
export{}