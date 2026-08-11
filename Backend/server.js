const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const budgetRoutes = require("./routes/budgetRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// =========================
// HOME
// =========================

app.get("/", (req, res) => {
  res.json({
    message: "Smart Finance Backend is running 🚀",
  });
});

// =========================
// AUTHENTICATION
// =========================

app.use(
  "/api/auth",
  authRoutes
);

// =========================
// TRANSACTIONS
// =========================

app.use(
  "/api/transactions",
  transactionRoutes
);

// =========================
// BUDGETS
// =========================

app.use(
  "/api/budgets",
  budgetRoutes
);

// =========================
// SERVER
// =========================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});