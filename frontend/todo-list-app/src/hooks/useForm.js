import React from 'react';
import TaskContext from "../context/context";
import axios from 'axios';

export default function useForm(initialData, isUpdate, validateForm, setIsUpdate) {
    const [form, setForm] = React.useState(initialData);

    React.useEffect(() => {
        isUpdate === null
        ? setForm(initialData)
        : setForm(isUpdate)
    }, [initialData, isUpdate]);

    const [error, setError] = React.useState({}); 
    const [loading, setLoading] = React.useState(false);
    
    const {addTask, updateTask, uri} = React.useContext(TaskContext);

    const addTaskApi = async(task) => {
        try {
            await axios.post(uri, task);
            addTask(task);
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    const updateTaskApi = async(id, task) => {
        try {
            await axios.put(`${uri}/${id}`, task);
            updateTask(task);
        } catch (error) {
            console.error('Error: ', error);
        }
    };

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

            isUpdate === null
                ? addTaskApi(form) 
                : updateTaskApi(form._id, form);

            setLoading(false);
            setForm(initialData);
            setIsUpdate(null);
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