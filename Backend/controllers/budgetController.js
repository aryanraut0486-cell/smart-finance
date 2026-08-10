const Budget = require("../models/Budget");

// GET budgets
const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({
      user: req.userId,
    }).sort({
      year: -1,
      month: -1,
    });

    res.status(200).json(budgets);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get budgets",
    });
  }
};

// ADD budget
const addBudget = async (req, res) => {
  try {
    const {
      category,
      limit,
      month,
      year,
    } = req.body;

    if (
      !category ||
      limit === undefined ||
      !month ||
      !year
    ) {
      return res.status(400).json({
        message:
          "Please provide category, limit, month and year",
      });
    }

    // Check if budget already exists
    const existingBudget =
      await Budget.findOne({
        user: req.userId,
        category,
        month: Number(month),
        year: Number(year),
      });

    if (existingBudget) {
      return res.status(400).json({
        message:
          `A ${category} budget already exists for this month.`,
      });
    }

    const budget = await Budget.create({
      user: req.userId,
      category,
      limit: Number(limit),
      month: Number(month),
      year: Number(year),
    });

    res.status(201).json({
      message:
        "Budget added successfully",
      budget,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to add budget",
    });
  }
};

// DELETE budget
const deleteBudget = async (req, res) => {
  try {
    const budget =
      await Budget.findOneAndDelete({
        _id: req.params.id,
        user: req.userId,
      });

    if (!budget) {
      return res.status(404).json({
        message: "Budget not found",
      });
    }

    res.status(200).json({
      message: "Budget deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete budget",
    });
  }
};

module.exports = {
  getBudgets,
  addBudget,
  deleteBudget,
};