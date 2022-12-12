require('dotenv').config();
const mysql = require('mysql2');

//Create the connection to database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    typeCast: function (field, next) {
        if (field.type === 'DATETIME'){
            let str = field.string().split(' ');
            str = str[0] + 'T' + str[1] + 'Z';

            return new Date(str);
        }
        else{
            return next();
        }
    }
});

module.exports = connection;