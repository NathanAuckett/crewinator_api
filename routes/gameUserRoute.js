const express = require("express");
const router = express.Router();
const Controllers = require('../controllers');

router.post("/create", (req, res) => {
  Controllers.GameUserController.createGameUser(req.body, res);
});

router.get("/games-from-user-id", (req, res) => {
    Controllers.GameUserController.getGamesByUserID(req, res);
});

module.exports = router;
