import { useState } from "react";

function TransactionForm({ onAddTransaction }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || amount === "") {
      alert("Please enter title and amount.");
      return;
    }

    const transaction = {
      title: title.trim(),
      amount: Number(amount),
      type,
      category,
      date,
    };

    console.log(
      "Submitting:",
      transaction
    );

    await onAddTransaction(transaction);

    setTitle("");
    setAmount("");
    setType("expense");
    setCategory("Food");
  }

  return (
    <div className="card">

      <div className="section-heading">
        <h2>Add Transaction</h2>
        <p>
          Add your income or expenses
        </p>
      </div>

      <form
        className="transaction-form"
        onSubmit={handleSubmit}
      >

        <div className="input-group">
          <label>Title</label>

          <input
            type="text"
            placeholder="Example: Grocery"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />
        </div>

        <div className="input-group">
          <label>Amount</label>

          <input
            type="number"
            placeholder="₹ 0"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
          />
        </div>

        <div className="input-group">
          <label>Type</label>

          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
          >
            <option value="expense">
              Expense
            </option>

            <option value="income">
              Income
            </option>
          </select>
        </div>

        <div className="input-group">
          <label>Category</label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option>Food</option>
            <option>Shopping</option>
            <option>Travel</option>
            <option>Bills</option>
            <option>Entertainment</option>
            <option>Education</option>
            <option>Salary</option>
            <option>Other</option>
          </select>
        </div>

        <div className="input-group">
          <label>Date</label>

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
          />
        </div>

        <button
          type="submit"
          className="primary-button"
        >
          + Add Transaction
        </button>

      </form>

    </div>
  );
}

export default TransactionForm;