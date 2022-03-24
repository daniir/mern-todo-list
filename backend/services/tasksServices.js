const { MongoLib } = require('../lib/mongo');

class TaskServices {
    constructor(){
        this.collection = "notas",
        this.mongoDb = new MongoLib();
    };

    async getTasks(){
        let task = await this.mongoDb.readAllDB(this.collection);
        return task || [];
    };

    async getTask(id){
        let task = await this.mongoDb.readOneDB(this.collection, id);
        return task || {};
    }

    async insertTask(data){
        let newTask = await this.mongoDb.createDB(this.collection, data);
        return newTask;
    };

    async editTask(id, data){
        let update_task = await this.mongoDb.updateDB(this.collection, id, data);
        return update_task;
    };

    async remove(id){
        let removeTask = await this.mongoDb.deleteDB(this.collection, id);
        return removeTask;
    };

};

module.exports = { TaskServices };