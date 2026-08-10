function Sidebar({
  activePage,
  setActivePage,
  onLogout,
}) {
  const menuItems = [
    {
      name: "Dashboard",
      icon: "📊",
    },
    {
      name: "Transactions",
      icon: "💳",
    },
    {
      name: "Budget",
      icon: "💰",
    },
    {
      name: "Analytics",
      icon: "📈",
    },
  ];

  return (
    <aside className="sidebar">

      {/* Logo */}

      <div className="logo">
        <span>💰</span>

        <h2>SmartFinance</h2>
      </div>

      {/* Navigation */}

      <nav className="sidebar-menu">

        {menuItems.map((item) => (
          <button
            key={item.name}
            className={
              activePage === item.name
                ? "sidebar-item active"
                : "sidebar-item"
            }
            onClick={() =>
              setActivePage(item.name)
            }
          >
            <span>{item.icon}</span>

            <span>{item.name}</span>
          </button>
        ))}

      </nav>

      {/* Bottom */}

      <div className="sidebar-bottom">

        {/* Settings */}

        <button
          className={
            activePage === "Settings"
              ? "sidebar-item active"
              : "sidebar-item"
          }
          onClick={() =>
            setActivePage("Settings")
          }
        >
          <span>⚙️</span>

          <span>Settings</span>
        </button>

        {/* Logout */}

        <button
          className="sidebar-item logout"
          onClick={onLogout}
        >
          <span>🚪</span>

          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;