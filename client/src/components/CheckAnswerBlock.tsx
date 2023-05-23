import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import {Answer, answerCheck, checkedAnswer} from "../models/models";
import {Context} from "../main";
import useInput from "../hucks/useInput";
import {toJS} from "mobx";

interface params{
    params:answerCheck,
    key:number
}

const CheckAnswerBlock = ({params}:params) => {
    const textLimit = 192
    const {task} = useContext(Context)
    const [selectMark,setSelectMark] = useState("0")
    const [textArea,setTextArea] = useState("")
    const textAreaChange= (event:React.ChangeEvent<HTMLInputElement>)=>{
        setTextArea(event.target.value)
        saveData(event.target.value,-1)
    }
    const saveData = (text:string,mark:number) =>{
        const data:checkedAnswer = {
            id:params.id,
            mark:0
        }
        if(mark != -1){
            data.mark = mark
        }else{
            data.mark = +selectMark
        }
        if(text != ""){
            data.comm = text
        }else{
            data.comm = textArea
        }
        task.addCheckAnswer(data)
    }
    const renderNewMark = (selectMark:string)=>{
        setSelectMark(selectMark)
        const select = document.querySelector(`#select${params.id}`)
        select.querySelectorAll(".mark").forEach(el=>{
            if(el.classList.contains(`m${selectMark}`)){
                el.classList.add("bg-blue-500")
                el.classList.add("text-white")
                el.classList.remove("bg-blue-300")
            }else{
                el.classList.add("bg-blue-300")
                el.classList.remove("bg-blue-500")
                el.classList.remove("text-white")
            }
        })
        saveData("",+selectMark)
    }
    return (
        <div className="mx-4 my-4 px-4 py-2 bg-blue-100 rounded border-blue-800 " >
            <p className="my-2">Задание: {params.task}</p>
            <p className="my-2">Ответ: {params.answer}</p>
            <div id={"select"+String(params.id)} className="flex items-center my-2 ">
                <p>Оценка:</p>
                <div onClick={()=>{renderNewMark("1");}} className="bg-blue-300 rounded-l px-2 ml-2 hover:cursor-pointer hover:bg-blue-400 m1 mark" >1</div>
                <div onClick={()=>{renderNewMark("2");}} className="bg-blue-300 px-2 hover:cursor-pointer hover:bg-blue-400 m2 mark" >2</div>
                <div onClick={()=>{renderNewMark("3");}} className="bg-blue-300 px-2 hover:cursor-pointer hover:bg-blue-400 m3 mark" >3</div>
                <div onClick={()=>{renderNewMark("4");}} className="bg-blue-300 px-2 hover:cursor-pointer hover:bg-blue-400 m4 mark" >4</div>
                <div onClick={()=>{renderNewMark("5");}} className="bg-blue-300 rounded-r px-2 hover:cursor-pointer hover:bg-blue-400 m5 mark" >5</div>
            </div>
            <div className="flex my-2 ">
                <p>Комментарий:</p>
                <textarea onChange={textAreaChange} value={textArea} style={{width: "500px"}} rows="4" maxLength={textLimit} className=" ml-2 px-2 pt-1 rounded resize-none"/>
            </div>
        </div>
    );
};

export default CheckAnswerBlock;