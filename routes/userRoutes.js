const router = require("express").Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const { requireAuth } = require("../middleware/authMiddleware");

// auth
router.post("/register/:token", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);
router.post("/forgotpassword", authController.forgotPassword);
router.post("/createaccount/:id", authController.createAccount);
router.post("/resetpassword/:id", authController.resetPassword);

//user
router.get("/users", requireAuth, userController.getAllUsers);
router.get("/:id", requireAuth, userController.userInfo);
router.put("/:id", requireAuth, userController.updateUser);
router.delete("/:id", requireAuth, userController.deleteUser);

module.exports = router;
