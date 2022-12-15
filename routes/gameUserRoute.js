const express = require("express");
const router = express.Router();
const Controllers = require('../controllers');
const auth = require('../middleware/auth');

router.post("/create", auth, (req, res) => {
  Controllers.GameUserController.createGameUser(req.body, res);
});

router.get("/from-user-id", auth, (req, res) => {
    Controllers.GameUserController.getGamesByUserID(req, res);
});

module.exports = router;
