import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import UserStore from "./store/UserStore";
import taskStore from "./store/taskStore";

export const Context = createContext(null)
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <Context.Provider value={{
            user: new UserStore(),
            task:new taskStore()
        }}>
            <App />
        </Context.Provider>
)
