import { useEffect, useState } from "react";

import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

import API_URL from "../api";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);

  // GET TRANSACTIONS
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
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  // ADD TRANSACTION
  async function handleAddTransaction(newTransaction) {
    try {
      setAdding(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login first.");
      }

      const response = await fetch(
        `${API_URL}/api/transactions`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(newTransaction),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to add transaction"
        );
      }

      // Reload from MongoDB
      await fetchTransactions();

    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setAdding(false);
    }
  }

  // DELETE TRANSACTION
  async function handleDeleteTransaction(id) {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login first.");
      }

      const response = await fetch(
        `${API_URL}/api/transactions/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete transaction"
        );
      }

      setTransactions((previous) =>
        previous.filter(
          (transaction) =>
            transaction._id !== id
        )
      );

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>

      <div className="page-header">
        <div>
          <h1>Transactions</h1>

          <p>
            Manage your income and expenses
          </p>
        </div>
      </div>

      <TransactionForm
        onAddTransaction={
          handleAddTransaction
        }
      />

      {adding && (
        <p>Adding transaction...</p>
      )}

      {loading && (
        <p>Loading transactions...</p>
      )}

      {error && (
        <p
          style={{
            color: "red",
            marginTop: "15px",
          }}
        >
          {error}
        </p>
      )}

      {!loading && !error && (
        <TransactionList
          transactions={transactions}
          onDeleteTransaction={
            handleDeleteTransaction
          }
        />
      )}

    </div>
  );
}

export default Transactions;