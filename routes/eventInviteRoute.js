const express = require("express");
const router = express.Router();
const Controllers = require('../controllers');
const auth = require('../middleware/auth');

router.post("/create", auth, (req, res) => {
  Controllers.EventInviteController.createEventInvite(req.body, res);
});

router.put("/set-invite-status", auth, (req, res) => {
  Controllers.EventInviteController.setEventInviteStatus(req.body, res);
});

router.get("/get-pending_by_user_id", auth, (req, res) => {
  Controllers.EventInviteController.getPendingEventsByUserID(req, res);
});


module.exports = router;
