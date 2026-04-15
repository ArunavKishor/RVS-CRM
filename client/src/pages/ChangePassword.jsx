import { useMemo, useState } from "react";
import { Check, LockSimple, WarningCircle, X } from "@phosphor-icons/react";
import RVSLogo from "../assets/RVSLogo.png";

export default function ChangePassword({ onComplete, onSkip }) {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordRules = useMemo(
    () => [
      {
        label: "At least 8 characters",
        valid: form.newPassword.length >= 8,
      },
      {
        label: "At least 1 uppercase letter",
        valid: /[A-Z]/.test(form.newPassword),
      },
      {
        label: "At least 1 lowercase letter",
        valid: /[a-z]/.test(form.newPassword),
      },
      {
        label: "At least 1 number",
        valid: /\d/.test(form.newPassword),
      },
      {
        label: "At least 1 special character",
        valid: /[^A-Za-z0-9]/.test(form.newPassword),
      },
    ],
    [form.newPassword],
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((state) => ({ ...state, [name]: value }));
    setError("");
  };

  const completeFlow = async (payload) => {
    if (typeof onComplete === "function") {
      await onComplete(payload);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const allRulesValid = passwordRules.every((rule) => rule.valid);
    if (!allRulesValid) {
      setError("New password is weak. Please satisfy all strength rules.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    if (form.oldPassword === form.newPassword) {
      setError("New password must be different from your old password.");
      return;
    }

    setIsSubmitting(true);

    try {
      await completeFlow({ ...form });
    } catch (submitError) {
      setError(
        submitError?.message || "Could not update password. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      className="grid min-h-screen place-items-center bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_72%)] px-5 py-8"
      aria-label="Change password page"
    >
      <section
        className="w-full max-w-[520px] overflow-hidden rounded-xl bg-white shadow-[0_12px_36px_rgba(0,0,0,0.18)]"
        role="dialog"
        aria-modal="true"
      >
        <header className="flex min-h-[76px] items-center justify-between gap-3 px-6 py-3">
          <img
            src={RVSLogo}
            alt="RVS Logo"
            className="h-[58px] w-[58px] shrink-0 object-contain"
          />
          <div>
            <h2 className="m-0 inline-flex items-center gap-2 text-lg font-semibold text-slate-900">
              <LockSimple size={20} weight="regular" /> Change Your Password
            </h2>
            <p className="mt-1 text-[13px] text-slate-500">
              For account safety, update your password before you continue.
            </p>
          </div>
        </header>

        <form
          className="flex flex-col gap-2.5 px-6 pb-5"
          onSubmit={handleSubmit}
          noValidate
        >
          <label
            htmlFor="old-password"
            className="text-[13px] font-medium text-slate-700"
          >
            Old Password
          </label>
          <div className="flex h-11 items-center gap-2.5 rounded-md border border-[var(--border)] px-3 focus-within:border-[var(--primary)] focus-within:shadow-[0_0_0_3px_rgba(37,99,235,0.15)]">
            <input
              className="w-full border-0 bg-transparent text-[var(--body)] outline-0"
              id="old-password"
              name="oldPassword"
              type="password"
              placeholder="Enter old password"
              value={form.oldPassword}
              onChange={handleInputChange}
              required
            />
          </div>

          <label
            htmlFor="new-password"
            className="text-[13px] font-medium text-slate-700"
          >
            New Password
          </label>
          <div className="flex h-11 items-center gap-2.5 rounded-md border border-[var(--border)] px-3 focus-within:border-[var(--primary)] focus-within:shadow-[0_0_0_3px_rgba(37,99,235,0.15)]">
            <input
              className="w-full border-0 bg-transparent text-[var(--body)] outline-0"
              id="new-password"
              name="newPassword"
              type="password"
              placeholder="Create new password"
              value={form.newPassword}
              onChange={handleInputChange}
              required
            />
          </div>

          <label
            htmlFor="confirm-password"
            className="text-[13px] font-medium text-slate-700"
          >
            Confirm Password
          </label>
          <div className="flex h-11 items-center gap-2.5 rounded-md border border-[var(--border)] px-3 focus-within:border-[var(--primary)] focus-within:shadow-[0_0_0_3px_rgba(37,99,235,0.15)]">
            <input
              className="w-full border-0 bg-transparent text-[var(--body)] outline-0"
              id="confirm-password"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter new password"
              value={form.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>

          <section
            className="mt-1 rounded-lg border border-blue-100 bg-[#f8fbff] p-3"
            aria-label="Password strength rules"
          >
            <h3 className="m-0 text-[13px] font-semibold text-blue-900">
              Password must include:
            </h3>
            <ul className="mt-2 grid list-none gap-1.5 p-0">
              {passwordRules.map((rule) => (
                <li
                  key={rule.label}
                  className={`inline-flex items-center gap-2 text-xs ${rule.valid ? "text-green-800" : "text-slate-600"}`}
                >
                  {rule.valid ? (
                    <Check
                      className="text-green-600"
                      size={14}
                      weight="bold"
                      aria-hidden="true"
                    />
                  ) : (
                    <X
                      className="text-red-500"
                      size={14}
                      weight="bold"
                      aria-hidden="true"
                    />
                  )}
                  {rule.label}
                </li>
              ))}
            </ul>
          </section>

          {error ? (
            <div className="mt-2 rounded-md border border-red-200 bg-red-50 p-3">
              <p className="m-0 inline-flex items-start gap-2 text-xs text-red-900">
                <WarningCircle size={16} weight="regular" /> {error}
              </p>
            </div>
          ) : null}

          <footer className="mt-1 flex justify-end gap-2.5">
            <button
              className="min-h-11 cursor-pointer rounded-md border border-[var(--border)] bg-white px-3.5 font-medium text-slate-600 hover:bg-slate-50"
              type="button"
              onClick={() => {
                if (typeof onSkip === "function") {
                  onSkip();
                }
              }}
            >
              Skip for Now
            </button>
            <button
              className="min-h-11 min-w-[170px] cursor-pointer rounded-md border-0 bg-[var(--primary)] px-4.5 text-sm font-semibold text-white hover:bg-[var(--primary-dark)] disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Password"}
            </button>
          </footer>
        </form>
      </section>
    </main>
  );
}
