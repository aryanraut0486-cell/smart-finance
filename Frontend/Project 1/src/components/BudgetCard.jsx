function BudgetCard({
  category,
  limit,
  spent,
  onDelete,
}) {
  const percentage =
    limit > 0
      ? Math.min((spent / limit) * 100, 100)
      : 0;

  const exceeded = spent > limit;

  const remaining = Math.max(
    limit - spent,
    0
  );

  return (
    <div className="card budget-card">

      <div className="budget-top">

        <div>
          <h3>{category}</h3>

          <p>
            ₹
            {spent.toLocaleString("en-IN")}
            {" "}spent
          </p>
        </div>

        <strong>
          ₹
          {limit.toLocaleString("en-IN")}
        </strong>

      </div>

      <div className="progress-bar">

        <div
          className={
            exceeded
              ? "progress danger"
              : "progress"
          }
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <p className="budget-status">

        {exceeded
          ? `⚠️ Over budget by ₹${(
              spent - limit
            ).toLocaleString("en-IN")}`
          : `₹${remaining.toLocaleString(
              "en-IN"
            )} remaining`}

      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "15px",
        }}
      >

        <span>
          {percentage.toFixed(0)}% used
        </span>

        <button
          className="delete-button"
          onClick={onDelete}
          type="button"
        >
          🗑️ Delete
        </button>

      </div>

    </div>
  );
}

export default BudgetCard;