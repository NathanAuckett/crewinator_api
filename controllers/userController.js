const Models = require('../models/index');

function createUser(req, res){
    Models.User.createUser(req, res);
}

function authenticateUser(req, res){
    Models.User.authenticateUser(req, res);
}

function getUserByEmail(req, res){
    Models.User.getUserByEmail(req, res);
}

function getUsers(res){
    Models.User.getAll(res);
}

module.exports = {
    createUser,
    authenticateUser,
    getUserByEmail,
    getUsers
}