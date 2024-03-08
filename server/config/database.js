const mongoose = require('mongoose');

const MONGO_PORT = process.env.MONGO_PORT ? process.env.MONGO_PORT : 27018;
const MONGO_HOST = process.env.MONGO_HOST ? process.env.MONGO_HOST : 'localhost';
const MONGO_DB = process.env.MONGO_DB ? process.env.MONGO_DB : 'warehouse';

const mongoConnection = async () => {
    try {
        await mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const db = mongoose.connection;

        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log('Database connected successfully');
        });

        console.log('Connected to MongoDB');
        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};

module.exports = mongoConnection;