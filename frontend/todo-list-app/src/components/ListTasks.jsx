import React from 'react';
import TaskContext from '../context/context';
import Results from './Results';

function ListTasks({setIsUpdate}){

    const [loading, setLoading] = React.useState(false);
    const {getTasks} = React.useContext(TaskContext);

    React.useEffect(()=>{
        const getState = () =>{
            setLoading(true);
            getTasks();
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        };

        getState();
    }, []);

    return(
        <div>
            {
                loading ? (<p>Loading...</p>) :(<Results setIsUpdate={setIsUpdate}/>)
            }
        </div>
    )
};

export default ListTasks;