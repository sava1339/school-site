import {
    ABOUT_US_ROUTE,
    ADMIN_PANEL, CHECK_QUESTION_STUDENTS,
    INDEX_ROUTE,
    LOGIN_DONE_ROUTE,
    LOGIN_ROUTE, MAIN_PAGE,
    PROFILE_ROUTE,
    QUESTION_TASKS_ROUTE,
    REGISTRATION_ROUTE
} from "../utils/consts";
import Profile from "../pages/Profile";
import IndexPage from "../pages/IndexPage";
import LogSignIn from "../pages/LogSignIn";
import QuestionTasks from "../pages/QuestionTasks";
import LoginDone from "../pages/loginDone";
import AdminPanel from "../pages/AdminPanel";
import CheckDoneQuestionsStudents from "../pages/CheckDoneQuestionsStudents";
import mainPage from "../pages/mainPage";
import AboutUs from "../pages/AboutUs";

export const adminRoutes = [
    {
        path: REGISTRATION_ROUTE,
        Component: LogSignIn
    },
    {
        path: ADMIN_PANEL,
        Component: AdminPanel
    }

]
export const teacherRoutes = [
    {
        path: CHECK_QUESTION_STUDENTS + "/:id",
        Component: CheckDoneQuestionsStudents
    }
]
export const authRoutes = [
    {
        path: INDEX_ROUTE,
        Component: IndexPage
    },
    {
        path: QUESTION_TASKS_ROUTE +"/:id",
        Component: QuestionTasks
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    }
]
export const publicRoutes = [
    {
        path: MAIN_PAGE,
        Component: mainPage
    },
    {
        path: ABOUT_US_ROUTE,
        Component: AboutUs
    },
    {
        path: LOGIN_ROUTE,
        Component: LogSignIn
    },
    {
        path: LOGIN_DONE_ROUTE,
        Component: LoginDone
    }
]