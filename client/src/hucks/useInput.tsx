import React, {useState} from 'react';

const UseInput = () => {
    const [value,setValue] = useState("")
    const onChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setValue(event.target.value)
    }
    return {
        setValue,
        value,
        onChange
    }
};

export default UseInput;