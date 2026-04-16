import { useMemo, useState } from "react";
import { FiChevronDown, FiStar, FiX } from "react-icons/fi";
import { notifications } from "../../config/crmData.jsx";

export function NotificationsPanel({ onClose }) {
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("category1");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedNotification, setSelectedNotification] = useState(null);

  const cardToneClass = {
    blue: "bg-[#e7ebf7] text-[#2d6bf0]",
    green: "bg-[#e3ece8] text-[#2da06a]",
    red: "bg-[#f4e6e9] text-[#f05353]",
    amber: "bg-[#efe7dc] text-[#b7791f]",
    pink: "bg-[#ece6f5] text-[#7c5ac5]",
  };

  const categoryItems = useMemo(() => {
    const category1 = notifications.filter((_, index) => index % 2 === 0);
    const category2 = notifications.filter((_, index) => index % 2 === 1);
    return activeCategory === "category1" ? category1 : category2;
  }, [activeCategory]);

  const filteredItems = useMemo(() => {
    if (activeFilter === "unread") {
      return categoryItems.filter((item) => item.unread);
    }

    if (activeFilter === "read") {
      return categoryItems.filter((item) => !item.unread);
    }

    return categoryItems;
  }, [activeFilter, categoryItems]);

  const shownItems = filteredItems.slice(0, 5);

  return (
    <aside
      className="fixed right-0 top-(--topbar-height) z-50 flex h-[calc(100vh-var(--topbar-height))] w-70 max-w-full flex-col border-l-[3px] border-l-[#1e73cf] bg-[#f3f4f7] shadow-[-6px_0_22px_rgba(15,23,42,0.18)] max-[700px]:w-full"
      aria-label="Notifications panel"
    >
      <header className="flex min-h-14 items-center justify-between px-4 py-3">
        <h3 className="m-0 text-[18px] font-semibold text-(--heading)">
          Notifications
        </h3>
        <button
          className="grid h-8 w-8 cursor-pointer place-items-center rounded-md border-0 bg-transparent text-[#4b5563] hover:bg-white"
          type="button"
          aria-label="Close notifications"
          onClick={onClose}
        >
          <FiX size={18} aria-hidden="true" />
        </button>
      </header>

      <div className="relative flex items-center gap-3 px-4 pb-3">
        <button
          className="inline-flex cursor-pointer items-center gap-2 rounded-md border-0 bg-transparent px-1 py-1 text-[14px] text-[#5b6473] hover:bg-white"
          type="button"
          aria-label="Filter notifications"
          onClick={() => setFilterMenuOpen((state) => !state)}
        >
          <span>Filter</span>
          <FiChevronDown size={16} aria-hidden="true" />
        </button>

        {filterMenuOpen ? (
          <div className="absolute left-4 top-10 z-10 min-w-30 rounded-md border border-[#d9dfeb] bg-white p-1.5 shadow-[0_8px_18px_rgba(15,23,42,0.16)]">
            <button
              className={`mb-1 block w-full cursor-pointer rounded px-2 py-1 text-left text-[13px] ${activeFilter === "all" ? "bg-[#eaf1ff] text-[#1d4ed8]" : "text-[#475569] hover:bg-[#f8fafc]"}`}
              type="button"
              onClick={() => {
                setActiveFilter("all");
                setFilterMenuOpen(false);
              }}
            >
              All
            </button>
            <button
              className={`mb-1 block w-full cursor-pointer rounded px-2 py-1 text-left text-[13px] ${activeFilter === "unread" ? "bg-[#eaf1ff] text-[#1d4ed8]" : "text-[#475569] hover:bg-[#f8fafc]"}`}
              type="button"
              onClick={() => {
                setActiveFilter("unread");
                setFilterMenuOpen(false);
              }}
            >
              Unread
            </button>
            <button
              className={`block w-full cursor-pointer rounded px-2 py-1 text-left text-[13px] ${activeFilter === "read" ? "bg-[#eaf1ff] text-[#1d4ed8]" : "text-[#475569] hover:bg-[#f8fafc]"}`}
              type="button"
              onClick={() => {
                setActiveFilter("read");
                setFilterMenuOpen(false);
              }}
            >
              Read
            </button>
          </div>
        ) : null}

        <button
          className={`cursor-pointer rounded-md border-0 px-1 py-1 text-[14px] ${activeCategory === "category1" ? "bg-[#eaf1ff] font-semibold text-[#2563eb]" : "bg-transparent text-[#4b5563] hover:bg-white"}`}
          type="button"
          onClick={() => setActiveCategory("category1")}
        >
          Category 1
        </button>
        <button
          className={`cursor-pointer rounded-md border-0 px-1 py-1 text-[14px] ${activeCategory === "category2" ? "bg-[#eaf1ff] font-semibold text-[#2563eb]" : "bg-transparent text-[#4b5563] hover:bg-white"}`}
          type="button"
          onClick={() => setActiveCategory("category2")}
        >
          Category 2
        </button>
      </div>

      <div className="overflow-auto px-3 py-2.5">
        {shownItems.length > 0 ? (
          shownItems.map((item, index) => (
            <button
              key={item.text}
              className={`mb-2.5 w-full cursor-pointer rounded-xl border-2 px-3.5 py-3 text-left ${cardToneClass[item.tone] || cardToneClass.blue} ${selectedNotification === item.text || (selectedNotification === null && index === 0) ? "border-[#5f78a6]" : "border-transparent"}`}
              type="button"
              onClick={() => setSelectedNotification(item.text)}
            >
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 shrink-0">
                  <FiStar size={22} aria-hidden="true" />
                </span>
                <div>
                  <h4 className="m-0 text-[19px] font-medium text-[#1f2937]">
                    Notification Title
                  </h4>
                  <p className="m-0 mt-1 text-[16px] leading-[1.35] text-[#445062]">
                    {item.text}
                  </p>
                </div>
              </div>
            </button>
          ))
        ) : (
          <p className="m-0 rounded-lg bg-white px-3 py-3 text-sm text-[#64748b]">
            No notifications found for this filter.
          </p>
        )}
      </div>
    </aside>
  );
}
