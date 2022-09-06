const router = require("express").Router();
const postIdeaController = require("../controllers/postIdeaController");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/", requireAuth, postIdeaController.getAllPostIdea);
router.post("/", requireAuth, postIdeaController.createPostIdea);
router.put("/:id", requireAuth, postIdeaController.updatePostIdea);
router.delete("/:id", requireAuth, postIdeaController.deletePost);
// comments
router.patch("/comment/:id", requireAuth, postIdeaController.commentPost);
router.patch(
  "/edit-comment/:id",
  requireAuth,
  postIdeaController.editCommentPost
);
router.patch(
  "/delete-comment/:id",
  requireAuth,
  postIdeaController.deleteCommentPost
);

module.exports = router;
