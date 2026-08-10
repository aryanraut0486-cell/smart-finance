const Transaction = require("../models/Transaction");

// GET all transactions for logged-in user
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.userId,
    }).sort({
      date: -1,
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get transactions",
    });
  }
};

// ADD transaction
const addTransaction = async (req, res) => {
  try {
    const {
      title,
      amount,
      type,
      category,
      date,
    } = req.body;

    if (
      !title ||
      amount === undefined ||
      !type ||
      !category ||
      !date
    ) {
      return res.status(400).json({
        message:
          "Please provide all transaction details",
      });
    }

    const transaction =
      await Transaction.create({
        user: req.userId,
        title,
        amount,
        type,
        category,
        date,
      });

    res.status(201).json({
      message: "Transaction added successfully",
      transaction,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add transaction",
    });
  }
};

// DELETE transaction
const deleteTransaction = async (req, res) => {
  try {
    const transaction =
      await Transaction.findOneAndDelete({
        _id: req.params.id,
        user: req.userId,
      });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      message:
        "Transaction deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to delete transaction",
    });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  deleteTransaction,
};