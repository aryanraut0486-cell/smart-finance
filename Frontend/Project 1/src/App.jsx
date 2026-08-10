import { useState } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budget from "./pages/Budget";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [activePage, setActivePage] =
    useState("Dashboard");

  // Login
  function handleLogin() {
    setIsLoggedIn(true);
    setActivePage("Dashboard");
  }

  // Logout
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setActivePage("Dashboard");
  }

  // Show login page
  if (!isLoggedIn) {
    return (
      <Login
        onLogin={handleLogin}
      />
    );
  }

  // Render current page
  function renderPage() {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard />;

      case "Transactions":
        return <Transactions />;

      case "Budget":
        return <Budget />;

      case "Analytics":
        return <Analytics />;

      case "Settings":
        return (
          <Settings
            onLogout={handleLogout}
          />
        );

      default:
        return <Dashboard />;
    }
  }

  return (
    <div className="app">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        onLogout={handleLogout}
      />

      <div className="main-content">

        <Navbar />

        <main className="page-content">
          {renderPage()}
        </main>

      </div>

    </div>
  );
}

export default App;