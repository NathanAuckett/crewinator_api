const express = require("express");
const router = express.Router();
const Controllers = require('../controllers');
const auth = require('../middleware/auth');

router.post("/create", auth, (req, res) => {
  Controllers.EventController.createEvent(req.body, res);
});

router.get("/", auth, (req, res) => {
  if (req.query.month){
    Controllers.EventController.getByMonth(req, res);
  }
  else{
    Controllers.EventController.getEvents(res);
  }
});

router.get("/future", auth, (req, res) => {
  Controllers.EventController.getFuture(req, res);
});

router.delete("/delete", auth, (req, res) => {
  Controllers.EventController.deleteEvent(req, res);
});

module.exports = router;
