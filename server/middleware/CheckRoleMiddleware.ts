const jwt = require('jsonwebtoken')

module.exports = function(role:string){
    return function (req:any,res:any,next:any){
        if(req.method === "OPTIONS"){
            next()
        }
        try{
            const token = req.headers.authorization.split(' ')[1]//Bearer
            if (!token){
                return res.status(403).json({message:"Не авторизован!"})
            }
            const decoded = jwt.verify(token,process.env.SECRET_KEY)
            if(role.indexOf(decoded.role) === -1){
                return res.status(403).json({message:"Нет прав!"})
            }
            req.user = decoded
            next()
        }catch (e){
            res.status(403).json({message:"Не авторизован!"})
        }
    }
}
export{}