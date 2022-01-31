//Librerias de Node
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const config = require('./config/index.js');

//Rutas
const todoList = require('./routes/todolist');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

//Uso de las rutas
todoList(app);

const port = config.port || 3000;
app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});