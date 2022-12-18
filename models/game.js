const connection = require('../dbConnect');
const mysql = require('mysql2');

function Game(title, imageURL) {
    this.title = title;
    this.image_url = imageURL || "";
    this.creation_date = new Date();
    this.last_update = new Date();
}

function createGame(req, res){
    try{
        const game = new Game(req.title, req.image_url);

        const sql = mysql.format(`INSERT INTO games SET ?`, game);

        connection.query(sql,  (err, result) => {
            if (err){ console.log(err); }
            else{
                res.status(200).json(result);
            }
        });
    }
    catch (err){
        res.status(500).send('Server error! Request failed!');
        console.log(err);
    }
}

function getByTitle(req, res){
    try {
        const sql = mysql.format(`SELECT * FROM games WHERE title LIKE ? LIMIT 50`, '%' + req.query.title + '%');

        connection.query(sql,  (err, result) => {
            if (err){ console.log(err); }
            else{
                //res.send({result: 200, data: result});
                res.status(200).json(result);
            }
        });
    }
    catch (err){
        res.status(500).send('Server error! Request failed!');
        console.log(err);
    }
}

function deleteGame(req, res){
    try {
        const sql = mysql.format(`DELETE FROM games WHERE game_id = ?`, [req.query.game_id]);

        console.log(sql);

        connection.query(sql,  (err, result) => {
            if (err){ console.log(err); }
            else{
                //res.send({result: 200, data: result});
                res.status(200).json(result);
            }
        });
    }
    catch (err){
        res.status(500).send('Server error! Request failed!');
        console.log(err);
    }
}

function getAll(res){
    try {
        connection.query("SELECT * FROM games LIMIT 50",  (err, result) => {
            if (err){ console.log(err); }
            else{
                //res.send({result: 200, data: result});
                res.status(200).json(result);
            }
        });
    }
    catch (err){
        res.status(500).send('Server error! Request failed!');
        console.log(err);
    }
}

module.exports = {
    createGame,
    getAll,
    getByTitle,
    deleteGame
}