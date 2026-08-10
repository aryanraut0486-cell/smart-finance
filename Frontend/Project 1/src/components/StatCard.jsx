function StatCard({
  title,
  value,
  icon,
  type,
}) {
  return (
    <div className="stat-card">

      <div className={`stat-icon ${type}`}>
        {icon}
      </div>

      <div>
        <p>{title}</p>

        <h2>{value}</h2>
      </div>

    </div>
  );
}

export default StatCard;