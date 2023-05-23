import {$host,$authHost} from "./index";
import jwt_decode from "jwt-decode";
import { User} from "../models/models";
import {localToken} from "../components/checkAuth";
import {createSchoolClass, getIdClassForName} from "./taskAPI";

export const registration = async(email:string,password:string,first_name:string,last_name:string,role:string,classId:string)=>{
    try {
        const classIdResponse = await getIdClassForName(classId)
        const {data} = await $host.post('api/user/registration',{email,password,first_name,last_name,role,classId:classIdResponse,schoolId:1})
        return true
    }catch (e){
        return false
    }

}
export const login = async(email:string,password:string)=>{
    const {data} = await $host.post('api/user/login',{email,password})
    localStorage.setItem('token',data.token)
    return jwt_decode(data.token)
}
export const check = async()=>{
    try {
        const {data} = await $authHost.get('api/user/auth')
        localStorage.setItem('token',data.token)
        return jwt_decode(data.token)
    }catch (e) {
        console.log('Вход в Учётную запись не выполнена')
    }
}
export const deleteUser = async (id:number)=>{
    const {data} = await $authHost.get('api/user/delete/'+id)
    return data
}
export const checkAdminRole = async()=>{
    const unDecode = jwt_decode<User>(String(localToken))
    return unDecode.role
}
export const checkIdUser = async()=>{
    const unDecode = jwt_decode<User>(String(localToken))
    return unDecode.id
}
export const getUserForId = async(id:number)=>{
    const {data} = await $authHost.get('api/user/for-id/'+id)
    return data
}
export const userDataSchool = async()=>{
    const unDecode = jwt_decode<User>(String(localToken))
    if(unDecode.schoolId !== null){
        const {data} = await $authHost.get(`api/school/${unDecode.schoolId}`)
        return data
    }else{
        return ''
    }
}
export const userDataClass = async()=>{
    const unDecode = jwt_decode<User>(String(localToken))
    if(unDecode.classId !== null){
        const {data} = await $authHost.get(`api/class/for-id/${unDecode.classId}`)
        return data
    }else{
        return ''
    }
}
export const userDataNames = async()=>{
    const unDecode = jwt_decode<User>(String(localToken))
    const first_name = unDecode.first_name
    const last_name = unDecode.last_name
    return {
        first_name,
        last_name
    }
}