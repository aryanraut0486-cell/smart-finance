import { useEffect, useState } from "react";

import StatCard from "../components/StatCard";
import Chart from "../components/Chart";

import API_URL from "../api";

function Dashboard() {
  const [transactions, setTransactions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // =========================
  // GET TRANSACTIONS
  // =========================

  async function fetchTransactions() {
    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/transactions`,
        {
          method: "GET",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to load transactions"
        );
      }

      setTransactions(data);

    } catch (error) {
      console.error(error);
      setError(error.message);

    } finally {
      setLoading(false);
    }
  }

  // Load transactions
  // when Dashboard opens
  useEffect(() => {
    fetchTransactions();
  }, []);

  // =========================
  // CALCULATIONS
  // =========================

  const income = transactions
    .filter(
      (transaction) =>
        transaction.type === "income"
    )
    .reduce(
      (sum, transaction) =>
        sum +
        Number(transaction.amount),
      0
    );

  const expenses = transactions
    .filter(
      (transaction) =>
        transaction.type === "expense"
    )
    .reduce(
      (sum, transaction) =>
        sum +
        Number(transaction.amount),
      0
    );

  const balance =
    income - expenses;

  const savingsRate =
    income > 0
      ? (
          (balance / income) *
          100
        ).toFixed(1)
      : 0;

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div>
        <h2>
          Loading dashboard...
        </h2>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div>
        <h2>Dashboard</h2>

        <p
          style={{
            color: "red",
          }}
        >
          {error}
        </p>
      </div>
    );
  }

  // =========================
  // DASHBOARD
  // =========================

  return (
    <div>

      {/* Header */}

      <div className="page-header">

        <div>

          <h1>
            Dashboard
          </h1>

          <p>
            Here's your financial
            overview
          </p>

        </div>

        <span>
          {new Date().toLocaleDateString()}
        </span>

      </div>

      {/* Statistics */}

      <div className="stats-grid">

        <StatCard
          title="Total Balance"
          value={`₹${balance.toLocaleString(
            "en-IN"
          )}`}
          icon="💰"
          type="green"
        />

        <StatCard
          title="Total Income"
          value={`₹${income.toLocaleString(
            "en-IN"
          )}`}
          icon="📥"
          type="blue"
        />

        <StatCard
          title="Total Expenses"
          value={`₹${expenses.toLocaleString(
            "en-IN"
          )}`}
          icon="📤"
          type="red"
        />

        <StatCard
          title="Savings Rate"
          value={`${savingsRate}%`}
          icon="🎯"
          type="purple"
        />

      </div>

      {/* Charts and Insights */}

      <div className="dashboard-grid">

        <div className="card">

          <Chart
            transactions={
              transactions
            }
          />

        </div>

        <div className="card insight">

          <h2>
            🤖 Smart Insight
          </h2>

          {transactions.length === 0 ? (

            <p>
              💡 Add some transactions
              to start receiving
              financial insights.
            </p>

          ) : expenses > income ? (

            <p>
              ⚠️ Your expenses are
              higher than your income.
              Try reducing unnecessary
              spending.
            </p>

          ) : (

            <p>
              🎉 Great! You are spending
              less than you earn.
            </p>

          )}

          <hr />

          <div className="insight-row">

            <span>
              Transactions
            </span>

            <strong>
              {transactions.length}
            </strong>

          </div>

          <div className="insight-row">

            <span>
              Current Savings
            </span>

            <strong>
              ₹
              {Math.max(
                balance,
                0
              ).toLocaleString("en-IN")}
            </strong>

          </div>

          <div className="insight-row">

            <span>
              Income
            </span>

            <strong>
              ₹
              {income.toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>

          <div className="insight-row">

            <span>
              Expenses
            </span>

            <strong>
              ₹
              {expenses.toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;