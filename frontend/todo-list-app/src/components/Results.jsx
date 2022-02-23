import React from "react";
import TaskContext from "../context/context";

function Results({setIsUpdate}){

    const {tasks, deleteTask} = React.useContext(TaskContext);

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
                        tasks.map(task => (
                            <tr key={task._id}>
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
                                        onClick={() => deleteTask(task._id)}>
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