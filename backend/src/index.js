//Librerias de Node
const express = require('express');
const cors = require('cors');
const {port} = require('../config/index.js');

//Rutas
const {todolistRoutes} = require('../routes/todolistRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Uso de las rutas
todolistRoutes(app);

app.listen(port || 3000, ()=>{
    console.log(`listening on port ${port}`);
});