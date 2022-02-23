import React from 'react';
import { initialData } from '../reducer/reducersTypes';

const TaskContext = React.createContext(initialData);

export default TaskContext;