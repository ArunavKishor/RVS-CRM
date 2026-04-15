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
    <aside className="fixed left-0 top-[var(--topbar-height)] z-[7] flex h-[calc(100vh-var(--topbar-height)-var(--footer-height))] w-[var(--sidebar-width)] flex-col border-r border-[var(--border)] bg-white p-4 max-[1024px]:static max-[1024px]:top-auto max-[1024px]:h-auto max-[1024px]:w-auto max-[1024px]:border-b max-[1024px]:border-r-0">
      {/* <div className="brand-row">
        <div className="brand-logo">RV</div>
        <h2>Raj Vedanta</h2>
      </div> */}

      <nav
        className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto max-[1024px]:grid max-[1024px]:overflow-visible max-[1024px]:[grid-template-columns:repeat(2,minmax(0,1fr))] max-[700px]:[grid-template-columns:1fr]"
        aria-label="Main navigation"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.key === activeView;

          return (
            <button
              key={item.key}
              className={`flex min-h-12 cursor-pointer items-center gap-2.5 rounded-lg border-0 px-3 text-sm font-medium transition-all duration-200 ${isActive ? "bg-[#eff6ff] text-[var(--primary)] shadow-sm" : "bg-transparent text-[var(--body)] hover:bg-slate-50"}`}
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
          className={`mt-4 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-0 px-3.5 text-sm font-semibold text-white transition-all duration-200 shadow-[0_2px_8px_rgba(37,99,235,0.15)] ${activeView === "new-lead" ? "bg-[var(--primary-dark)] shadow-[0_4px_12px_rgba(37,99,235,0.25)]" : "bg-[var(--primary)] hover:bg-[var(--primary-dark)] hover:shadow-[0_4px_12px_rgba(37,99,235,0.25)]"}`}
          type="button"
          aria-label="Create new lead"
          onClick={onFabClick}
        >
          <FiPlus size={18} aria-hidden="true" />
          <span className="max-[700px]:hidden">+ New Lead</span>
        </button>
      ) : null}

      <div className="sticky bottom-0 mt-4 flex items-center gap-3 border-t border-[var(--border)] bg-white pt-4 max-[1024px]:static">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--bg)]">
          <FiUser
            size={20}
            className="text-[var(--primary)]"
            aria-hidden="true"
          />
        </div>
        <div className="min-w-0 flex-1">
          <strong className="block text-sm text-[var(--heading)]">
            Arunav Kishor
          </strong>
          <span className="text-xs text-[var(--body)]">Counsellor</span>
        </div>
      </div>
    </aside>
  );
}
