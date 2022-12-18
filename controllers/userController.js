const Models = require('../models/index');

function createUser(req, res){
    Models.User.createUser(req, res);
}

function authenticateUser(req, res){
    Models.User.authenticateUser(req, res);
}

function authenticateUserToken(req, res){
    Models.User.authenticateUserToken(req, res);
}

function getUserByEmail(req, res){
    Models.User.getUserByEmail(req, res);
}

function getUsers(res){
    Models.User.getAll(res);
}

function logout(req, res){
    Models.User.logout(req, res);
}

module.exports = {
    createUser,
    authenticateUser,
    getUserByEmail,
    getUsers,
    logout,
    authenticateUserToken
}