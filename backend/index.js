
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import mysql from 'mysql2';
dotenv.config();

// create a new MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'catweb'
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
app.use(cookieParser());

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.use("/backend/auth", authRouter)
app.use("/backend/user", userRouter)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message,
    });
});