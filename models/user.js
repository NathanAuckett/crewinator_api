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
                const token = jwt.sign({'user_id': result.insertId, 'username': req.username, 'email': req.email}, process.env.JWT_KEY, {expiresIn: '7d'});

                res.cookie('token', token, {httpOnly: true});
                res.status(200).json({'user_id': result.insertId, 'username': req.username});
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}

async function authenticateUser(req, res){
    try {
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
                        const token = jwt.sign({'user_id':user.user_id, 'username': user.username, 'email': req.email}, process.env.JWT_KEY, {expiresIn: '7d'});

                        res.cookie('token', token, {httpOnly: true});
                        res.status(200).json({user_id: user.user_id, username: user.username});
                    }
                    else{
                        res.status(400).send('Password incorrect!');
                    }
                }
                else{
                    res.status(400).send('Email does not exist!');
                }
            }
        });
    }
    catch (err){
        res.status(500).send('Server error! Request failed!');
        console.log(err);
    }
}

async function authenticateUserToken(req, res){
    try {
        const token = req.cookies.token;
        console.log(token);

        const decodedToken = jwt.decode(token);
        console.log(decodedToken);

        res.status(200).json({user_id: decodedToken.user_id, username: decodedToken.username});
    }
    catch (err){
        res.status(500).send('Server error! Request failed!');
        console.log(err);
    }
}

function logout(req, res){
    try {
        res.cookie('token', 'none', {expires: new Date(Date.now() + 5 * 1000), httpOnly: true });

        //res.send({result: 200, data: `Logout success!`});
        res.status(200).send(`Logout success!`);
    }
    catch (err){
        res.status(500).send('Server error! Request failed!');
        console.log(err);
    }
}

function getUserByEmail(req, res){
    try {
        const sql = mysql.format(`SELECT * FROM users WHERE email = ?`, [req.query.email]);

        console.log(sql);

        connection.query(sql,  (err, result) => {
            if (err) throw err;
            //res.send({result: 200, data: result});
            res.status(200).json(result);
        });
    }
    catch (err){
        res.status(500).send('Server error! Request failed!');
        console.log(err);
    }
}

function getAll(res){
    try {
        connection.query("SELECT * FROM users",  (err, result) => {
            if (err) throw err;
            //res.send({result: 200, data: result});
            res.status(200).json(result);
        });
    }
    catch (err){
        res.status(500).send('Server error! Request failed!');
        console.log(err);
    }
}

module.exports = {
    createUser,
    authenticateUser,
    getUserByEmail,
    getAll,
    logout,
    authenticateUserToken
}