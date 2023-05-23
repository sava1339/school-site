import {$authHost, $host} from "./index";
import {Answer, answerCheck, BlockAnswer, BlockTasks, checkedAnswer, Task, User} from "../models/models";
import {getUserForId} from "./userAPI";

export const checkBlockAnswer = async (id:number)=>{
    const {data} = await $host.get('api/block-answers/'+id)
    return data
}
export const getSchools = async()=>{
    const {data} = await $host.get('api/school')
    return data
}
export const getLessons = async()=>{
    const {data} = await $host.get('api/lesson')
    return data
}
export const getLessonForLesson = async(name:string)=>{
    const {data} = await $host.get('api/lesson/for-lesson/'+name)
    return data
}
export const getTasks = async ()=>{
    const {data} = await $host.get('api/block-task/all')
    const allData = data.rows
    return allData
}
export const getTask = async(id:number)=>{
    const {data} = await $authHost.get('api/task/' + id)
    return data
}
export const getOneTask = async(id:number)=>{
    const {data} = await $authHost.get('api/task/question/' + id)
    return data
}
export const getClassIdForWordClass = async(word_class:string)=>{
    const {data} = await $authHost.get('api/class/id-for-word-class/' + word_class)
    if(data != false){
        return data
    }else{
        return -404
    }
}
export const checkBlockAnswers = async(userId:number,getBlockTaskTittle:boolean = false)=>{
    const {data} = await $authHost.get('api/block-answers/check/'+userId)
    if(getBlockTaskTittle){
        data.map((el:BlockAnswer)=>{
            el.blockTask
        })
    }
    return data
}
export const postAnswersAndPointsServer = async(dataCheck:checkedAnswer[])=>{
    let points = 0;
    await Promise.all(
        dataCheck.map(async(el)=>{
            await $authHost.post('api/answer/post-check', {id:el.id,points:el.mark,comment:el.comm})
            points += el.mark
        })
    )
    const blockAnswerId = await $authHost.get('api/answer/get-answer/'+ dataCheck[0].id)
    await $authHost.post('api/block-answers/post-points/',{id:blockAnswerId.data.blockAnswerId,points:points})
    return true
}
export const checkAnswerForId = async(blockTaskId:number,userId:number)=>{
    const {data} = await $authHost.get('api/block-answers/for-id/',{params:{id:blockTaskId,userId:userId}})
    return data
}
export const getBlockTaskForId = async(id:number)=>{
    const {data} = await $authHost.get('api/block-task/for-id/'+id)
    return data
}
export const  readAnswer = async(id:number)=>{
    const {data} = await $authHost.get('api/answer/read/'+id)
    return data
}
export const getAnswersForBlockAnswers = async(blockAnswerId:number)=>{
    try {
        const listAnswers:answerCheck[] = []
        const {data} = await $authHost.get("api/answer/get-answers/"+blockAnswerId)
        await Promise.all(
            data.map(async(el:Answer)=>{
                const answerData:answerCheck = {
                    id:el.id,
                    task:"",
                    answer:""
                }
                await getOneTask(el.taskId).then(data=> answerData.task = data)
                await readAnswer(el.id).then(data => answerData.answer = data)
                listAnswers.push(answerData)
            })
        )
        return listAnswers
    }catch(e){
        return false
    }
}
export const getBlockAnswersAll = async(page:number,limit:number)=>{
    const {data} = await $authHost.get('api/block-answers/all/'+page+"&"+limit)
    const dataRows = data.rows
    await Promise.all(
        dataRows.map(async (el:BlockAnswer)=>{
            el.user = await getUserForId(el.userId).then((data:User)=>data.first_name);
            el.lastName = await getUserForId(el.userId).then((data:User)=>data.last_name)
            el.blockTask = await getBlockTaskForId(el.blockTaskId).then((data:BlockTasks)=>data.name)
        })
    )
    return dataRows
}
export const getIdClassForName = async(ClassName:string)=>{
    try {
        const {data} = await $authHost.get("api/class/id-for-word-class/"+ClassName)
        return data
    }catch (e) {
        return false
    }
}
export const createSchoolClass = async(ClassName:string)=>{
    try {
        await $authHost.post("api/class",{word_class:ClassName, schoolId:1})
        return true
    }catch (e) {
        return false
    }
}
export const createSchoolLesson = async(lessonName:string)=>{
    try {
        await $authHost.post("api/lesson",{name:lessonName})
        return true
    }catch (e) {
        return false
    }
}
export const createBlockAnswerAndAnswers = async(userId:number,blockTaskId:number,answers:Answer[])=>{
    const {data} = await  $authHost.post('api/block-answers/',{"userId":userId,"blockTaskId":blockTaskId});
    try {
        answers.map(async(el:Answer)=>{
            await $authHost.post('api/answer',{"answer":el.answerName,"blockAnswerId":data.id,"answerParams":el.answer,"taskId":el.taskId,"userId":userId})
        })
        return true
    }catch (e){
        return e
    }
}
export const createBlockTaskAndQuestions = async (blockName:string,schoolLessonId:number,classId:number,tasks:Task[])=>{
    await $authHost.post('api/block-task/',{"name":blockName,"schoolLessonId":schoolLessonId,"classId":classId})
    try {
        const {data} = await $authHost.get('api/block-task/foreign',{params:{"name":blockName,"classId":classId}})
        tasks.map(async(el:Task)=>{
            await $authHost.post('api/task',{"name":el.name,"nameParams":el.nameParams,"blockTaskId":data.id})
        })
        return true
    }catch (error){
        return error
    }
}
export const deleteBlockTask = async(id:number)=>{
    const {data} = await $authHost.get('api/block-task/for-id/'+id)
    try {
        const tasks = await $authHost.get('api/task/'+ data.id)
        await tasks.data.map(async(el:Task)=>{
            await $authHost.get('api/task/destroy-for-id/'+ el.id)
        })
        await $authHost.get('api/block-task/destroy-for-id/' +id)
        return true
    }catch (e) {
        return e
    }
}