const express = require("express");
const router = express.Router();
const Controllers = require('../controllers');
const auth = require('../middleware/auth');

router.post("/create", (req, res) => {
  Controllers.UserController.createUser(req.body, res);
});

router.post("/authenticate", (req, res) => {
  Controllers.UserController.authenticateUser(req.body, res);
});

router.post("/authenticate-token", auth, (req, res) => {
  Controllers.UserController.authenticateUserToken(req, res);
});

router.get("/from-email", auth, (req, res) => {
  Controllers.UserController.getUserByEmail(req, res);
});

router.get("/", auth, (req, res) => {
  Controllers.UserController.getUsers(res);
});

router.post("/logout", auth, (req, res) => {
  Controllers.UserController.logout(req, res);
});

module.exports = router;
