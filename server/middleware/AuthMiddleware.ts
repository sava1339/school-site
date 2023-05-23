const jwt = require('jsonwebtoken')

module.exports = function (req:any,res:any,next:any){
    if(req.method === "OPTIONS"){
        next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1]//Bearer
        console.log(token)
        if (token === null){
            return res.status(403).json({message:"Не авторизован!"})
        }
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        req.user = decoded
        next()
    }catch (e){
        return res.status(403).json({message:"Не авторизован!"})
    }
}
export{}