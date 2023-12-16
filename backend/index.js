const express = require('express');
const userRoutes = require('./routes/user.route');
const mysql = require('mysql2');

// create a new MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin123',
    password: 'admin123',
    database: 'testdata'
});
// connect to the MySQL database
connection.connect((error) => {
    if (error) {
        console.error('Error connecting to MySQL database:', error);
        return;
    }
});

const app = express();

app.use(express.json());
app.use('/backend/user', userRoutes);

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.use('/backend/user', userRoutes);
