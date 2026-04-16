import {
  FiBarChart2,
  FiClock,
  FiColumns,
  FiGrid,
  FiList,
  FiPlus,
  FiUser,
} from "react-icons/fi";

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: FiGrid },
  { key: "pipeline", label: "Assigned Data", icon: FiColumns },
  { key: "follow-ups", label: "Follow-Up's", icon: FiClock },
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
    <aside className="fixed left-0 top-(--topbar-height) z-7 flex h-[calc(100vh-var(--topbar-height))] w-(--sidebar-width) flex-col border-r border-(--border) bg-white p-4 max-[1024px]:static max-[1024px]:top-auto max-[1024px]:h-auto max-[1024px]:w-auto max-[1024px]:border-b max-[1024px]:border-r-0">
      {/* <div className="brand-row">
        <div className="brand-logo">RV</div>
        <h2>Raj Vedanta</h2>
      </div> */}

      <nav
        className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto max-[1024px]:grid max-[1024px]:overflow-visible max-[1024px]:grid-cols-2 max-[700px]:grid-cols-[1fr]"
        aria-label="Main navigation"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.key === activeView;

          return (
            <button
              key={item.key}
              className={`flex min-h-12 cursor-pointer items-center gap-2.5 rounded-lg border-0 px-3 text-sm font-medium transition-all duration-200 ${isActive ? "bg-[#eff6ff] text-(--primary) shadow-sm" : "bg-transparent text-(--body) hover:bg-slate-50"}`}
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
          className={`mt-4 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-0 px-3.5 text-sm font-semibold text-white transition-all duration-200 shadow-[0_2px_8px_rgba(37,99,235,0.15)] ${activeView === "new-lead" ? "bg-(--primary-dark) shadow-[0_4px_12px_rgba(37,99,235,0.25)]" : "bg-(--primary) hover:bg-(--primary-dark) hover:shadow-[0_4px_12px_rgba(37,99,235,0.25)]"}`}
          type="button"
          aria-label="Create new lead"
          onClick={onFabClick}
        >
          <FiPlus size={18} aria-hidden="true" />
          <span className="max-[700px]:hidden">+ New Lead</span>
        </button>
      ) : null}

      <div className="mt-auto flex items-center gap-3 bg-white pt-4 max-[1024px]:static max-[1024px]:mt-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--bg)">
          <FiUser size={20} className="text-(--primary)" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <strong className="block text-sm text-(--heading)">
            Arunav Kishor
          </strong>
          <span className="text-xs text-(--body)">Counsellor</span>
        </div>
      </div>
    </aside>
  );
}
