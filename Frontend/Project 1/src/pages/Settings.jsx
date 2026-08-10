import { useState } from "react";

function Settings({ onLogout }) {
  const savedUser =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  const [name, setName] = useState(
    savedUser.name || ""
  );

  const [email] = useState(
    savedUser.email || ""
  );

  // =========================
  // SAVE PROFILE
  // =========================

  function handleSave() {
    const updatedUser = {
      ...savedUser,
      name: name.trim(),
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    alert(
      "Profile updated successfully!"
    );
  }

  // =========================
  // LOGOUT
  // =========================

  function handleLogout() {
    const confirmLogout =
      window.confirm(
        "Are you sure you want to logout?"
      );

    if (!confirmLogout) {
      return;
    }

    onLogout();
  }

  return (
    <div>

      {/* Header */}

      <div className="page-header">

        <div>

          <h1>
            Settings
          </h1>

          <p>
            Manage your account settings
          </p>

        </div>

      </div>

      {/* Profile */}

      <div className="card">

        <div className="section-heading">

          <h2>
            👤 Profile
          </h2>

          <p>
            Update your personal information
          </p>

        </div>

        <div className="input-group">

          <label>
            Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Enter your name"
          />

        </div>

        <div className="input-group">

          <label>
            Email
          </label>

          <input
            type="email"
            value={email}
            disabled
          />

        </div>

        <button
          className="primary-button"
          onClick={handleSave}
        >
          Save Changes
        </button>

      </div>

      {/* Account */}

      <div className="card">

        <div className="section-heading">

          <h2>
            🔐 Account
          </h2>

          <p>
            Manage your SmartFinance account
          </p>

        </div>

        <button
          className="primary-button"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>

      </div>

    </div>
  );
}

export default Settings;