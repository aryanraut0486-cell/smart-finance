import { useEffect, useState } from "react";
import BudgetCard from "../components/BudgetCard";

import API_URL from "../api";

function Budget() {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] =
    useState([]);

  const [category, setCategory] =
    useState("Food");

  const [limit, setLimit] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  // =========================
  // GET BUDGETS + TRANSACTIONS
  // =========================

  async function fetchData() {
    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        return;
      }

      const headers = {
        Authorization:
          `Bearer ${token}`,
      };

      const [
        budgetResponse,
        transactionResponse,
      ] = await Promise.all([
        fetch(
          `${API_URL}/api/budgets`,
          {
            headers,
          }
        ),

        fetch(
          `${API_URL}/api/transactions`,
          {
            headers,
          }
        ),
      ]);

      const budgetData =
        await budgetResponse.json();

      const transactionData =
        await transactionResponse.json();

      if (!budgetResponse.ok) {
        throw new Error(
          budgetData.message ||
            "Failed to load budgets"
        );
      }

      if (!transactionResponse.ok) {
        throw new Error(
          transactionData.message ||
            "Failed to load transactions"
        );
      }

      setBudgets(budgetData);
      setTransactions(
        transactionData
      );

    } catch (error) {
      console.error(error);
      setError(error.message);

    } finally {
      setLoading(false);
    }
  }

  // Load data
  useEffect(() => {
    fetchData();
  }, []);

  // =========================
  // CALCULATE SPENDING
  // =========================

  function getSpent(category) {
    const now = new Date();

    const currentMonth =
      now.getMonth() + 1;

    const currentYear =
      now.getFullYear();

    return transactions
      .filter((transaction) => {
        const transactionDate =
          new Date(
            transaction.date
          );

        return (
          transaction.type ===
            "expense" &&
          transaction.category ===
            category &&
          transactionDate.getMonth() +
              1 ===
            currentMonth &&
          transactionDate.getFullYear() ===
            currentYear
        );
      })
      .reduce(
        (sum, transaction) =>
          sum +
          Number(transaction.amount),
        0
      );
  }

  // =========================
  // ADD BUDGET
  // =========================

  async function handleSubmit(event) {
    event.preventDefault();

    if (!limit || Number(limit) <= 0) {
      alert(
        "Enter a valid budget amount."
      );
      return;
    }

    try {
      setSaving(true);

      const token =
        localStorage.getItem("token");

      if (!token) {
        alert("Please login first.");
        return;
      }

      const now = new Date();

      const response = await fetch(
        `${API_URL}/api/budgets`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            category,
            limit: Number(limit),
            month:
              now.getMonth() + 1,
            year:
              now.getFullYear(),
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to add budget"
        );
      }

      // Refresh from MongoDB
      await fetchData();

      setLimit("");

      alert(
        "Budget added successfully!"
      );

    } catch (error) {
      console.error(error);
      alert(error.message);

    } finally {
      setSaving(false);
    }
  }

  // =========================
  // DELETE BUDGET
  // =========================

  async function handleDeleteBudget(id) {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Please login first."
        );
      }

      const response = await fetch(
        `${API_URL}/api/budgets/${id}`,
        {
          method: "DELETE",

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
            "Failed to delete budget"
        );
      }

      setBudgets(
        (previous) =>
          previous.filter(
            (budget) =>
              budget._id !== id
          )
      );

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div>
        <h2>Loading budgets...</h2>
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
          <h1>Budget</h1>

          <p>
            Manage your spending limits
          </p>
        </div>

      </div>

      {/* Error */}

      {error && (
        <p
          style={{
            color: "red",
            marginBottom: "20px",
          }}
        >
          {error}
        </p>
      )}

      {/* Create Budget */}

      <div className="card">

        <div className="section-heading">

          <h2>
            Create Budget
          </h2>

          <p>
            Set a spending limit
          </p>

        </div>

        <form
          className="transaction-form"
          onSubmit={handleSubmit}
        >

          <div className="input-group">

            <label>
              Category
            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
            >
              <option value="Food">
                Food
              </option>

              <option value="Shopping">
                Shopping
              </option>

              <option value="Travel">
                Travel
              </option>

              <option value="Bills">
                Bills
              </option>

              <option value="Entertainment">
                Entertainment
              </option>

              <option value="Education">
                Education
              </option>

              <option value="Other">
                Other
              </option>
            </select>

          </div>

          <div className="input-group">

            <label>
              Limit
            </label>

            <input
              type="number"
              placeholder="₹5000"
              value={limit}
              onChange={(e) =>
                setLimit(
                  e.target.value
                )
              }
            />

          </div>

          <button
            className="primary-button"
            type="submit"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "Save Budget"}
          </button>

        </form>

      </div>

      {/* Budget Cards */}

      <div className="budget-grid">

        {budgets.length === 0 ? (

          <div className="empty-state">

            <div>💰</div>

            <h3>
              No budgets
            </h3>

            <p>
              Create your first
              budget above.
            </p>

          </div>

        ) : (

          budgets.map((budget) => (

            <BudgetCard
              key={budget._id}
              category={
                budget.category
              }
              limit={budget.limit}
              spent={getSpent(
                budget.category
              )}
              onDelete={() =>
                handleDeleteBudget(
                  budget._id
                )
              }
            />

          ))

        )}

      </div>

    </div>
  );
}

export default Budget;