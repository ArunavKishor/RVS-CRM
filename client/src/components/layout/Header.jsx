import { useState } from "react";
import {
  FiBell,
  FiChevronDown,
  FiPlus,
  FiSearch,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import SchoolLogo from "../../assets/School.png";

export function Header({
  onAddNewLead,
  onBellClick,
  onGlobalSearch,
  onProfileClick,
}) {
  const [globalSearch, setGlobalSearch] = useState("");

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex min-h-16 items-center justify-between gap-4 border-b border-[#26344d] bg-[linear-gradient(90deg,#1f2e46_0%,#1d2a40_100%)] px-4.5 max-[1024px]:static max-[1024px]:min-h-15 max-[1024px]:px-4 max-[700px]:flex-wrap max-[700px]:justify-start max-[700px]:py-2">
      <div className="flex min-w-0 items-center gap-4.5 max-[1024px]:gap-3 max-[700px]:w-full">
        <div className="inline-flex items-center gap-2.5" aria-label="Brand">
          <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-transparent">
            <img src={SchoolLogo} alt="Raj Vedanta School" />
          </div>
          <span className="m-0 text-xl font-semibold tracking-[0.01em] text-slate-50 max-[1024px]:text-base">
            Raj Vedanta School
          </span>
        </div>

        <div
          className="inline-flex min-h-10.5 w-[min(520px,54vw)] items-center gap-2.5 rounded-[10px] border border-white/20 bg-white/10 px-3 text-[#bfcae0] focus-within:border-blue-400/80 focus-within:shadow-[0_0_0_3px_rgba(59,130,246,0.25)] max-[1024px]:w-[min(420px,50vw)] max-[700px]:w-full"
          role="search"
        >
          <FiSearch size={20} aria-hidden="true" />
          <input
            className="w-full flex-1 border-0 bg-transparent text-sm text-slate-50 outline-0 placeholder:text-[#9aa7bf]"
            type="search"
            value={globalSearch}
            onChange={(e) => {
              const value = e.target.value;
              setGlobalSearch(value);
              onGlobalSearch?.(value);
            }}
            placeholder="Search any number, name, etc"
            aria-label="Global search"
          />
          <button
            type="button"
            className="grid h-6.5 w-6.5 cursor-pointer place-items-center border-0 border-l border-white/20 bg-transparent text-[#c9d6eb]"
            aria-label="Search filter options"
          >
            <FiChevronDown size={14} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 max-[700px]:w-full max-[700px]:justify-end">
        <button
          className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-[10px] border-0 bg-blue-600 px-3 font-semibold text-white hover:bg-blue-700"
          type="button"
          aria-label="Add new lead"
          onClick={onAddNewLead}
        >
          <FiPlus size={18} aria-hidden="true" />
          <span>New Lead</span>
        </button>

        <button
          className="relative inline-flex h-9.5 w-9.5 cursor-pointer items-center justify-center rounded-[10px] border border-white/15 bg-white/10 text-slate-200 hover:bg-white/15"
          type="button"
          aria-label="Notifications"
          onClick={onBellClick}
        >
          <FiBell size={18} aria-hidden="true" />
          <span
            className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500"
            aria-hidden="true"
          />
        </button>

        <button
          className="inline-flex h-9.5 w-9.5 cursor-pointer items-center justify-center rounded-[10px] border border-white/15 bg-white/10 text-slate-200 hover:bg-white/15"
          type="button"
          aria-label="Settings"
        >
          <FiSettings size={18} aria-hidden="true" />
        </button>

        <button
          className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border-0 bg-[linear-gradient(135deg,#facc15_0%,#f59e0b_100%)] text-slate-800"
          type="button"
          aria-label="Profile"
          onClick={onProfileClick}
        >
          <FiUser size={18} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
