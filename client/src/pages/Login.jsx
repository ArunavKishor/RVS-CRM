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
    <main className="grid min-h-screen place-items-center gap-4 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_72%)] px-5 py-8">
      <section
        className="flex w-full max-w-[400px] flex-col gap-6 rounded-xl bg-white p-7 shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
        aria-label="Counsellor login panel"
      >
        <div
          className="grid h-16 w-16 place-items-center rounded-[14px] bg-[var(--primary)] font-bold tracking-[0.02em] text-white"
          aria-hidden="true"
        >
          RV
        </div>

        <header>
          <h1 className="m-0 text-2xl font-semibold leading-tight text-[var(--heading)]">
            Raj Vedanta Admissions
          </h1>
          <p className="mt-2 text-[13px] text-slate-500">Counsellor Login</p>
        </header>

        <hr className="w-full border-0 border-t border-[var(--border)]" />

        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit}
          noValidate
        >
          <label
            htmlFor="email"
            className="text-[13px] font-medium text-[var(--body)]"
          >
            Email Address
          </label>
          <div className="flex h-11 items-center gap-2.5 rounded-md border border-[var(--border)] px-3 focus-within:border-[var(--primary)] focus-within:shadow-[0_0_0_3px_rgba(37,99,235,0.15)]">
            <EnvelopeSimple size={18} weight="regular" aria-hidden="true" />
            <input
              className="min-h-[42px] w-full border-0 bg-transparent text-[var(--body)] outline-0 placeholder:text-slate-400"
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

          <label
            htmlFor="password"
            className="text-[13px] font-medium text-[var(--body)]"
          >
            Password
          </label>
          <div className="flex h-11 items-center gap-2.5 rounded-md border border-[var(--border)] px-3 focus-within:border-[var(--primary)] focus-within:shadow-[0_0_0_3px_rgba(37,99,235,0.15)]">
            <input
              className="min-h-[42px] w-full border-0 bg-transparent text-[var(--body)] outline-0 placeholder:text-slate-400"
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border-0 bg-transparent text-slate-500"
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

          <button
            className="mt-1 min-h-11 w-full cursor-pointer rounded-md border-0 bg-[var(--primary)] text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-dark)] disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        <button
          className="min-h-11 cursor-pointer border-0 bg-transparent p-0 text-left text-[13px] font-medium text-[var(--primary)]"
          type="button"
        >
          Forgot Password?
        </button>
      </section>

      <p className="m-0 text-[11px] text-slate-400">Raj Vedanta School</p>
    </main>
  );
}
