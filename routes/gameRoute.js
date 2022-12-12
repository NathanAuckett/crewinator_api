const express = require("express");
const router = express.Router();
const Controllers = require('../controllers');

router.post("/create", (req, res) => {
  Controllers.GameController.createGame(req.body, res);
});

router.get("/", (req, res) => {
  Controllers.GameController.getGames(res);
});

module.exports = router;
