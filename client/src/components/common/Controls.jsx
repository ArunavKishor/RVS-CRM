import { FiChevronDown, FiColumns, FiList } from "react-icons/fi";

export function FilterSelect({ label, className = "" }) {
  return (
    <button
      className={`inline-flex h-9 cursor-pointer items-center gap-2 rounded-md border border-[var(--border)] bg-white px-2.5 text-[13px] text-[var(--body)] ${className}`.trim()}
      type="button"
    >
      <span>{label}</span>
      <FiChevronDown size={14} aria-hidden="true" />
    </button>
  );
}

export function ToggleView({ active }) {
  return (
    <div
      className="flex gap-1 rounded-lg border border-[var(--border)] bg-white p-[3px]"
      role="group"
      aria-label="View toggle"
    >
      <button
        className={`inline-flex min-h-[30px] cursor-pointer items-center gap-1.5 rounded-md border-0 px-2.5 ${active === "kanban" ? "bg-[#eff6ff] text-[var(--primary)]" : "bg-transparent text-slate-500"}`}
        type="button"
      >
        <FiColumns size={16} aria-hidden="true" /> Kanban
      </button>
      <button
        className={`inline-flex min-h-[30px] cursor-pointer items-center gap-1.5 rounded-md border-0 px-2.5 ${active === "table" ? "bg-[#eff6ff] text-[var(--primary)]" : "bg-transparent text-slate-500"}`}
        type="button"
      >
        <FiList size={16} aria-hidden="true" /> Table
      </button>
    </div>
  );
}

export function FormField({ label, required, hint, children, className = "" }) {
  return (
    <div className={` ${className}`.trim()}>
      <label className="mb-1.5 block text-[13px] font-medium text-[var(--body)]">
        {label}
        {required ? <span className="text-[var(--danger)]"> ✱</span> : null}
      </label>
      {children}
      {hint ? <p className="mt-1.5 text-xs text-slate-400">{hint}</p> : null}
    </div>
  );
}
