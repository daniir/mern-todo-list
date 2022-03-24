import React from "react";
import FormTasks from "./components/FormTasks";
import LayOut from "./components/Layout";
import ListTasks from "./components/ListTasks";

function App() {

  //Agregar usuario para editar.
  const [isUpdate, setIsUpdate] = React.useState(null);

  return (
    <div>
      <LayOut>
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col">
              <FormTasks isUpdate={isUpdate} setIsUpdate={setIsUpdate}/>
            </div>
            <div className="col">
              <ListTasks setIsUpdate={setIsUpdate}/>
            </div>
          </div>
        </div>
      </LayOut>
    </div>
  );
}

export default App;
