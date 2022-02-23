import {
    GET_TASKS,
    ADD_TASK,
    UPDATE_TASK,
    DELETE_TASK
} from './reducersTypes';

export default function TaskReducer(state, action) {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload
            };
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            };

        case UPDATE_TASK:
            const task = action.payload;
            const editTask = state.tasks.map(
                el => el._id === task._id ? task : el
            );
            return {
                ...state,
                tasks: editTask
            };

        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(
                    el => el._id !== action.payload
                ),
            };
        default:
            return state;
    };
};