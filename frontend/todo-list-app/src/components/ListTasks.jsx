import React from 'react';
import TaskContext from '../context/context';
import Results from './Results';
import axios from 'axios';

function ListTasks({setIsUpdate}){

    
    const [loading, setLoading] = React.useState(false);
    const {getTasks, noData, uri} = React.useContext(TaskContext);

    React.useEffect(()=>{
        const getState = async() =>{
            setLoading(true);
            try {
                const resp = await axios.get(uri);
                const {tasks} = resp.data;
                getTasks(tasks);
            } catch (error) {
                console.error('Error: ', error);
                noData();
            }
            setLoading(false);
        };

        getState();
    }, [uri]);

    return(
        <div>
            {
                loading ? (<p>Loading...</p>) :(<Results setIsUpdate={setIsUpdate}/>)
            }
        </div>
    )
};

export default ListTasks;