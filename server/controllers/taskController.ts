const {Task} = require('../models/models')
const ApiError = require('../error/ApiError')
const fs = require("fs")
const path = require('path')
class TaskController {
    async create(req:any,res:any){
        const {name,nameParams,blockTaskId}= req.body

        let pathTasks = path.join(__dirname, '..', 'TaskQuestionsText', String(name))
        let fileString = nameParams
        fs.open(pathTasks+'.txt',"w",(error:any,fd:any)=>{
            if(error){
                return error
            }else{
                fs.write(fd,fileString,(err:any,bytes:number)=>{
                    if(err){
                        return err
                    }
                })
            }
            fs.close(fd)
        })
        const task = await Task.create({name,blockTaskId})
        return res.json(task)
    }
    async getAll(req:any,res:any){
        const task = await Task.findAll()
        return res.json(task)
    }
    async getForId(req:any,res:any){
        const {id} = req.params
        const task = await Task.findAll({where:{blockTaskId:id}});
        return res.json(task)
    }
    async destroyTaskForId(req:any,res:any){
        const {id} = req.params
        try {
            const task = await Task.findOne({where:{id:id}})
            let pathQuestionData = path.join(__dirname, '..', 'TaskQuestionsText', String(task.name))
            await fs.unlink(pathQuestionData+'.txt', async(err:any)=>{
                if(err){
                    return res.json(err)
                }else{
                    await Task.destroy({where:{id:id}})
                    return res.json(true)
                }
            })
        }catch (e) {
            return e
        }
    }
    async getForOneId(req:any,res:any){
        const {id} = req.params
        const task = await Task.findOne({where:{id}})
        let pathQuestionData = path.join(__dirname, '..', 'TaskQuestionsText', String(task.name))
        await fs.readFile(pathQuestionData+'.txt',"utf-8", (err:any,data:string)=>{
            if(err){
                return res.json(err)
            }else{
                return res.json(data)
            }
        })
    }
}
module.exports = new TaskController()
export{}