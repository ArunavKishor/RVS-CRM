import { FiBell } from "react-icons/fi";
import { notifications } from "../../config/crmData.jsx";

export function NotificationsPanel({ onClose }) {
  return (
    <aside
      className="absolute right-0 top-0 flex h-full w-[360px] max-w-full flex-col border-l border-[var(--border)] bg-white shadow-[-4px_0_24px_rgba(0,0,0,0.12)] max-[700px]:w-full"
      aria-label="Notifications panel"
    >
      <header className="flex min-h-16 items-center justify-between px-4 py-3">
        <h3 className="m-0 inline-flex items-center gap-2 text-base text-[var(--heading)]">
          <FiBell size={16} aria-hidden="true" /> Notifications
        </h3>
        <button
          className="min-h-11 cursor-pointer border-0 bg-transparent text-[13px] font-medium text-[var(--primary)]"
          type="button"
          onClick={onClose}
        >
          Mark all read
        </button>
      </header>
      <div className="flex gap-2 border-b border-[var(--border)] px-4 pb-2.5">
        <button
          className="min-h-[30px] cursor-pointer rounded-full border border-blue-300 bg-blue-50 px-2.5 text-xs text-blue-600"
          type="button"
        >
          All
        </button>
        <button
          className="min-h-[30px] cursor-pointer rounded-full border border-[var(--border)] bg-white px-2.5 text-xs text-slate-600"
          type="button"
        >
          Overdue
        </button>
        <button
          className="min-h-[30px] cursor-pointer rounded-full border border-[var(--border)] bg-white px-2.5 text-xs text-slate-600"
          type="button"
        >
          Assignments
        </button>
      </div>
      <div className="overflow-auto py-2.5">
        {notifications.map((item) => (
          <article
            key={item.text}
            className={`border-b border-slate-100 px-3 py-3 ${item.unread ? "bg-slate-50" : "bg-white"} ${
              item.tone === "red"
                ? "border-l-3 border-l-red-600"
                : item.tone === "blue"
                  ? "border-l-3 border-l-blue-600"
                  : item.tone === "amber"
                    ? "border-l-3 border-l-amber-500"
                    : item.tone === "green"
                      ? "border-l-3 border-l-green-600"
                      : item.tone === "pink"
                        ? "border-l-3 border-l-pink-500"
                        : ""
            }`}
          >
            <p
              className={`m-0 text-[13px] text-slate-700 ${item.unread ? "font-semibold" : "font-normal"}`}
            >
              {item.text}
            </p>
            <time className="mt-1.5 block text-right text-xs text-slate-500">
              {item.time}
            </time>
          </article>
        ))}
      </div>
    </aside>
  );
}
