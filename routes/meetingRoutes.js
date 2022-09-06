const router = require("express").Router();
const meetingController = require("../controllers/meetingController");
const { requireAuth } = require("../middleware/authMiddleware");

//user
router.get("/", requireAuth, meetingController.getAllMeetings);
router.post("/", requireAuth, meetingController.createMeeting);
router.get("/:id", requireAuth, meetingController.meetingInfo);
router.put("/:id", requireAuth, meetingController.updateMeeting);
router.delete("/:id", requireAuth, meetingController.deleteMeeting);

module.exports = router;
