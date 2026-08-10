function Navbar() {
  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  const name =
    user.name || "User";

  const email =
    user.email || "";

  return (
    <header className="navbar">

      <div>
        <h2>
          Smart Finance
        </h2>

        <p>
          Manage your money intelligently
        </p>
      </div>

      <div className="profile">

        <div className="profile-avatar">
          {name.charAt(0).toUpperCase()}
        </div>

        <div className="profile-info">

          <strong>
            {name}
          </strong>

          <span>
            {email || "Personal Account"}
          </span>

        </div>

      </div>

    </header>
  );
}

export default Navbar;