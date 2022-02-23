import React from 'react';
import TaskContext from './context';
import TaskReducer from '../reducer/reducer';
import { initialData } from '../reducer/reducersTypes';
import axios from 'axios';

let uri = 'http://localhost:5000/api/todo-list';

function TaskProvider({children}){

    const [state, dispatch] = React.useReducer(TaskReducer, initialData);

    const getTasks = async () => {
        try {
            const tasks = await axios.get(uri);
            dispatch({
                type: 'GET_TASKS',
                payload: tasks.data.tasks
            });
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    const addTask = async (payload) => {
        try {
            const newTask = await axios.post(uri, payload);
            dispatch({
                type: 'ADD_TASK',
                payload: newTask.data.task,
            })
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    const updateTask = async(payload) => {
        try {
            const editTask = await axios.put(`${uri}/${payload._id}`, payload);
            dispatch({
                type: "UPDATE_TASK",
                payload: editTask.data.task,
            });
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    const deleteTask = async (payload) => {
        try {
            const removeTask = await axios.delete(`${uri}/${payload}`);
            console.log(removeTask);
            dispatch({
                type: '',
                payload
            })
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    return(
        <TaskContext.Provider
            value={
                {
                    tasks: state.tasks,
                    getTasks,
                    addTask,
                    updateTask,
                    deleteTask,
                }
            }
        >
            {children}
        </TaskContext.Provider>
    );

};

export default TaskProvider;