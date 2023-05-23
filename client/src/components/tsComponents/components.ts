import {useContext} from "react";
import {Context} from "../../main";

const roles:any = {
    ADMIN:100,
    TEACHER:50,
}
export const checkRole = (user:string)=>{
    if(user != ""){
        return roles[user]
    }
}