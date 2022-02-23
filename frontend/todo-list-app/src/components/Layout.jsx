import React from 'react';
import NavBar from './NavBar';

function LayOut({children}){
    return(
        <div>
            <NavBar/>
            {children}
        </div>
    )
};

export default LayOut;