import React, {useContext, useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {INDEX_ROUTE, LOGIN_DONE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {check, checkAdminRole, login, registration} from "../http/userAPI";
import useInput from "../hucks/useInput";
import {observer} from "mobx-react-lite";
import {Context} from "../main";

const LogSignIn = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const email = useInput()
    const password = useInput()
    const first_name = useInput()
    const last_name = useInput()
    const classId = useInput()
    const schoolId = useInput()
    const [role,setRole] = useState("ADMIN")
    useEffect(()=>{
        if(user.isAuth && isLogin){
            history(INDEX_ROUTE)
        }
    },[])
    const click = async()=>{
        try {
            let data;
            if(isLogin){
                data = await login(email.value,password.value)
                window.location.reload()
            }else{
                data = await registration(email.value,password.value,first_name.value,last_name.value,role,classId.value).then(data=> data ? alert("Пользователь создан") :alert("Ошибка!"))
            }
        }catch (e:any) {
            alert(e.response.data.message)
        }
    }
    return (
        <div>
                <div className="flex justify-center items-center mb-16 maxWidth">
                    <div className="bg-blue-100 shadow-2xl rounded reg  mt-10 flex flex-col items-center justify-center">
                        <h1 className="text-2xl text-center py-4">{isLogin ? "Авторизация":"Регистрация пользователя"}</h1>
                        <form style={{width:"80%"}} >
                            {!isLogin && <div className="flex flex-col items-center justify-center">
                                {role}
                                <div className="inline-flex my-6">
                                    <button type="button" onClick={()=>setRole("ADMIN")} className="bg-blue-300 hover:bg-blue-400 text-blue-50 font-bold py-2 px-4 rounded-l">
                                        АДМИН
                                    </button>
                                    <button type="button" onClick={()=>setRole("TEACHER")} className="bg-blue-300 hover:bg-blue-400 text-blue-50 font-bold py-2 px-4">
                                        УЧИТЕЛЬ
                                    </button>
                                    <button type="button" onClick={()=>setRole("STUDENT")} className="bg-blue-300 hover:bg-blue-400 active:bg-blue-400 text-blue-50 font-bold py-2 px-4 rounded-r">
                                        УЧЕНИК
                                    </button>
                                </div>
                                <p>Имя</p>
                                <input value={first_name.value} onChange={first_name.onChange} className="px-1 rounded my-4 w-full" type="text"/>
                                <p>Фамилия</p>
                                <input value={last_name.value} onChange={last_name.onChange} className="px-1 rounded my-4 w-full" type="text"/>
                                <p>Класс</p>
                                <input value={classId.value} onChange={classId.onChange} className="px-1 rounded my-4 w-full" type="text"/>
                            </div>}
                            <div className="flex flex-col items-center justify-center">
                                <p>Электронная почта</p>
                                <input value={email.value} onChange={email.onChange} className=" px-1 rounded my-4 w-full " type="email"/>
                                <p>Пароль</p>
                                <input value={password.value} onChange={password.onChange} className="px-1 rounded my-4 w-full" type="password"/>
                            </div>
                            <div className="flex justify-between items-center flex-wrap">
                                {isLogin && <p className="text-blue-800 ">Логин и пароль получите у своего учителя</p>}
                                <button type="button" className="bg-blue-100 border border-blue-300 rounded my-4 px-4 py-2 hover:bg-blue-300" onClick={click}>{isLogin ? "Войти":"Зарегистрировать"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

    );
});

export default LogSignIn;