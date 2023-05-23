import {makeAutoObservable} from "mobx";

export default class UserStore {
    _isAuth = false
    _isRole = ""
    _user = {}
    _userId = -1

    constructor() {
        makeAutoObservable(this)
    }
    setUserId(num:number){
        this._userId = num
    }
    setIsAuth(bool:boolean){
        this._isAuth = bool
    }
    setUser(user:any){
        this._user = user
    }
    setIsRole(userAd:any){
        this._isRole = userAd
    }
    get userId(){
        return this._userId
    }
    get isAuth(){
        return this._isAuth
    }
    get user(){
        return this._user
    }
    get isRole(){
        return this._isRole
    }
}