const express = require('express');
const mongoConnection = require('./config/database');
const useRoutes = require('./src/server/routes/userRoutes');
const cors = require('cors');

// Create Express app
const app = express();
const PORT = 8085;
const ALLOWED_ORIGINS = ['http://localhost:5176'];

// Connect to MongoDB
mongoConnection().then(r => console.log('Connected to MongoDB'));

app.use(express.json());
app.use(cors({
    origin: ALLOWED_ORIGINS
}));

app.use('/api/users', useRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});