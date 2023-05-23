import React from 'react';
import TopRoutes from "../components/topRoutes";

const AboutUs = () => {
    return (
        <div className=" flex justify-center maxWidth">
            <div className=" flex flex-col items-center justify-center w-full">
                <TopRoutes/>
                <div className=" bg-blue-300 w-3/4 rounded text-center py-4 w-full mt-20">
                    <h1 className=" text-blue-50 text-2xl " >Что из себя представляет данный сайт?</h1>
                    <p className=" text-blue-500 text-2xl px-4 pt-8">Сайт для создания и выполнения заданий который будут придумывать ваши учителя или же вы сами</p>
                    <p className=" text-blue-500 text-2xl px-4 pt-8">Сам сайт сделан исключительно для портфолио и для проверки навыков</p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;