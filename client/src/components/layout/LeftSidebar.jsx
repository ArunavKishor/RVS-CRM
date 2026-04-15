import {
  FiBarChart2,
  FiColumns,
  FiGrid,
  FiList,
  FiPlus,
  FiUser,
} from "react-icons/fi";

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: FiGrid },
  { key: "pipeline", label: "Assigned Data", icon: FiColumns },
  // { key: "table", label: "Leads Table", icon: FiList },
  { key: "reports", label: "My Reports", icon: FiBarChart2 },
];

export function LeftSidebar({
  activeView,
  setActiveView,
  showFab = false,
  onFabClick,
}) {
  return (
    <aside className="sidebar">
      <div className="brand-row">
        <div className="brand-logo">RV</div>
        <h2>Raj Vedanta</h2>
      </div>

      <nav aria-label="Main navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.key === activeView;

          return (
            <button
              key={item.key}
              className={`nav-item ${isActive ? "active" : ""}`}
              type="button"
              onClick={() => setActiveView(item.key)}
            >
              <Icon size={18} aria-hidden="true" /> {item.label}
            </button>
          );
        })}
      </nav>

      {showFab ? (
        <button
          className={`sidebar-action ${activeView === "new-lead" ? "active" : ""}`}
          type="button"
          aria-label="Create new lead"
          onClick={onFabClick}
        >
          <FiPlus size={18} aria-hidden="true" />
          <span>+ New Lead</span>
        </button>
      ) : null}

      <div className="sidebar-user">
        <FiUser size={32} aria-hidden="true" />
        <div>
          <strong>Arunav Kishor</strong>
          <span>Counsellor</span>
        </div>
      </div>
    </aside>
  );
}
