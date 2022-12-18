const Models = require('../models/index');

function createGame(req, res){
    console.log(req);
    Models.Game.createGame(req, res);
}

function getGames(res){
    Models.Game.getAll(res);
}

function getByTitle(req, res){
    Models.Game.getByTitle(req, res);
}

function deleteGame(req, res){
    Models.Game.deleteGame(req, res);
}

module.exports = {
    createGame,
    getGames,
    getByTitle,
    deleteGame
}