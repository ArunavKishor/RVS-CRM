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
    <main className="password-page" aria-label="Change password page">
      <section className="password-modal" role="dialog" aria-modal="true">
        <header className="followup-header password-header">
          <img src={RVSLogo} alt="RVS Logo" className="password-logo" />
          <div>
            <h2>
              <LockSimple size={20} weight="regular" /> Change Your Password
            </h2>
            <p>For account safety, update your password before you continue.</p>
          </div>
        </header>

        <form className="password-body" onSubmit={handleSubmit} noValidate>
          <label htmlFor="old-password">Old Password</label>
          <div className="input-wrap">
            <input
              id="old-password"
              name="oldPassword"
              type="password"
              placeholder="Enter old password"
              value={form.oldPassword}
              onChange={handleInputChange}
              required
            />
          </div>

          <label htmlFor="new-password">New Password</label>
          <div className="input-wrap">
            <input
              id="new-password"
              name="newPassword"
              type="password"
              placeholder="Create new password"
              value={form.newPassword}
              onChange={handleInputChange}
              required
            />
          </div>

          <label htmlFor="confirm-password">Confirm Password</label>
          <div className="input-wrap">
            <input
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
            className="password-rules"
            aria-label="Password strength rules"
          >
            <h3>Password must include:</h3>
            <ul>
              {passwordRules.map((rule) => (
                <li
                  key={rule.label}
                  className={rule.valid ? "rule-item valid" : "rule-item"}
                >
                  {rule.valid ? (
                    <Check size={14} weight="bold" aria-hidden="true" />
                  ) : (
                    <X size={14} weight="bold" aria-hidden="true" />
                  )}
                  {rule.label}
                </li>
              ))}
            </ul>
          </section>

          {error ? (
            <div className="callout danger">
              <p>
                <WarningCircle size={16} weight="regular" /> {error}
              </p>
            </div>
          ) : null}

          <footer className="password-footer">
            <button
              className="skip-btn"
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
              className="primary-btn"
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
