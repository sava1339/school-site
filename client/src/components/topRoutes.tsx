import React, {useContext} from 'react';
import {ABOUT_US_ROUTE, INDEX_ROUTE} from "../utils/consts";
import {Context} from "../main";
import {useNavigate} from "react-router-dom";

const TopRoutes = () => {
    const {user} = useContext(Context)
    const history = useNavigate()
    return (
        <div className="bg-blue-100 w-full ">
            <div className="flex justify-center" >
                {user.isAuth && <p onClick={()=>history(INDEX_ROUTE)} className="bg-blue-200 py-3 px-6 text-blue-500 hover:text-blue-50 hover:cursor-pointer textNav">Задания</p>}
                <p onClick={()=>history(ABOUT_US_ROUTE)} className="bg-blue-200 py-3 px-6 text-blue-500 hover:text-blue-50 hover:cursor-pointer textNav">О нас</p>
            </div>
        </div>
    );
};

export default TopRoutes;