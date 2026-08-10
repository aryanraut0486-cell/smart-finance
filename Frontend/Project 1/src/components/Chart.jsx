import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

function Chart({ transactions }) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentYear =
    new Date().getFullYear();

  const data = months.map(
    (month, index) => {

      const income =
        transactions
          .filter((transaction) => {
            const date = new Date(
              transaction.date
            );

            return (
              transaction.type ===
                "income" &&
              date.getMonth() === index &&
              date.getFullYear() ===
                currentYear
            );
          })
          .reduce(
            (sum, transaction) =>
              sum +
              Number(
                transaction.amount
              ),
            0
          );

      const expense =
        transactions
          .filter((transaction) => {
            const date = new Date(
              transaction.date
            );

            return (
              transaction.type ===
                "expense" &&
              date.getMonth() === index &&
              date.getFullYear() ===
                currentYear
            );
          })
          .reduce(
            (sum, transaction) =>
              sum +
              Number(
                transaction.amount
              ),
            0
          );

      return {
        month,
        income,
        expense,
      };
    }
  );

  return (
    <div>

      <div className="section-heading">
        <h2>Income vs Expenses</h2>

        <p>
          Monthly financial overview
        </p>
      </div>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <BarChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="month"
          />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="income"
            name="Income"
            fill="#22c55e"
          />

          <Bar
            dataKey="expense"
            name="Expenses"
            fill="#ef4444"
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default Chart;