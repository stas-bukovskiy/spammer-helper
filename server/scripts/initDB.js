const mongoConnection = require('../config/database');
const User = require('../src/server/models/userModel');
const {connection} = require("mongoose");

const initializeDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoConnection();

        // Define sample data
        const users = [
            { email: 'john.doe@example.com', firstName: 'John', lastName: 'Doe', mailsSent: 5 },
            { email: 'jane.smith@example.com', firstName: 'Jane', lastName: 'Smith', mailsSent: 3 },
            { email: 'alice.jones@example.com', firstName: 'Alice', lastName: 'Jones', mailsSent: 8 },
            { email: 'michael.brown@example.com', firstName: 'Michael', lastName: 'Brown', mailsSent: 2 },
            { email: 'emily.white@example.com', firstName: 'Emily', lastName: 'White', mailsSent: 6 },
            { email: 'david.miller@example.com', firstName: 'David', lastName: 'Miller', mailsSent: 4 },
            { email: 'sarah.wilson@example.com', firstName: 'Sarah', lastName: 'Wilson', mailsSent: 7 },
            { email: 'james.taylor@example.com', firstName: 'James', lastName: 'Taylor', mailsSent: 1 },
            { email: 'linda.anderson@example.com', firstName: 'Linda', lastName: 'Anderson', mailsSent: 9 },
            { email: 'robert.clark@example.com', firstName: 'Robert', lastName: 'Clark', mailsSent: 0 },
        ];

        const insertedUsers = await User.insertMany(users);

        console.log('Sample data inserted successfully:', insertedUsers);
    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        await connection.close();
    }
};

initializeDatabase().then(r => console.log('Database initialized successfully'));