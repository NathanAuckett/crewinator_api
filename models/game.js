const connection = require('../dbConnect');
const mysql = require('mysql2');

function Game(title, description, imageURL) {
    this.title = title;
    this.description = description || "";
    this.image_url = imageURL || "";
    this.creation_date = new Date();
    this.last_update = new Date();
}

function createGame(req, res){
    const game = new Game(req.title, req.description, req.image_url);

    const sql = mysql.format(`INSERT INTO games SET ?`, game);

    connection.query(sql,  (err, result) => {
        if (err) throw err;
        res.send({result: 200, data: result});
    });
}

function getByTitle(req, res){
    const sql = mysql.format(`SELECT * FROM games WHERE title LIKE ? LIMIT 50`, '%' + req.query.title + '%');

    console.log(sql);

    connection.query(sql,  (err, result) => {
        if (err) throw err;
        res.send({result: 200, data: result});
    });
}

function deleteGame(req, res){
    const sql = mysql.format(`DELETE FROM games WHERE game_id = ?`, [req.query.game_id]);

    console.log(sql);

    connection.query(sql,  (err, result) => {
        if (err) throw err;
        res.send({result: 200, data: result});
    });
}

function getAll(res){
    connection.query("SELECT * FROM games LIMIT 50",  (err, result) => {
        if (err) throw err;
        res.send({result: 200, data: result});
    });
}

module.exports = {
    Game,
    createGame,
    getAll,
    getByTitle,
    deleteGame
}