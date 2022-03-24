const {MongoClient, ObjectId} = require('mongodb');
const {db_user, db_pass, db_host, db_name} = require('../config/index')

const USER = encodeURIComponent(db_user);
const PASS = encodeURIComponent(db_pass);

const mongoUri = `mongodb+srv://${USER}:${PASS}@${db_host}/${db_name}?retryWrites=true&w=majority`;

class MongoLib{
    constructor(){
        this.client = new MongoClient(mongoUri);
        this.dbname = db_name;
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

    async readAllDB(collection){
        try {
            let db = await this.connection();
            let findNotes = await db.collection(collection).find().toArray();
            return findNotes;
        } catch (error) {
            console.error('Error: ', error);
        };
    };

    async readOneDB(collection, id){
        try {
            let db = await this.connection();
            let findTask = await db.collection(collection).findOne({_id: ObjectId(id)});
            console.log("id task ", findTask);
            return findTask;
        } catch (error) {
            console.error('Error: ', error);
        };
    };

    async createDB(collection, data){
        try {
            let db = await this.connection();
            let newTask =  await db.collection(collection).insertOne(data);
            return newTask.insertedId;
        } catch (error) {
            console.error('Error: ', error);
        };
    };

    async updateDB(collection, id, data){
        try {
            let db = await this.connection();
            let update = await db.collection(collection).updateOne(
                {_id: ObjectId(id)}, 
                {$set: data}, 
                { upsert: true },
            );
            return update.upsertedId || id;
        } catch (error) {
            console.error('Error: ', error);
        };
    };

    async deleteDB(collection, id){
        try {
            let db = await this.connection();
            let remove = await db.collection(collection).deleteOne({_id:ObjectId(id)});
            return remove;
        } catch (error) {
            console.error('Error: ', error);
        }
    };
};

module.exports = { MongoLib };