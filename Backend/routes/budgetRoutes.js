const express = require("express");

const {
  getBudgets,
  addBudget,
  deleteBudget,
} = require("../controllers/budgetController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getBudgets
);

router.post(
  "/",
  authMiddleware,
  addBudget
);

router.delete(
  "/:id",
  authMiddleware,
  deleteBudget
);

module.exports = router;