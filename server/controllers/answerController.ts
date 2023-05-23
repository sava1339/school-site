import * as path from "path";
import * as fs from "fs";
import {json} from "sequelize";

const {Answer} = require('../models/models')
const ApiError = require('../error/ApiError')
class AnswerController {
    async create(req:any,res:any){
        let {answer,blockAnswerId,answerParams,taskId,userId} = req.body

        let pathAnswers = path.join(__dirname,"..", "AnswersText", String(answer+"_"+userId));
        let answerString = answerParams;
        fs.open(pathAnswers+'.txt','w',(error:any,fd:any)=>{
            if(error){
                return error
            }else{
                fs.write(fd,answerString,(err:any,bytes:number)=>{
                    if(err){
                        return err
                    }
                })
            }
            fs.close(fd)
        })
        const _answer = await Answer.create({"answer":String(answer+"_"+userId),taskId,blockAnswerId})
        return res.json(_answer)
    }
    async readForId(req:any,res:any){
        const {id} = req.params;
        const _answer = await Answer.findOne({where:{id:id}})
        let pathAnswer = path.join(__dirname,"..", "AnswersText", String(_answer.answer))
        await fs.readFile(pathAnswer+".txt","utf-8",(err:any,data:string)=>{
            if(err){
                return res.json(err)
            }else{
                return res.json(data)
            }
        })
    }
    async getAnswersForId(req:any,res:any){
        const {id} = req.params;
        const _answers = await Answer.findAll({where:{blockAnswerId:id}})
        return res.json(_answers)
    }
    async getAnswerForId(req:any,res:any){
        const {id} = req.params;
        const _answers = await Answer.findOne({where:{id:id}})
        return res.json(_answers)
    }
    async getOne(req:any,res:any){
        let {id} = req.params
        const _answer = await Answer.findOne({where:{id:id}})
        return res.json(_answer)
    }
    async getAll(req:any,res:any){
        let {limit,page} = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page*limit-limit;
        const answer = await Answer.findAndCountAll({limit,offset});
        return res.json(answer);
    }
    async postData(req:any,res:any) {
        let {id, points, comment} = req.body;
        const answer = await Answer.update(
            {points: points, comment: comment},
            {
                where: {id: id}
            })
        return res.json(answer)
    }
}
module.exports = new AnswerController()
export{}