import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import API_URL from "../api";

function Analytics() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const colors = [
    "#2563eb",
    "#22c55e",
    "#ef4444",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#14b8a6",
  ];

  // =========================
  // GET TRANSACTIONS
  // =========================

  async function fetchTransactions() {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/transactions`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check response before trying JSON
      const contentType =
        response.headers.get("content-type");

      if (!contentType?.includes("application/json")) {
        throw new Error(
          "Server returned an invalid response. Please check the backend URL."
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to load transactions"
        );
      }

      setTransactions(data);

    } catch (error) {
      console.error(error);
      setError(
        error.message ||
          "Failed to load analytics"
      );

    } finally {
      setLoading(false);
    }
  }

  // Load transactions
  useEffect(() => {
    fetchTransactions();
  }, []);

  // =========================
  // EXPENSES
  // =========================

  const expenses = transactions.filter(
    (transaction) =>
      transaction.type === "expense"
  );

  // =========================
  // INCOME
  // =========================

  const income = transactions.filter(
    (transaction) =>
      transaction.type === "income"
  );

  // =========================
  // CATEGORY DATA
  // =========================

  const categoryData = {};

  expenses.forEach((transaction) => {
    const category =
      transaction.category || "Other";

    categoryData[category] =
      (categoryData[category] || 0) +
      Number(transaction.amount);
  });

  const data = Object.entries(
    categoryData
  ).map(([category, amount]) => ({
    category,
    amount,
  }));

  // =========================
  // TOTAL EXPENSES
  // =========================

  const totalExpenses = expenses.reduce(
    (sum, transaction) =>
      sum + Number(transaction.amount),
    0
  );

  // =========================
  // TOTAL INCOME
  // =========================

  const totalIncome = income.reduce(
    (sum, transaction) =>
      sum + Number(transaction.amount),
    0
  );

  // =========================
  // BALANCE
  // =========================

  const balance =
    totalIncome - totalExpenses;

  // =========================
  // HIGHEST CATEGORY
  // =========================

  const highestCategory =
    data.length > 0
      ? data.reduce(
          (highest, item) =>
            item.amount > highest.amount
              ? item
              : highest
        )
      : null;

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="card">
        <h2>Loading analytics...</h2>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="card">
        <div className="section-heading">
          <h2>Analytics</h2>

          <p
            style={{
              color: "red",
            }}
          >
            {error}
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <div>

      {/* Header */}

      <div className="page-header">
        <div>
          <h1>Analytics</h1>

          <p>
            Understand your spending
            behavior
          </p>
        </div>
      </div>

      {/* Statistics */}

      <div className="analytics-grid">

        <div className="card">
          <span>
            Total Income
          </span>

          <h2>
            ₹
            {totalIncome.toLocaleString(
              "en-IN"
            )}
          </h2>
        </div>

        <div className="card">
          <span>
            Total Expenses
          </span>

          <h2>
            ₹
            {totalExpenses.toLocaleString(
              "en-IN"
            )}
          </h2>
        </div>

        <div className="card">
          <span>
            Balance
          </span>

          <h2>
            ₹
            {balance.toLocaleString(
              "en-IN"
            )}
          </h2>
        </div>

        <div className="card">
          <span>
            Categories
          </span>

          <h2>
            {data.length}
          </h2>
        </div>

      </div>

      {/* Expense Chart */}

      <div className="card analytics-chart">

        <div className="section-heading">
          <h2>
            Expense Distribution
          </h2>

          <p>
            See where your money is going
          </p>
        </div>

        {data.length === 0 ? (

          <div className="empty-state">

            <div>📊</div>

            <h3>
              No analytics data
            </h3>

            <p>
              Add expenses to generate
              analytics.
            </p>

          </div>

        ) : (

          <ResponsiveContainer
            width="100%"
            height={400}
          >

            <PieChart>

              <Pie
                data={data}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={130}
                label
              >

                {data.map(
                  (_, index) => (
                    <Cell
                      key={index}
                      fill={
                        colors[
                          index %
                            colors.length
                        ]
                      }
                    />
                  )
                )}

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        )}

      </div>

      {/* Category Breakdown */}

      {data.length > 0 && (

        <div className="card">

          <div className="section-heading">

            <h2>
              Category Breakdown
            </h2>

            <p>
              Your spending by category
            </p>

          </div>

          <div className="transaction-list">

            {[...data]
              .sort(
                (a, b) =>
                  b.amount -
                  a.amount
              )
              .map((item) => {

                const percentage =
                  totalExpenses > 0
                    ? (
                        (item.amount /
                          totalExpenses) *
                        100
                      ).toFixed(1)
                    : 0;

                return (

                  <div
                    className="transaction-row"
                    key={item.category}
                  >

                    <div className="transaction-info">

                      <strong>
                        {item.category}
                      </strong>

                      <span>
                        {percentage}% of
                        total expenses
                      </span>

                    </div>

                    <strong>
                      ₹
                      {item.amount.toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                  </div>

                );
              })}

          </div>

        </div>

      )}

      {/* Smart Insight */}

      {highestCategory && (

        <div className="card smart-insight">

          <h2>
            🤖 Smart Insight
          </h2>

          <p>
            Your highest spending
            category is{" "}

            <strong>
              {highestCategory.category}
            </strong>.
          </p>

          <p>
            You spent ₹
            {highestCategory.amount.toLocaleString(
              "en-IN"
            )}{" "}
            in this category.
          </p>

          {totalExpenses > 0 && (

            <p>
              This represents{" "}

              <strong>
                {(
                  (highestCategory.amount /
                    totalExpenses) *
                  100
                ).toFixed(1)}
                %
              </strong>{" "}

              of your total expenses.
            </p>

          )}

        </div>

      )}

    </div>
  );
}

export default Analytics;