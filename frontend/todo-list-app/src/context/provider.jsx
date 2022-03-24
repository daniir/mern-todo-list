import React from 'react';
import TaskContext from './context';
import TaskReducer from '../reducer/reducer';
import { 
    initialData,
    GET_TASKS,
    ADD_TASK,
    UPDATE_TASK,
    DELETE_TASK,
    NO_DATA
} from '../reducer/reducersTypes';

function TaskProvider({children}){

    const [state, dispatch] = React.useReducer(TaskReducer, initialData);

    const getTasks = (task) => (dispatch({type: GET_TASKS, payload: task}));

    const addTask = (task) => (dispatch({type: ADD_TASK, payload: task}));

    const updateTask = (task) => (dispatch({type: UPDATE_TASK, payload: task}));

    const deleteTask = (id) => (dispatch({type: DELETE_TASK, payload: id}));

    const noData = () => (dispatch({type: NO_DATA}));

    let uri = 'http://localhost:8080/api/todo-list';

    return(
        <TaskContext.Provider
            value={
                {
                    tasks: state.tasks,
                    getTasks,
                    addTask,
                    updateTask,
                    deleteTask,
                    noData,
                    uri,
                }
            }
        >
            {children}
        </TaskContext.Provider>
    );

};

export default TaskProvider;