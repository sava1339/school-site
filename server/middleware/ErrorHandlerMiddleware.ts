const ApiError = require('../error/ApiError')
module.exports = function (err:any,req:any,res:any,next:any){
    if(err){
        return res.status(err.name).json({message:err.message})
    }
}
export{}