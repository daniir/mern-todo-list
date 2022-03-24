import React from "react";
import TaskContext from "../context/context";
import axios from 'axios';

function Results({setIsUpdate}){

    const {tasks, deleteTask, uri} = React.useContext(TaskContext);

    const deleteTaskApi = async(taskId) => {
        try {
            await axios.delete(`${uri}/${taskId}`);
            deleteTask(taskId);
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    return(
        <div className="container">
            <h2 className="text-center">Resultados</h2>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.map((task, index) => (
                            <tr key={index}>
                                <td>{task.task}</td>
                                <td>{task.description}</td>
                                <td>
                                    <button 
                                        className="btn btn-info btn-small text-light mx-1"
                                        onClick={() => setIsUpdate(task)}>
                                        Editar
                                    </button>
                                    <button 
                                        className="btn btn-danger btn-small"
                                        onClick={() => deleteTaskApi(task._id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
};

export default Results;