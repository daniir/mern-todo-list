const express = require('express');
const { TaskServices } = require('../services/tasks');

const taskServices = new TaskServices();

function todoList(app){
    const router = express.Router();
    app.use('/api/todo-list', router);

    router.get('/', async(req, res)=>{
        try {
            let tasks = await taskServices.getTasks();
            res.status(200).json({
                tasks,
                message: 'Tasks listed',
            });
        } catch (error) {
            console.error(error);
        }
    });

    router.get('/:id', async(req, res)=>{
        const id = req.params;
        console.log(id);
        try {
            let task = await taskServices.getTask(id);
            res.status(200).json({
                task,
                message: 'task found'
            })
        } catch (error) {
            console.error(error);
        }
    });

    router.post('/', async(req, res)=>{
        const {body: task} = req;
        console.log(task);
        try {
            let newTask = await taskServices.insertTask(task);
            res.status(200).json({
                task,
                message: newTask
            });
        } catch (error) {
            console.error(error);
        }
    });

    router.put('/:id', async(req, res) =>{
        const {id} = req.params;
        const task = req.body;
        console.log(id);
        console.log(task);

        try {
            let updateTask = await taskServices.editTask(id, task);
            res.status(201).json({
                updateTask,
                message: `task ${id} has been updated`,
            });
        } catch (error) {
            console.error(error);
        }
    });

    router.delete('/:id', async(req, res) =>{
        const {id} = req.params;
        try {
            let deleteTask = await taskServices.remove(id);
            res.status(200).json({
                deleteTask,
                message: 'Task deleted'
            });
        } catch (error) {
            console.error(error);
        }
    });
};

module.exports = todoList;