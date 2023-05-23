export interface BlockTasks {
    id:number,
    name:string,
    createAt:string,
    updatedAt:string,
    classId:number,
    schoolLessonId:number,
    className?:string,
    lessonName?:string
}
export interface answerCheck {
    id:number,
    task:string,
    answer:string
}
export interface SchoolClass {
    id:number,
    createAt:string,
    updatedAt:string,
    word_class:string,
    schoolId:number
}
export interface SchoolLesson{
    id:number,
    name:string,
    createAt:string,
    updatedAt:string
}
export interface School{
    id:number,
    name:string,
    createAt:string,
    updatedAt:string
}
export interface User {
    id:number,
    first_name:string,
    last_name:string,
    email:string,
    schoolId?:number,
    classId?:number,
    className:string,
    schoolName:string
    role:string
}
export interface Task{
    id?:number,
    name:string,
    nameParams?:string,
    createAt?:string,
    updatedAt?:string,
    taskNumber?:number
}
export interface Answer{
    id?:number,
    points?:number,
    answer:string,
    answerName:string,
    taskId:number,
    blockAnswerId?:number
}
export interface BlockAnswer{
    id?:number,
    points?:number,
    user?:string,
    lastName?:string,
    userId:number,
    createAt?:string,
    updatedAt?:string,
    blockTask?:string,
    blockTaskId:number
}
export interface checkedAnswer{
    id:number,
    mark:number,
    comm?:string
}