import {
  FiBarChart2,
  FiBox,
  FiChevronRight,
  FiList,
  FiSend,
} from "react-icons/fi";
import { Header } from "./Header.jsx";
import { LeftSidebar } from "./LeftSidebar.jsx";

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
  showFab = false,
  onFabClick,
  onBellClick,
  onGlobalSearch,
}) {
  return (
    <div className="dashboard-layout">
      <LeftSidebar
        activeView={activeView}
        setActiveView={setActiveView}
        showFab={showFab}
        onFabClick={onFabClick}
      />

      <section className="app-panel">
        <Header
          onAddNewLead={onFabClick}
          onBellClick={onBellClick}
          onGlobalSearch={onGlobalSearch}
        />
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
