const {MongoClient, ObjectId} = require('mongodb');
const config = require('../config/index')

const USER = encodeURIComponent(config.db_user);
const PASS = encodeURIComponent(config.db_pass);

const mongoUri = `mongodb+srv://${USER}:${PASS}@cluster0.1rs8f.mongodb.net/${config.db_name}?retryWrites=true&w=majority`;

class MongoLib{
    constructor(){
        this.client = new MongoClient(mongoUri);
        this.dbname = config.db_name;
    };

    async connection() {
        if (MongoLib.connection) return MongoLib.connection;

        try {
            const dbClient = await this.client.connect();
            MongoLib.connection = await dbClient.db(this.dbname);
        } catch (error) {
            console.error('Error: ', error);
            process.exit(1);
        }

        return MongoLib.connection;
    };

    async findAll(collection){
        try {
            let db = await this.connection();
            let findNotes = await db.collection(collection).find().toArray();
            //console.log("findNotes ", findNotes);
            return findNotes;
        } catch (error) {
            console.error(error.stack);
        };
    };

    async findTask(collection, id){
        try {
            let db = await this.connection();
            let findTask = await db.collection(collection).findOne({_id: ObjectId(id)});
            console.log("id task ", findTask);
            return findTask;
        } catch (error) {
            console.error(error);
        };
    };

    async createTask(collection, data){
        try {
            let db = await this.connection();
            let newTask =  await db.collection(collection).insertOne(data);
            //console.log("newTask ", newTask);
            //console.log("id ", newTask.insertedId);
            return newTask.insertedId;
        } catch (error) {
            console.error(error.stack);
        };
    };

    async updateTask(collection, id, data){
        try {
            let db = await this.connection();
            let update = await db.collection(collection).updateOne(
                {_id: ObjectId(id)}, 
                {$set: data}, 
                { upsert: true },
            );
            return update.upsertedId || id;
        } catch (error) {
            console.error(error);
        };
    };

    async deleteTask(collection, id){
        try {
            let db = await this.connection();
            let remove = await db.collection(collection).deleteOne({_id:ObjectId(id)});
            console.log(remove);
            return remove;
        } catch (error) {
            console.error(error);
        }
    };
};

module.exports = { MongoLib };