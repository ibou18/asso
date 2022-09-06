const router = require("express").Router();
const expenseController = require("../controllers/expenseController");
const { requireAuth } = require("../middleware/authMiddleware");

//user
router.get("/", requireAuth, expenseController.getAllExpenses);
router.post("/", requireAuth, expenseController.createExpense);
router.get("/:id", requireAuth, expenseController.expenseInfo);
router.put("/:id", requireAuth, expenseController.updateExpense);
router.delete("/:id", requireAuth, expenseController.deleteExpense);

module.exports = router;
