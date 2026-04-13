import { FiChevronDown, FiColumns, FiList } from "react-icons/fi";

export function FilterSelect({ label, className = "" }) {
  return (
    <button className={`filter-select ${className}`.trim()} type="button">
      <span>{label}</span>
      <FiChevronDown size={14} aria-hidden="true" />
    </button>
  );
}

export function ToggleView({ active }) {
  return (
    <div className="view-toggle" role="group" aria-label="View toggle">
      <button className={active === "kanban" ? "active" : ""} type="button">
        <FiColumns size={16} aria-hidden="true" /> Kanban
      </button>
      <button className={active === "table" ? "active" : ""} type="button">
        <FiList size={16} aria-hidden="true" /> Table
      </button>
    </div>
  );
}

export function FormField({ label, required, hint, children, className = "" }) {
  return (
    <div className={`field-block ${className}`.trim()}>
      <label>
        {label}
        {required ? <span className="required"> ✱</span> : null}
      </label>
      {children}
      {hint ? <p className="field-hint">{hint}</p> : null}
    </div>
  );
}
