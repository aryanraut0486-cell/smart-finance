import { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError(
        "Please enter your email and password."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed"
        );
      }

      // Save JWT token
      localStorage.setItem(
        "token",
        data.token
      );

      // Save user information
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Tell App.jsx login succeeded
      if (onLogin) {
        onLogin(data.user);
      }

    } catch (error) {
      console.error(error);

      setError(error.message);

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          💰
        </div>

        <h1>SmartFinance</h1>

        <p>
          Your intelligent financial
          companion
        </p>

        {error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#dc2626",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />

          <button
            className="login-button"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        <small>
          Login with your SmartFinance
          account.
        </small>

      </div>

    </div>
  );
}

export default Login;