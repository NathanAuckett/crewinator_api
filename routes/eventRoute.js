const express = require("express");
const router = express.Router();
const Controllers = require('../controllers');

router.post("/create", (req, res) => {
  Controllers.EventController.createEvent(req.body, res);
});

router.get("/", (req, res) => {
  if (req.query.month){
    Controllers.EventController.getByMonth(req, res);
  }
  else{
    Controllers.EventController.getEvents(res);
  }
});

router.get("/future", (req, res) => {
  Controllers.EventController.getFuture(res);
});

module.exports = router;
