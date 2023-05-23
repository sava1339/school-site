import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import WindowTask from "../components/windowTask";
import {
    checkAnswerForId,
    checkBlockAnswer,
    createBlockAnswerAndAnswers,
    getOneTask,
    getTask
} from "../http/taskAPI";
import {Answer, Task} from "../models/models";
import {observer} from "mobx-react-lite";
import {Context} from "../main";
import {checkIdUser} from "../http/userAPI";
import {INDEX_ROUTE} from "../utils/consts";

const QuestionTasks = observer(() => {
    const location = useParams()
    const getId = +(location.id)
    const history = useNavigate()
    const {task,user} = useContext(Context)
    const [loading,setLoading]=useState(true)
    const [filter,setFilter] = useState(1)


    const getTasksInDB = async()=>{
        const check = await checkAnswerForId(getId,user.userId)
        console.log(check)
        check != null ? history(INDEX_ROUTE) : null
        try {
            const ques = [0]
            await getTask(getId).then((data) => {
                task.setTaskQuestion(data)
            })
            for(let i = 0;i<task.taskQuestion.length;i++){
                ques.push(i+1)
            }
            await getOneTask(task.taskQuestion[0].id).then((data:any)=>task.setTextQuestion(data.split("\n")))
            task.setQuestions(ques)
            setLoading(false)
        }catch (e) {
            console.log(e)
        }
    }
    const sendBlockAnswers = async()=>{
        const answers:Answer[] = []
        task.taskQuestion.map((el:Task)=>{
            const localStorageData = localStorage.getItem(`Answer_${location.id}_${el.id}`);
            if(localStorageData != null && localStorageData != ""){
                answers.push({taskId:el.id, answer:localStorageData, answerName:`Answer_${location.id}_${el.id}`})
            }else{
                return false
            }
        })
        if(task.taskQuestion.length === answers.length){
            await createBlockAnswerAndAnswers(user.userId,location.id,answers).then(data=>console.log(data))
            history(INDEX_ROUTE)
        }else{
            alert("Не все задания выполнены!")
            answers.length = 0
        }
    }
    const checkDefinedAnswers = () =>{
        checkBlockAnswer(getId).then(data=> console.log(data))
    }
    const questionTaskController = async(filter:number)=>{
        setFilter(filter);
        setLoading(true)
        await getOneTask(task.taskQuestion[filter-1].id).then((data:any)=>task.setTextQuestion(data.split("\n")))
        setLoading(false)
    }
    useEffect(()=>{
        getTasksInDB()
    },[])



    function nocopy(event:any) {
        let events = event || window.event
        if (events.preventDefault) { events.preventDefault(); }
        else { events.returnValue = false; }
        return false;
    }

    document.onmouseup = nocopy;
    document.onmousemove = nocopy;
    document.ondragstart = nocopy;
    document.onselectstart = nocopy;
    document.oncopy = nocopy;
    return (
        <div>
            {loading ?
                <div className="text-center mt-16">
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

                    <div className="flex justify-center items-center mb-16 maxWidth flex-col">
                        <div className="flex">
                            {task.questions.map((el:number)=>
                                <div key={el}>
                                    {el != 0 && <div onClick={()=> questionTaskController(el) } className="mx-1 text-blue-700 text-center border border-blue-300 mb-2 mt-8 w-10 h-7 rounded-full bg-blue-100 hover:cursor-pointer" >{el}</div>}
                                </div>
                            )}
                        </div>
                        {task.taskQuestion.map((el:Task)=>
                            <div key={el.id} className="w-2/4" >
                                {task.taskQuestion[filter-1].id === el.id ? <WindowTask key={el.id} params={el}></WindowTask> : <></> }
                            </div>
                        )}
                        <button
                            onClick={()=>sendBlockAnswers()}
                            className="mt-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            Отправить Ответы
                        </button>
                    </div>
            }
        </div>
    );
});

export default QuestionTasks;