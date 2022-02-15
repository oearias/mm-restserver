const mysql = require('mysql2');


async function getConnection(){
    try {
        const pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_DATABASE,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        })

        return pool;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getConnection
}