function TransactionList({
  transactions,
  onDeleteTransaction,
}) {
  return (
    <div>
      <div className="section-heading">
        <h2>Recent Transactions</h2>

        <p>
          Your latest financial activity
        </p>
      </div>

      {transactions.length === 0 ? (
        <div className="empty-state">
          <div>💳</div>

          <h3>No transactions</h3>

          <p>
            Add your first transaction.
          </p>
        </div>
      ) : (
        <div className="transaction-list">

          {transactions.map((transaction) => (
            <div
              className="transaction-row"
              key={transaction._id}
            >

              <div className="transaction-icon">
                {transaction.type === "income"
                  ? "📥"
                  : "📤"}
              </div>

              <div className="transaction-info">

                <strong>
                  {transaction.title}
                </strong>

                <span>
                  {transaction.category} •{" "}
                  {new Date(
                    transaction.date
                  ).toLocaleDateString()}
                </span>

              </div>

              <strong
                className={
                  transaction.type === "income"
                    ? "income-text"
                    : "expense-text"
                }
              >
                {transaction.type === "income"
                  ? "+"
                  : "-"}
                ₹
                {Number(
                  transaction.amount
                ).toLocaleString("en-IN")}
              </strong>

              <button
                className="delete-button"
                onClick={() =>
                  onDeleteTransaction(
                    transaction._id
                  )
                }
              >
                🗑️
              </button>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default TransactionList;