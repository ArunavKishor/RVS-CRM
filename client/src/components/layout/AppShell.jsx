import {
  FiBell,
  FiBarChart2,
  FiBox,
  FiChevronRight,
  FiColumns,
  FiGrid,
  FiList,
  FiPlus,
  FiSend,
  FiUser,
} from "react-icons/fi";

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: FiGrid },
  { key: "pipeline", label: "Assigned Data", icon: FiColumns },
  // { key: "table", label: "Leads Table", icon: FiList },
  { key: "reports", label: "My Reports", icon: FiBarChart2 },
];

const rightRailItems = [
  { key: "messages", label: "Messages", icon: FiSend },
  { key: "tasks", label: "Tasks", icon: FiList },
  { key: "module-a", label: "Module", icon: FiBox },
  { key: "module-b", label: "Module", icon: FiBox },
  { key: "module-c", label: "Module", icon: FiBox },
];

export function AppShell({
  activeView,
  setActiveView,
  breadcrumb,
  children,
  showFab = true,
  onFabClick,
  onBellClick,
}) {
  return (
    <div className="dashboard-layout">
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

      <section className="app-panel">
        <header className="topbar">
          <p>{breadcrumb}</p>
          <div className="topbar-right">
            <button
              className="icon-btn bell"
              type="button"
              aria-label="Notifications"
              onClick={onBellClick}
            >
              <FiBell size={20} aria-hidden="true" />
              <span className="dot" aria-hidden="true" />
            </button>
            <FiUser size={32} aria-hidden="true" />
          </div>
        </header>
        {children}
      </section>

      <aside className="right-quickbar" aria-label="Quick actions">
        <div className="quickbar-stack">
          {rightRailItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                className="quickbar-btn"
                type="button"
                aria-label={item.label}
                title={item.label}
              >
                <Icon size={20} aria-hidden="true" />
              </button>
            );
          })}
        </div>

        <button
          className="quickbar-btn quickbar-collapse"
          type="button"
          aria-label="Collapse quick actions"
          title="Collapse"
        >
          <FiChevronRight size={20} aria-hidden="true" />
        </button>
      </aside>
    </div>
  );
}
