const connection = require('../dbConnect');
const mysql = require('mysql2');

function GameUser(gameID, userID) {
    this.game_id = gameID;
    this.user_id = userID;
}

function createGameUser(req, res){
    const gameUser = new GameUser(req.game_id, req.user_id);

    const sql = mysql.format(`INSERT INTO game_users SET ?`, gameUser);

    connection.query(sql,  (err, result) => {
        if (err) throw err;
        res.send({result: 200, data: result});
    });
}

function getGamesByUserID(req, res){
    const sql = mysql.format(`
        SELECT games.*
        FROM games, game_users
        
        WHERE games.game_id = game_users.game_id
        AND game_users.user_id = ?`,
    [req.query.user_id]);

    connection.query(sql,  (err, result) => {
        if (err) throw err;
        res.send({result: 200, data: result});
    });
}

function getAll(res){
    connection.query("SELECT * FROM game_users",  (err, result) => {
        if (err) throw err;
        res.send({result: 200, data: result});
    });
}

module.exports = {
    createGameUser,
    getGamesByUserID
}