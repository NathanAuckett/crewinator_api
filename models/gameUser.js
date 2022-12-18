const connection = require('../dbConnect');
const mysql = require('mysql2');

function GameUser(gameID, userID) {
    this.game_id = gameID;
    this.user_id = userID;
}

function createGameUser(req, res){
    try {
        const gameUser = new GameUser(req.game_id, req.user_id);

        const sql = mysql.format(`INSERT INTO game_users SET ?`, gameUser);

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

function getGamesByUserID(req, res){
    try {
        const sql = mysql.format(`
            SELECT games.*
            FROM games, game_users
            
            WHERE games.game_id = game_users.game_id
            AND game_users.user_id = ?`,
        [req.query.user_id]);

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
        connection.query("SELECT * FROM game_users",  (err, result) => {
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
    createGameUser,
    getGamesByUserID
}