import React from 'react';
import useInput from "../../hucks/useInput";
import {createSchoolClass} from "../../http/taskAPI";

const CreateClass = () => {
    const classInput = useInput()
    const createClass = async(classInputName:string)=>{
        await createSchoolClass(classInputName).then((data:boolean)=>{
            if(data){
                alert("Класс Создан!")
            }else{
                alert("Ошибка!")
            }
        })
    }
    return (
        <div className="w-2/3 flex flex-col">
            <input className=" px-2 py-1 rounded mb-2  " placeholder="Название класса. Пример:8А" value={classInput.value} onChange={classInput.onChange} type="text"/>
            <button className="bg-blue-300 rounded text-blue-50 px-4 py-2 my-4 font-bold hover:bg-blue-400" onClick={()=>createClass(classInput.value)}  >Создать</button>
        </div>
    );
};

export default CreateClass;