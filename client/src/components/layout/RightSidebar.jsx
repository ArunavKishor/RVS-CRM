import { FiChevronRight, FiList, FiSend } from "react-icons/fi";

const rightRailItems = [
  { key: "messages", label: "Messages", icon: FiSend },
  { key: "tasks", label: "Tasks", icon: FiList },
];

export function RightSidebar() {
  return (
    <aside
      className="fixed right-0 top-[var(--topbar-height)] z-40 flex 
      h-[calc(100vh-var(--topbar-height)-var(--footer-height))] 
      w-[var(--quickbar-width)] flex-col justify-between 
      border-l border-gray-200 
      bg-white/80 backdrop-blur-xl 
      shadow-lg p-3 
      max-[1024px]:hidden"
      aria-label="Quick actions"
    >
      {/* Top Actions */}
      <div className="mt-16 flex flex-col items-center gap-3">
        {rightRailItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              className="group relative flex h-12 w-12 items-center justify-center 
              rounded-xl 
              text-gray-600 
              transition-all duration-300 
              hover:bg-blue-50 hover:text-blue-600 
              hover:scale-105 active:scale-95"
              type="button"
              aria-label={item.label}
            >
              <Icon size={20} />

              {/* Tooltip */}
              <span
                className="pointer-events-none absolute right-14 whitespace-nowrap 
                rounded-md bg-gray-900 px-2 py-1 text-xs text-white 
                opacity-0 translate-x-2 transition-all duration-200 
                group-hover:opacity-100 group-hover:translate-x-0"
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom Collapse Button */}
      <div className="flex justify-center">
        <button
          className="group flex h-12 w-12 items-center justify-center 
          rounded-xl 
          text-gray-600 
          transition-all duration-300 
          hover:bg-red-50 hover:text-red-500 
          hover:scale-105 active:scale-95"
          type="button"
          aria-label="Collapse quick actions"
        >
          <FiChevronRight size={20} />

          {/* Tooltip */}
          <span
            className="pointer-events-none absolute right-14 whitespace-nowrap 
            rounded-md bg-gray-900 px-2 py-1 text-xs text-white 
            opacity-0 translate-x-2 transition-all duration-200 
            group-hover:opacity-100 group-hover:translate-x-0"
          >
            Collapse
          </span>
        </button>
      </div>
    </aside>
  );
}