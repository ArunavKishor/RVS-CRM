import { useEffect, useState } from "react";
import {
  FiBookOpen,
  FiChevronRight,
  FiFileText,
  FiHelpCircle,
  FiLogOut,
  FiSearch,
  FiUser,
  FiX,
} from "react-icons/fi";

const quickActions = [
  { key: "documentation", label: "Documentation", icon: FiFileText },
  { key: "faqs", label: "FAQs", icon: FiHelpCircle },
  { key: "features", label: "Features", icon: FiSearch },
];

const moreDetailsItems = [
  "More Details Menu 1",
  "More Details Menu 2",
  "More Details Menu 3",
  "More Details Menu 4",
  "More Details Menu 5",
  "More Details Menu 6",
];

const documentItems = ["About Raj Group", "About RVS", "Caller pitch"];

export function ProfilePanel({
  open,
  placement = "header",
  onClose,
  userName = "User Name",
  userEmail = "username@domainname.com",
  onLogout,
  onDocumentationClick,
  onFaqClick,
  onFeaturesClick,
}) {
  const [activeSection, setActiveSection] = useState("documents");

  useEffect(() => {
    if (open) {
      setActiveSection("documents");
    }
  }, [open]);

  if (!open) {
    return null;
  }

  const panelPlacementClass =
    placement === "sidebar"
      ? "left-0 top-(--topbar-height) h-[calc(100vh-var(--topbar-height))]"
      : "right-0 top-(--topbar-height) h-[calc(100vh-var(--topbar-height))]";

  const detailTitle =
    activeSection === "documents" ? "Documents" : "More Details";

  const detailItems =
    activeSection === "documents" ? documentItems : moreDetailsItems;

  const handleDocumentationClick = () => {
    setActiveSection("documents");
    onDocumentationClick?.();
  };

  return (
    <>
      <button
        className="fixed inset-0 z-55 border-0 bg-transparent"
        type="button"
        aria-label="Close profile panel"
        onClick={onClose}
      />

      <section
        className={`fixed z-60 w-70 overflow-y-auto border border-[#d6dae5] bg-white shadow-[0_14px_36px_rgba(15,23,42,0.22)] ${panelPlacementClass}`}
        aria-label="Profile panel"
      >
        <header className="flex items-start gap-2 border-b border-[#eaedf3] bg-[#f3f4f8] px-3.5 py-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f7cc51] text-[#35425c]">
            <FiUser size={20} aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <strong className="block truncate text-sm font-semibold text-[#2f3b52]">
              {userName}
            </strong>
            <span className="block truncate text-[13px] text-[#7e8798]">
              {userEmail}
            </span>
          </div>
          <button
            className="grid h-7 w-7 cursor-pointer place-items-center rounded-sm border-0 bg-transparent text-[#6c7382] hover:bg-white"
            type="button"
            aria-label="Close profile panel"
            onClick={onClose}
          >
            <FiX size={16} aria-hidden="true" />
          </button>
        </header>

        <div className="border-b border-[#eaedf3] bg-[#f3f4f8] px-3.5 py-2.5">
          <button
            className="inline-flex w-full cursor-pointer items-center gap-2 rounded-md border-0 bg-transparent px-2.5 py-2 text-left text-[#d92c2c] hover:bg-white"
            type="button"
            onClick={onLogout}
          >
            <FiLogOut size={16} aria-hidden="true" />
            <span className="text-sm font-medium">Log Out</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 border-b border-[#eaedf3] bg-white px-3.5 py-4">
          {quickActions.map((action) => {
            const ActionIcon = action.icon;
            const onActionClick =
              action.key === "documentation"
                ? onDocumentationClick
                : action.key === "faqs"
                  ? onFaqClick
                  : onFeaturesClick;

            return (
              <button
                key={action.key}
                className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-md border-0 px-1 py-2 ${
                  action.key === "documentation" &&
                  activeSection === "documents"
                    ? "bg-[#edf3ff] text-[#1d4ed8]"
                    : "bg-transparent text-[#576074] hover:bg-[#f5f7fb]"
                }`}
                type="button"
                onClick={
                  action.key === "documentation"
                    ? handleDocumentationClick
                    : onActionClick
                }
              >
                <span className="grid h-9 w-9 place-items-center rounded-md border border-[#d4dae7] text-[#606a7f]">
                  <ActionIcon size={18} aria-hidden="true" />
                </span>
                <span className="text-[12px] font-medium leading-tight">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="bg-white px-3.5 py-3.5">
          <h3 className="m-0 mb-2.5 text-base font-semibold text-[#3b465b]">
            {detailTitle}
          </h3>

          <ul className="m-0 list-none p-0">
            {detailItems.map((label) => (
              <li key={label}>
                <button
                  className="flex w-full cursor-pointer items-center justify-between border-0 bg-transparent px-0 py-2 text-left text-[#4f5a70] hover:text-[#1d4ed8]"
                  type="button"
                >
                  <span className="inline-flex items-center gap-2.5 text-[13px]">
                    <FiBookOpen size={14} aria-hidden="true" />
                    {label}
                  </span>
                  <FiChevronRight size={14} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
