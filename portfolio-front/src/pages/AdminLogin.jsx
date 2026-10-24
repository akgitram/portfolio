import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockKeyhole, ArrowLeft } from "lucide-react";
import api from "../api/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/admin/login", form);

      console.log("Login response:", response.data);

      const token = response.data?.token;

      if (!token) {
        throw new Error("The login response did not contain a token.");
      }

      // Decode the JWT payload to read the role.
      // This decodes the payload but does not verify the token signature.
      const base64Url = token.split(".")[1];

      if (!base64Url) {
        throw new Error("The server returned an invalid JWT.");
      }

      const base64 = base64Url
        .replace(/-/g, "+")
        .replace(/_/g, "/");

      const payload = JSON.parse(
        atob(base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "="))
      );

      console.log("JWT payload:", payload);

      const role = payload.role;
      const email = payload.sub || response.data.email || form.email;

      if (role !== "ADMIN") {
        throw new Error("This account does not have administrator access.");
      }

      // Save the authenticated session.
      localStorage.setItem("token", token);

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: response.data.id ?? null,
          name: response.data.name ?? "",
          email,
          role,
        })
      );

      console.log("Stored user:", localStorage.getItem("user"));

      // Redirect to the admin dashboard.
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Admin login failed. Check your credentials."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-4 py-10">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-accent"
        >
          <ArrowLeft size={16} />
          Back to portfolio
        </Link>

        <div className="surface-card p-6 sm:p-8">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <LockKeyhole size={24} />
          </div>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Administration
          </p>

          <h1 className="text-3xl font-bold text-white">Admin Login</h1>

          <p className="mt-2 text-sm text-slate-400">
            Sign in to manage your portfolio content.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Email
              </label>

              <input
                className="field"
                type="email"
                name="email"
                autoComplete="username"
                placeholder="admin@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Password
              </label>

              <input
                className="field"
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Enter admin password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in as Admin"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}