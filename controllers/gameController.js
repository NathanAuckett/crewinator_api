const Models = require('../models/index');

function createGame(req, res){
    console.log(req);
    Models.Game.createGame(req, res);
}

function getGames(res){
    Models.Game.getAll(res);
}

module.exports = {
    createGame,
    getGames
}