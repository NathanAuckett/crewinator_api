const express = require("express");
const router = express.Router();
const Controllers = require('../controllers');
const auth = require('../middleware/auth');

router.post("/create", auth, (req, res) => {
  Controllers.FriendController.createFriend(req.body, res);
});

router.put("/set-friendship-status", auth, (req, res) => {
  Controllers.FriendController.setFriendshipStatus(req.body, res);
});

router.get("/from-user-id", auth, (req, res) => {
    Controllers.FriendController.getFriendsByUserID(req, res);
});

router.get("/pending-from-user-id", auth, (req, res) => {
  Controllers.FriendController.getPendingFriendsByUserID(req, res);
});



module.exports = router;
