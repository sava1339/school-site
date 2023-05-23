class ApiError extends Error{
    constructor(name:any,message:string) {
        super();
        this.name = name;
        this.message = message;
    }
    static badRequest(message:string){
        return new ApiError(404,message)
    }
    static internal(message:string){
        return new ApiError(500,message)
    }
    static forbidden(message:string){
        return new ApiError(403,message)
    }
}
module.exports= ApiError
export{}