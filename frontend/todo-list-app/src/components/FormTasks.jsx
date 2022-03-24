import React from "react";
import useForm from "../hooks/useForm";

const initialData = {
    task: '',
    description: '',
};

const validateForm = (form) => {
    let error = {};

    if(!form.task.trim()){
        error.task = "El cambo tarea es obligatorio"
    };
    if (!form.description.trim()) {
        error.description = "El campo descripción es obligatorio";
    };

    return error;
};

function FormTasks({isUpdate, setIsUpdate}){

    const {
        form, 
        error, 
        loading, 
        handleChange, 
        handleBlur,
        handleSubmit
    } = useForm(initialData, isUpdate, validateForm, setIsUpdate);

    return(
        <div className="container">
            <h2 className="text-center">{isUpdate === null ? 'Crear Tarea' : 'Editar Tarea'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <p className="font-italic">
                        Tarea
                    </p>
                    <input type="text"
                        name="task"
                        className="form-control"
                        placeholder="Agregar el nombre de la tarea"
                        onChange={handleChange}
                        onBlur={handleBlur} 
                        value={form.task}/>
                        {
                            error.task && 
                            <div className="alert alert-danger" role="alert">
                                <p className="text-white">{error.task}</p>
                            </div>
                        }
                </div>
                <div className="mb-3">
                    <p className="font-italic">
                        Descripción
                    </p>
                    <input type="text"
                        name="description"
                        className="form-control"
                        placeholder="Agrega una descripción de la tarea"
                        onChange={handleChange}
                        onBlur={handleBlur} 
                        value={form.description}/>
                        {
                            error.description && 
                            <div className="alert alert-danger" role="alert">
                                <p className="text-white">{error.description}</p>
                            </div>
                        }
                </div>
                <div className="d-grid gap-2">
                    <button className="btn btn-primary me-md-2"
                    type="submit"
                    disabled={loading ? true : false}>
                        {isUpdate === null ? 'Crear' : 'Editar'}
                    </button>
                </div>
            </form>
        </div>
    )
};

export default FormTasks;