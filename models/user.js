const connection = require('../dbConnect');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

function User(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.creation_date = new Date();
    this.last_update = new Date();
}

async function createUser(req, res){
    const user = new User(req.username, req.email, req.password);
    user.password = await bcrypt.hash(user.password, 10);

    const sql = mysql.format(`INSERT INTO users SET ?`, user);

    connection.query(sql,  (err, result) => {
        if (err) throw err;
        res.send({result: 200, data: result});
    });
}

async function authenticateUser(req, res){
    console.log(req);
    
    const username = req.username;
    const email = req.email;
    
    const sql = mysql.format(`SELECT * FROM users WHERE email = ?`, email);

    connection.query(sql,  async (err, result) => {
        if (err) throw err;
        
        if (result.length > 0){
            console.log("Found a user:");
            console.log(result);

            if (await bcrypt.compare(req.password, result[0].password)){
                console.log("Login success!");
                res.send({result: 200, data: `Login success!`});
            }
            else{
                res.send({result: 400, data: `Password incorrect!`});
            }
        }
        else{
            res.send({result: 400, data: `Email does not exist!`});
        }
        
    });
}

function getAll(res){
    connection.query("SELECT * FROM crewinator.users",  (err, result) => {
        if (err) throw err;
        res.send({result: 200, data: result});
    });
}

module.exports = {
    User,
    createUser,
    authenticateUser,
    getAll
}