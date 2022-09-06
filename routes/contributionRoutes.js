const router = require("express").Router();
const contributionController = require("../controllers/contributionController");
const { requireAuth } = require("../middleware/authMiddleware");

//user
router.get("/", requireAuth, contributionController.getAllContributions);
router.post("/", requireAuth, contributionController.createContribution);
router.get("/:id", requireAuth, contributionController.contributionInfo);
router.put("/:id", requireAuth, contributionController.updateContribution);
router.delete("/:id", requireAuth, contributionController.deleteContribution);

module.exports = router;
