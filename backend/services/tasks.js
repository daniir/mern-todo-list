const { MongoLib } = require('../lib/mongo');

class TaskServices {
    constructor(){
        this.collection = "notas",
        this.mongoDb = new MongoLib();
    };

    async getTasks(){
        let task = await this.mongoDb.findAll(this.collection);
        return task || [];
    };

    async getTask(id){
        let task = await this.mongoDb.findTask(this.collection, id);
        return task || {};
    }

    async insertTask(data){
        let newTask = await this.mongoDb.createTask(this.collection, data);
        return newTask;
    };

    async editTask(id, data){
        console.log("id ", id);
        console.log("data ", data);
        let update_task = await this.mongoDb.updateTask(this.collection, id, data);
        return update_task;
    };

    async remove(id){
        let removeTask = await this.mongoDb.deleteTask(this.collection, id);
        return removeTask;
    };

};

module.exports = { TaskServices };