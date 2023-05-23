import React, {useContext, useEffect, useState} from 'react';
import {deleteUser, userDataNames} from "../http/userAPI";
import {Context} from "../main";
import {useLocation, useNavigate} from "react-router-dom";
import {
    ADMIN_ROLE,
    CHECK_QUESTION_STUDENTS,
    INDEX_ROUTE,
    REGISTRATION_ROUTE,
    STUDENT_ROLE,
    TEACHER_ROLE
} from "../utils/consts";
import useInput from "../hucks/useInput";
import {observer} from "mobx-react-lite";
import {Answer, BlockAnswer} from "../models/models";
import {checkRole} from "../components/tsComponents/components";
import {checkBlockAnswers, getBlockTaskForId} from "../http/taskAPI";

const Profile = observer(() => {
    const {user,task} = useContext(Context)
    const [selectMode,setSelectMode] = useState("Профиль")
    const [userFirstName,setUserFirstName] = useState("")
    const [userLastName,setUserLastName] = useState("")
    const [loading,setLoading] = useState(true)
    const history = useNavigate()
    const userIdInput = useInput()
    const deleteUserFunc = ()=>{
        if(+userIdInput.value >= 0){
            deleteUser(+userIdInput.value).then(data=>console.log(data))
        }
    }
    const logOut = async()=>{
        await user.setUser({})
        await user.setIsAuth(false)
        await user.setIsRole("0")
        await localStorage.removeItem('token')
        window.location.reload()
    }
    const getData = async()=>{
        setLoading(true)
        if(user.isRole === ADMIN_ROLE || user.isRole === TEACHER_ROLE){
            await task.fetchBlockAnswers()
        }
        const unDecodeNames = await userDataNames()
        await setUserFirstName(unDecodeNames.first_name)
        await setUserLastName(unDecodeNames.last_name)
        setLoading(false)
    }
    const setAndGetTasks = async()=>{
        setSelectMode("Задания")
        const tasksData = await checkBlockAnswers(user.userId)
        console.log(tasksData)
    }
    const deleteUserFunction = ()=>{
        prompt("Вы точно хотите удалить свой аккаунт?")
    }
    useEffect(()=>{
        getData()
    },[])
    return (
        <div className="flex justify-center items-center my-16 maxWidth ">
            {loading ?
                <div className="text-center w-3/4 py-4">
                    <div role="status">
                        <svg aria-hidden="true"
                             className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"/>
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                :
                <div className=" bg-blue-100 rounded w-4/5 flex shadow-2xl ">
                <div className=" px-4 py-4 border-r border-blue-400 w-1/4 my-8">
                    {!loading &&
                        <ul>
                            {user.isRole === ADMIN_ROLE && <li onClick={() => history(REGISTRATION_ROUTE)}
                                                               className=" text-purple-700 hover:translate-x-1 hover:cursor-pointer border-blue-500 pt-2">Создать
                                аккаунт</li>}
                            <li onClick={() => setSelectMode("Профиль")}
                                className=" text-blue-500 hover:translate-x-1 hover:cursor-pointer border-blue-500 pt-2">Профиль
                            </li>
                            {(user.isRole === STUDENT_ROLE) &&
                                <li onClick={()=> setAndGetTasks()} className=" text-blue-500 hover:translate-x-1 hover:cursor-pointer border-blue-500 pt-2">
                                    Задания
                                </li>
                            }
                            {(user.isRole === STUDENT_ROLE) &&
                                <li onClick={()=> setSelectMode("Оценки")} className=" text-blue-500 hover:translate-x-1 hover:cursor-pointer border-blue-500 pt-2">
                                    Оценки
                                </li>
                            }
                            {(user.isRole === ADMIN_ROLE || user.isRole === TEACHER_ROLE) &&
                                <li onClick={() => setSelectMode("Ученики и их успеваемость")}
                                    className=" text-blue-500 hover:translate-x-1 hover:cursor-pointer border-blue-500 pt-2">Ученики
                                    и их успеваемость</li>
                            }
                            {(user.isRole === ADMIN_ROLE || user.isRole === TEACHER_ROLE) &&
                                <li onClick={() => setSelectMode("Новые задания")}
                                    className=" text-blue-500 hover:translate-x-1 hover:cursor-pointer border-blue-500 pt-2">Новые
                                    задания</li>
                            }
                            {(user.isRole === ADMIN_ROLE || user.isRole === TEACHER_ROLE) &&
                                <li onClick={() => setSelectMode("Задания учеников")}
                                    className=" text-blue-500 hover:translate-x-1 hover:cursor-pointer border-blue-500 pt-2">Задания
                                    учеников</li>
                            }
                            <li onClick={logOut}
                                className=" text-red-500 hover:translate-x-1 hover:cursor-pointer border-red-500 pt-2">Выйти
                            </li>
                            {user.isRole === ADMIN_ROLE && <li onClick={() => setSelectMode("Удалить аккаунт")}
                                                               className=" text-red-800 hover:translate-x-1 hover:cursor-pointer border-red-500 pt-2">Удалить
                                аккаунт</li>}
                        </ul>
                    }
                </div>
                <div className="p-4 w-3/4 text-blue-500">
                    <p className=" text-center text-2xl ">{selectMode}</p>
                    {selectMode === "Профиль" ?
                        <div className="text-blue-700">
                            <p>Имя: {userFirstName}</p>
                            <p>Фамилия: {userLastName}</p>
                        </div>
                        :
                        null
                    }
                    {selectMode === "Удалить аккаунт" ?
                        <div>
                            <input value={userIdInput.value} onChange={userIdInput.onChange} type="text"/><br/>
                            <button type="button" onClick={deleteUserFunc}
                                    className="bg-blue-100 border border-blue-300 rounded my-4 px-4 py-2 hover:bg-blue-300">Удалить
                            </button>
                        </div>
                        :
                        null
                    }
                    {selectMode === "Задания" ?
                        <div>

                        </div>
                        : null}
                    <table className="mt-4 w-full">
                        {selectMode === "Задания учеников" &&
                            task.blockAnswers.map((el: BlockAnswer) =>
                                <tbody key={el.id}>
                                    <tr onClick={() => history(CHECK_QUESTION_STUDENTS + `/${el.id}`)}
                                        className="w-full mx-2 border-2 border-blue-500 bg-white my-1 py-2 px-4 hover:cursor-pointer ">
                                        <td className="border-2 border-blue-500 pl-2">Задание: {el.blockTask}</td>
                                        <td className="border-2 border-blue-500 pl-2">Ученик: {el.lastName} | {el.user}</td>
                                    </tr>
                                </tbody>
                            )
                        }
                    </table>
                </div>
            </div>}
        </div>
    );
});

export default Profile;