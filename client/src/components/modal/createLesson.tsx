import React from 'react';
import useInput from "../../hucks/useInput";
import {createSchoolLesson} from "../../http/taskAPI";

const CreateLesson = () => {
    const lessonInput = useInput()
    const createLesson = async(lessonName:string)=>{
        await createSchoolLesson(lessonName).then((data:boolean)=>{
            if(data){
                alert("Создан!")
            }else{
                alert("Ошибка!")
            }
        })
    }
    return (
        <div className="w-2/3 flex flex-col">
            <input placeholder="Название предмета" className="mb-2 py-1 px-2 rounded" value={lessonInput.value} onChange={lessonInput.onChange} type="text"/><br/>
            <button className="bg-blue-300 rounded text-blue-50 px-4 py-2 my-4 font-bold hover:bg-blue-400" onClick={()=>createLesson(lessonInput.value)}  >Создать</button>
        </div>
    );
};

export default CreateLesson;