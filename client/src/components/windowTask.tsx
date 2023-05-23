import React, {useContext, useEffect, useState} from 'react';
import {Task} from "../models/models";
import useInput from "../hucks/useInput";
import {Context} from "../main";
import {useParams} from "react-router-dom";

interface propsinterface{
    params:Task
}

const WindowTask = ({params}:propsinterface) => {
    const {task} = useContext(Context)
    const location = useParams()
    const answerInput = useInput();
    useEffect(()=>{
        getAnswer()
    },[])
    const getAnswer = () => {
        if(localStorage.getItem("Answer"+"_"+location.id+"_"+String(params.id)) != null ){
            answerInput.setValue(localStorage.getItem("Answer"+"_"+location.id+"_"+String(params.id)) || "")
        }
    }
    const onSaveHandler = (value:string)=>{
        localStorage.setItem("Answer"+"_"+location.id+"_"+String(params.id),value);
        alert("Ответ сохранен")
    }
    return (
            <div className="bg-blue-100 border-2 border-blue-300 rounded flex flex-col pl-4">
                {task.textQuestion.map((el:string)=><p key={el} className="py-4 text-blue-500 text-2xl">{el}</p>)}
                <p className="py-1 text-blue-400 text-1xl">После отправки ответа его уже нельзя будет изменить</p><br/>
                <div>
                    <textarea style={{width:"80%",height:"225px"}} onChange={answerInput.onChange} value={answerInput.value} className="rounded my-4 px-2 py-1 resize-none  " placeholder="Ответ" type="text"/>
                </div>
                <button
                    onClick={()=>onSaveHandler(String(answerInput.value))}
                    className="my-8 w-1/4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Сохранить
                </button>
            </div>
    );
};

export default WindowTask;