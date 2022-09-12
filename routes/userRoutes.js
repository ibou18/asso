const router = require("express").Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const { requireAuth } = require("../middleware/authMiddleware");

// auth
router.post("/register/:token", authController.signUp);
router.post("/login", authController.signIn);
router.post("/logout", authController.logout);
router.post("/forgotpassword", authController.forgotPassword);
router.post("/createaccount/:id", authController.createAccount);
router.post("/resetpassword/:id", authController.resetPassword);

//user
// router.get("/users", requireAuth, userController.getAllUsers);
// router.get("/:id", requireAuth, userController.userInfo);
// router.put("/:id", requireAuth, userController.updateUser);
// router.delete("/:id", requireAuth, userController.deleteUser);

// USER WITHOUT THE REQUIRE
router.get("/users", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
