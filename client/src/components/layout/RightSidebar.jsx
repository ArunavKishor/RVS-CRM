import { FiChevronRight, FiList, FiSend } from "react-icons/fi";

const rightRailItems = [
  { key: "messages", label: "Messages", icon: FiSend },
  { key: "tasks", label: "Tasks", icon: FiList },
];

export function RightSidebar() {
  return (
    <aside
      className="fixed right-0 top-[var(--topbar-height)] z-[8] flex h-[calc(100vh-var(--topbar-height)-var(--footer-height))] w-[var(--quickbar-width)] flex-col justify-between border-l border-[var(--border)] bg-white p-2 max-[1024px]:hidden"
      aria-label="Quick actions"
    >
      <div className="mt-[68px] flex flex-col gap-1">
        {rightRailItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              className="inline-flex h-14 w-full cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent text-[var(--body)] transition-all duration-200 hover:bg-[var(--bg)] hover:text-[var(--primary)]"
              type="button"
              aria-label={item.label}
              title={item.label}
            >
              <Icon size={22} aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <button
        className="mb-2 inline-flex h-14 w-full cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent text-[var(--body)] transition-all duration-200 hover:bg-[var(--bg)] hover:text-[var(--primary)]"
        type="button"
        aria-label="Collapse quick actions"
        title="Collapse"
      >
        <FiChevronRight size={22} aria-hidden="true" />
      </button>
    </aside>
  );
}
