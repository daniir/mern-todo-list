import React from 'react';
import TaskContext from "../context/context";

export default function useForm(initialData, validateForm) {
    const [form, setForm] = React.useState(initialData);   
    const [error, setError] = React.useState({}); 
    const [loading, setLoading] = React.useState(false); 
    
    const {addTask, updateTask} = React.useContext(TaskContext);

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]:value,
        });
    };

    const handleBlur = (e) =>{
        handleChange(e);
        setError(validateForm(form))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(validateForm(form));

        if(Object.keys(error).length === 0){
            setLoading(true);

            !form._id
                ? addTask(form) 
                : updateTask(form); 
                
            setTimeout(() => {
                setLoading(false)
            }, 2000);
            setForm(initialData);
        } else {
            return;
        }

    };

    return {
        form,
        error,
        loading,
        handleChange,
        handleBlur,
        handleSubmit
    };
};