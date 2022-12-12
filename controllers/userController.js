const Models = require('../models/index');

function createUser(req, res){
    console.log(req);
    Models.User.createUser(req, res);
}

function authenticateUser(req, res){
    console.log(req);
    Models.User.authenticateUser(req, res);
}

function getUsers(res){
    Models.User.getAll(res);
}

module.exports = {
    createUser,
    authenticateUser,
    getUsers
}