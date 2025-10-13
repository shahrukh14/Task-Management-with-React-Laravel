import React, { useState } from "react";
import api from "../api/axios"; // adjust path if needed

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
        const res = await api.post("/api/login", { email, password });
        localStorage.setItem("token", res.data.token);

        console.log("Login success:", res.data);
        alert("Logged in successfully!");
        window.location.replace("http://127.0.0.1:8000/task");
    } catch (err) {
        console.error("Login error:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Login failed");
    } finally {
        setLoading(false);
    }
};

  return (
    <section className="d-flex justify-content-center align-items-center mt-5">
      <div
        className="card shadow p-4"
        style={{
          maxWidth: "450px",
          borderColor: "var(--color-primary)",
          width: "90%",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{ color: "var(--color-secondary)" }}
        >
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label"
              style={{ color: "var(--color-text)" }}
            >
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="password"
              className="form-label"
              style={{ color: "var(--color-text)" }}
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "white",
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="mt-3 text-center">
            <small style={{ color: "var(--color-text)" }}>
              Don't have an account?{" "}
              <a href="/register" style={{ color: "var(--color-accent)" }}>
                Register
              </a>
            </small>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
