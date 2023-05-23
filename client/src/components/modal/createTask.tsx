import React, {useEffect, useState} from 'react';
import useInput from "../../hucks/useInput";
import {SchoolLesson, Task} from "../../models/models";
import {createBlockTaskAndQuestions, getClassIdForWordClass, getLessonForLesson, getLessons} from "../../http/taskAPI";
import {useNavigate} from "react-router-dom";
import {INDEX_ROUTE} from "../../utils/consts";

const CreateTask = () => {
    const name = useInput()
    const schoolClass = useInput()
    const history = useNavigate()
    const [errorText,setErrorText] = useState("")
    const [color,setColor] = useState("#ffffff")
    const [task,setTask] = useState<Task[]>([])
    const [lessons,setLessons] = useState<SchoolLesson[]>([])
    const [selectLesson,setSelectLesson] = useState("Алгебра")
    useEffect(()=>{
        getLessons().then(data => setLessons(data))
    },[])
    const addTask = ()=>{
        setTask([...task,{name:String(Date.now()+Math.floor(Math.random()*101)),nameParams:""}])
    }
    const changeTask = (key:string,value:any,name:string)=>{
        setTask(task.map(el => el.name === name ? {...el,[key]:value} : el))
    }
    const checkTasks = async ()=>{
        setErrorText("")
        setColor("#ffffff")
        let schoolId = -1;
        let classId = -1;
        let lessonId = -1
        schoolId = 1;
        if(schoolClass.value != ""){
            await getClassIdForWordClass(schoolClass.value.toUpperCase()).then(data => classId = data)
            await getLessonForLesson(selectLesson).then((data)=>lessonId = data.id)
            if(name.value != "" && classId != -404){
                setColor("#ffffff")
                createBlockTaskAndQuestions(name.value,lessonId,classId,task).then(data => data === true ? history(INDEX_ROUTE) : console.log(data))
            }else{
                setErrorText("Не коректные данные")
                setColor("#EB1E17")
            }
        }else{
            setErrorText("Школа под таким именем не найдена!")
            setColor("#EB1E17")
        }
    }
    return (
        <div className="w-2/3 flex flex-col" >
            <p className="text-red-500 font-bold text-center py-3 ">{errorText}</p>
            <input style={{border:"2px solid"+color}} className="mb-2 py-1 px-2 rounded" value={name.value} onChange={name.onChange} placeholder="Название блока-заданий" type="text"/>
            <input style={{border:"2px solid"+color}} className="mb-2 py-1 px-2 rounded" value={schoolClass.value} onChange={schoolClass.onChange} placeholder="Класс. Пример: 8А" type="text"/>
            <select value={selectLesson} onChange={(event:React.ChangeEvent<HTMLSelectElement>)=>{setSelectLesson(event.target.value)}} className=" list mb-2 py-1 px-2 bg-white rounded ">
                {lessons.map(el=> <option key={el.id}>{el.name}</option>)}
            </select>
            <div className="w-full flex flex-col">
                {task.map(el=><textarea key={el.name} style={{height:"150px"}} value={el.nameParams} onChange={(event:React.ChangeEvent<HTMLInputElement>)=>changeTask('nameParams',event.target.value,el.name)} className=" my-4 rounded py-1 px-2  resize-none" placeholder="Задача:"/>)}
            </div>
            <button onClick={()=>{
                addTask()
            }} className="bg-blue-300 rounded text-blue-50 px-4 py-2 my-4 font-bold hover:bg-blue-400" >+</button>
            <button onClick={checkTasks} className="bg-blue-300 rounded text-blue-50 px-4 py-2 my-4 font-bold hover:bg-blue-400" >Создать Задание</button>
        </div>
    );
};

export default CreateTask;