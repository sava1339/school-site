import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {ABOUT_US_ROUTE, INDEX_ROUTE} from "../utils/consts";
import {Context} from "../main";
import main from "../svg/untitled.png"
import TopRoutes from "../components/topRoutes";

const MainPage = () => {
    const history = useNavigate()
    const {user} = useContext(Context)
    const mouseCheck = (event:any) =>{
        const img = document.querySelector(`#mainImg`)
        const mainText = document.querySelector("#mainText")
        const mainTextTwo = document.querySelector("#mainTextTwo")
        event = event || window.event
        img.style.top = `${event.offsetY/5}px`
        img.style.right = `${event.offsetX/10-100}px`
        mainTextTwo.style.top = `${event.offsetY/6+200}px`
        mainTextTwo.style.left = `${event.offsetX/13}px`
        mainText.style.top = `${event.offsetY/8+200}px`
        mainText.style.left = `${event.offsetX/15}px`
    }
    return (
        <div  className="flex justify-center maxWidth ">
            <div className="flex flex-col items-center justify-center w-full">
                <TopRoutes/>
                <div style={{height:"620px"}} className="relative w-full">
                    <div  style={{height:"350px",marginTop:"120px",clipPath:" polygon(0% 0%, 18% 24%, 38% 0%, 58% 25%, 78% 1%, 99% 25%, 100% 78%, 78% 100%, 60% 83%, 38% 100%, 18% 80%, 1% 100%)"}}  className="main  bg-blue-100"></div>
                    <h1  id="mainTextTwo" className="unTrans absolute left-10 text-blue-500 text-6xl font-bold text-center" style={{width:"600px",top:"245px",opacity:"50%"}} >Подготовка к ВПР для учащихся 1-9 классов</h1>
                    <h1  id="mainText" className="unTrans  absolute left-10 text-blue-400 text-6xl font-bold text-center" style={{width:"600px",top:"240px"}} >Подготовка к ВПР для учащихся 1-9 классов</h1>
                    <img onMouseMove={()=>mouseCheck(event)} style={{top:"64px"}}  className="unTrans absolute right-0 top-0 w-full" id="mainImg" src={main} alt=""/>
                </div>
                <div className="my-8 bg-blue-100 w-full flex flex-col justify-center items-center">
                    <h2 className="text-center text-blue-600 text-2xl py-4">Чем полезен наш сайт?</h2>
                    <p className="text-blue-500 w-2/3 my-8 text-center">Учителя ваших классов смогут создавать разнообразные задания которые заставят пораскинуть мозгами. Тем самым вы сможете подтянуть себя в том или ином предмете  </p>
                </div>
            </div>
        </div>
    );
};

export default MainPage;