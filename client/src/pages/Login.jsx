import { useState } from "react";
import { EnvelopeSimple, Eye, EyeSlash } from "@phosphor-icons/react";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((state) => ({ ...state, [name]: value }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (typeof onLogin === "function") {
        await onLogin({ ...form });
      }
    } catch (submitError) {
      setError(submitError?.message || "Unable to login. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-card" aria-label="Counsellor login panel">
        <div className="logo-box" aria-hidden="true">
          RV
        </div>

        <header className="login-title-wrap">
          <h1>Raj Vedanta Admissions</h1>
          <p>Counsellor Login</p>
        </header>

        <hr />

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="email">Email Address</label>
          <div className="input-wrap">
            <EnvelopeSimple size={18} weight="regular" aria-hidden="true" />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="counsellor@rajvedanta.edu.in"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <label htmlFor="password">Password</label>
          <div className="input-wrap">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              className="icon-btn"
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((state) => !state)}
            >
              {showPassword ? (
                <Eye size={18} weight="regular" aria-hidden="true" />
              ) : (
                <EyeSlash size={18} weight="regular" aria-hidden="true" />
              )}
            </button>
          </div>

          {error ? (
            <p
              role="alert"
              style={{ margin: 0, color: "#dc2626", fontSize: 13 }}
            >
              {error}
            </p>
          ) : null}

          <button className="primary-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        <button className="link-btn" type="button">
          Forgot Password?
        </button>
      </section>

      <p className="login-footer">Raj Vedanta School</p>
    </main>
  );
}
