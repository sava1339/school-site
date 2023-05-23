import React from 'react';

const LoginDone = () => {
    return (
        <div className="flex justify-center items-center mb-16 maxWidth">
            <div className="bg-blue-100 border-2 border-blue-300 rounded reg  mt-10 flex flex-col items-center justify-center">
                <h1 className='text-2xl py-4'>Вы вошли/зарегистрировались в свой аккаунт!</h1>
                <h1 className='text-2xl py-4'>Перезагрузите окно браузера!</h1>
            </div>
        </div>
    );
};

export default LoginDone;