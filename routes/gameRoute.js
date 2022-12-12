const express = require("express");
const router = express.Router();
const Controllers = require('../controllers');

router.post("/create", (req, res) => {
  Controllers.GameController.createGame(req.body, res);
});

router.get("/", (req, res) => {
  if (req.query.title){
    Controllers.GameController.getByTitle(req, res);
  }
  else{
    Controllers.GameController.getGames(res);
  }
});

module.exports = router;
