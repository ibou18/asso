const router = require("express").Router();
const meetingController = require("../controllers/meetingController");
const { requireAuth } = require("../middleware/authMiddleware");

// Meeting
// router.get("/", requireAuth, meetingController.getAllMeetings);
// router.post("/", requireAuth, meetingController.createMeeting);
// router.get("/:id", requireAuth, meetingController.meetingInfo);
// router.put("/:id", requireAuth, meetingController.updateMeeting);
// router.delete("/:id", requireAuth, meetingController.deleteMeeting);

// Meeting without Require
router.get("/", meetingController.getAllMeetings);
router.post("/", meetingController.createMeeting);
router.get("/:id", meetingController.meetingInfo);
router.put("/:id", meetingController.updateMeeting);
router.delete("/:id", meetingController.deleteMeeting);

module.exports = router;
