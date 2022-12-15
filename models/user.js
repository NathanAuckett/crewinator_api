require('dotenv').config();
const connection = require('../dbConnect');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function User(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.creation_date = new Date();
    this.last_update = new Date();
}

async function createUser(req, res){
    try {
        const user = new User(req.username, req.email, req.password);
        user.password = await bcrypt.hash(user.password, 10);

        const sql = mysql.format(`INSERT INTO users SET ?`, user);

        connection.query(sql,  (err, result) => {
            if (err){ console.log(err); }
            else{
                const sql = mysql.format(`SELECT user_id, username FROM users WHERE email = ?`, [req.email]);

                connection.query(sql,  (err, result) => {
                    if (err){ console.log(err); }
                    else{
                        const token = jwt.sign({username: req.username, email: req.email}, process.env.JWT_KEY, {expiresIn: '7d'});

                        result[0].token = token;
                        res.send({result: 200, data: result});
                    }
                });
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}

async function authenticateUser(req, res){
    const email = req.email;
    
    const sql = mysql.format(`SELECT * FROM users WHERE email = ?`, email);

    connection.query(sql,  async (err, result) => {
        if (err) { console.log(err); }
        else{
            if (result.length > 0){
                console.log("Found a user:");
                console.log(result);
                const user = result[0];

                if (await bcrypt.compare(req.password, user.password)){
                    console.log("Login success!");
                    const token = jwt.sign({username: req.username, email: req.email}, process.env.JWT_KEY, {expiresIn: '7d'});

                    res.cookie('token', token, {httpOnly: true});
                    res.send({result: 200, data: {user_id: user.user_id, username: user.username, token: token}});
                }
                else{
                    res.send({result: 400, data: `Password incorrect!`});
                }
            }
            else{
                res.send({result: 400, data: `Email does not exist!`});
            }
        }
    });
}

function getUserByEmail(req, res){
    const sql = mysql.format(`SELECT * FROM users WHERE email = ?`, [req.query.email]);

    console.log(sql);

    connection.query(sql,  (err, result) => {
        if (err) throw err;
        res.send({result: 200, data: result});
    });
}

function getAll(res){
    connection.query("SELECT * FROM users",  (err, result) => {
        if (err) throw err;
        res.send({result: 200, data: result});
    });
}

module.exports = {
    User,
    createUser,
    authenticateUser,
    getUserByEmail,
    getAll
}