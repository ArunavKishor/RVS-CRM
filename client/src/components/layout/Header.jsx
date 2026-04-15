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

export function Header({ onAddNewLead, onBellClick, onGlobalSearch }) {
  const [globalSearch, setGlobalSearch] = useState("");

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="topbar-brand" aria-label="Brand">
          <div className="topbar-brand-logo">
            <img src={SchoolLogo} alt="Raj Vedanta School" />
          </div>
          <span className="topbar-brand-name">Raj Vedanta School</span>
        </div>

        <div className="global-search" role="search">
          <FiSearch size={20} aria-hidden="true" />
          <input
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
            className="global-search-filter"
            aria-label="Search filter options"
          >
            <FiChevronDown size={14} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="topbar-right">
        <button
          className="topbar-add-btn"
          type="button"
          aria-label="Add new lead"
          onClick={onAddNewLead}
        >
          <FiPlus size={18} aria-hidden="true" />
          <span>New Lead</span>
        </button>

        <button
          className="icon-btn bell"
          type="button"
          aria-label="Notifications"
          onClick={onBellClick}
        >
          <FiBell size={18} aria-hidden="true" />
          <span className="dot" aria-hidden="true" />
        </button>

        <button className="icon-btn" type="button" aria-label="Settings">
          <FiSettings size={18} aria-hidden="true" />
        </button>

        <button className="profile-btn" type="button" aria-label="Profile">
          <FiUser size={18} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
