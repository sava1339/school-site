import React, {useState} from 'react';
import CreateTask from "../components/modal/createTask";
import CreateLesson from "../components/modal/createLesson";
import CreateClass from "../components/modal/createClass";

const AdminPanel = () => {
    const [status,setStatus] = useState("Блок Заданий")
    return (
        <div className="flex justify-center items-center mb-16 maxWidth">
            <div className="bg-blue-100 shadow-2xl rounded reg  mt-10 flex flex-col items-center justify-center">
                <div className="  bg-blue-300 rounded text-blue-50 px-4 py-2 mt-4 font-bold">{status}</div>
                <div className="inline-flex my-6">
                    <button onClick={()=>setStatus("Школа")} className="bg-blue-300 hover:bg-blue-400 text-blue-50 font-bold py-2 px-4 rounded-l">
                        Школа
                    </button>
                    <button onClick={()=>setStatus("Класс")} className="bg-blue-300 hover:bg-blue-400 text-blue-50 font-bold py-2 px-4">
                        Класс
                    </button>
                    <button onClick={()=>setStatus("Предмет")} className="bg-blue-300 hover:bg-blue-400 text-blue-50 font-bold py-2 px-4">
                        Предмет
                    </button>
                    <button onClick={()=>setStatus("Задание")} className="bg-blue-300 hover:bg-blue-400 active:bg-blue-400 text-blue-50 font-bold py-2 px-4 rounded-r">
                        Задание
                    </button>
                </div>
                {status === "Класс" &&
                    <CreateClass/>
                }
                {status === "Предмет" &&
                    <CreateLesson/>
                }
                {status === "Задание" &&
                    <CreateTask/>
                }
            </div>
        </div>
    );
};

export default AdminPanel;