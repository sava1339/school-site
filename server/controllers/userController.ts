const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')
const generateJwt = (id:number,email:string,first_name:string,last_name:string,classId:number,schoolId:number,role:string) =>{
    return jwt.sign(
        {id,email,first_name,last_name,classId,schoolId,role},
        process.env.SECRET_KEY,
        {expiresIn:'24h'}
    )
}
class UserController {
    async registration(req:any,res:any,next:any){
        const {first_name,last_name,email,password,classId,schoolId,role} = req.body
        if(!email || !password){
            return next(ApiError.badRequest('Некортеный email или пароль!'))
        }
        const candidate = await User.findOne({where:{email}})
        if(candidate){
            return next(ApiError.badRequest('Пользователь с таким email существует!'))
        }
        const hashPassword = await bcrypt.hash(password,5)
        const user = await User.create({email,first_name,last_name,password:hashPassword,classId,schoolId,role})
        const token = generateJwt(user.id,user.email,user.first_name,user.last_name,user.classId,user.schoolId,user.role)
        return res.json({token})
    }
    async login(req:any,res:any,next:any){
        const {email,password} = req.body
        const user = await User.findOne({where:{email}})
        if(!user){
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password,user.password)
        if(!comparePassword){
            return next(ApiError.internal('Неверный пароль!'))
        }
        const token = generateJwt(user.id,user.email,user.first_name,user.last_name,user.classId,user.schoolId,user.role)
        return res.json({token})
    }
    async check(req:any,res:any){
        const token = generateJwt(req.user.id,req.user.email,req.user.first_name,req.user.last_name,req.user.classId,req.user.schoolId,req.user.role)
        return res.json({token})
    }
    async getUserForId(req:any,res:any){
        const {id} = req.params
        const userData = await User.findOne({where:{id:id}})
        return res.json(userData)
    }
    async deleteUser(req:any,res:any){
        const {id} = req.params
        const deleteUser = await User.destroy({where:{id:id}})
        return res.json("true")
    }
}
module.exports = new UserController()
export{}