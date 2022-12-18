const express = require("express");
const router = express.Router();
const Controllers = require('../controllers');
const auth = require('../middleware/auth');

router.post("/create", auth, (req, res) => {
  Controllers.GameController.createGame(req.body, res);
});

router.get("/", auth, (req, res) => {
  if (req.query.title){
    Controllers.GameController.getByTitle(req, res);
  }
  else{
    Controllers.GameController.getGames(res);
  }
});

router.delete("/delete", auth, (req, res) => {
  Controllers.GameController.deleteGame(req, res);
});

module.exports = router;
