import {makeAutoObservable} from "mobx";
import {
    checkAnswerForId,
    checkBlockAnswers,
    getAnswersForBlockAnswers,
    getBlockAnswersAll,
    getLessons,
    getSchools
} from "../http/taskAPI";
import {answerCheck, BlockAnswer, BlockTasks, checkedAnswer} from "../models/models";

export default class taskStore {
    _lessons = []
    _tasks = []
    _classes = []
    _schools = []
    _taskQuestion = []
    _questions = []
    _textQuestion = []
    _tasksFilter:number[] = []
    #checkAnswers:checkedAnswer[] = []
    #blockAnswers = []
    #answers:string[] = []

    constructor() {
        makeAutoObservable(this);
    }
    addCheckAnswer = async(data:checkedAnswer)=>{
        let check = 1
        await Promise.all(
            this.#checkAnswers.map(el=>{
                if(el.id === data.id){
                    el.mark = data.mark
                    el.comm = data.comm
                    check = 0
                }
            })
        )
        if(check){
            const arr:checkedAnswer = {
                id:data.id,
                mark:data.mark,
                comm:data.comm
            }
            this.#checkAnswers.push(arr)
        }
    }
    fetchBlockAnswers = async()=>{
        const getData = await getBlockAnswersAll(1,10)
        this.#blockAnswers = getData
    }
    checkBlockAnswers = async(blockTaskId:number,userId:number)=>{
        const answer = await checkAnswerForId(blockTaskId,userId)
        if(answer != false && answer != null){
            this._tasks = this._tasks.filter((el:BlockTasks) => el.id !== answer.blockTaskId)
        }
    }
    fetchLessons = async()=>{
        const getData = await getLessons()
        this.setLessons(getData)
    }
    fetchSchools = async()=>{
        const getData = await getSchools()
        this.setSchools(getData)
    }
    setAnswers(answers:[]){
        this.#blockAnswers = answers
    }
    setAnswer(answer:[]){
        this.#answers = answer
    }
    setTasksFilter(tasksFilter:[]){
        this._tasksFilter = tasksFilter
    }
    setTextQuestion(textQuestion:[]){
        this._textQuestion = textQuestion
    }
    setQuestions(questions:[]){
        this._questions = questions
    }
    setCheckAnswers(checkAnswers:[]){
        this.#checkAnswers = checkAnswers
    }
    setTaskQuestion(taskQuestion:[]){
        this._taskQuestion = taskQuestion
    }
    setLessons(lessons:[]){
        this._lessons = lessons
    }
    setTasks(task:[]){
        this._tasks = task
    }
    setClasses(classes:[]){
        this._classes = classes
    }
    setSchools(schools:[]){
        this._schools = schools
    }
    get blockAnswers(){
        return this.#blockAnswers
    }
    get checkAnswers(){
        return this.#checkAnswers
    }
    get answers(){
        return this.#answers
    }
    get taskQuestion(){
        return this._taskQuestion
    }
    get tasksFilter(){
        return this._tasksFilter
    }
    get textQuestion(){
        return this._textQuestion
    }
    get lessons(){
        return this._lessons
    }
    get tasks(){
        return this._tasks
    }
    get questions(){
        return this._questions
    }
    get classes(){
        return this._classes
    }
    get schools(){
        return this._schools
    }
}