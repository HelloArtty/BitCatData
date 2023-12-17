import mysql from 'mysql2/promise';

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'catweb'
// });

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'catweb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});



export default pool;
