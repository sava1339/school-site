import React, {useContext} from 'react';
import {adminRoutes, authRoutes, publicRoutes, teacherRoutes} from "../routes/routes";
import {Navigate, Route, Routes} from "react-router-dom";
import {ADMIN_ROLE, INDEX_ROUTE, MAIN_PAGE, TEACHER_ROLE} from "../utils/consts";
import {Context} from "../main";

const AppRouter = () => {
    const {user} = useContext(Context)
    return (
        <Routes className="app">
            {user.isRole === ADMIN_ROLE && adminRoutes.map(({path,Component})=>
                <Route key={path} path={path} element={<Component/>} />
            )}
            {(user.isRole === ADMIN_ROLE || user.isRole === TEACHER_ROLE ) && teacherRoutes.map(({path,Component})=>
                <Route key={path} path={path} element={<Component/>} />
            )}
            {user.isAuth && authRoutes.map(({path,Component})=>
                <Route key={path} path={path} element={<Component/>} />
            )}
            {publicRoutes.map(({path,Component})=>
                <Route key={path} path={path} element={<Component/>} />
            )}
            <Route path="*" element={<Navigate to={MAIN_PAGE}/>}></Route>
        </Routes>
    );
};

export default AppRouter;