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
    }
};

module.exports = { TaskServices };