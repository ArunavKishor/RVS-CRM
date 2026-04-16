import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowsDownUp,
  Bell,
  Buildings,
  CalendarDots,
  CaretDown,
  ChartBar,
  ChatCircleDots,
  Check,
  CheckCircle,
  Clock,
  LockSimple,
  LockSimpleOpen,
  DownloadSimple,
  EnvelopeSimple,
  EyeSlash,
  GridFour,
  Kanban,
  ListBullets,
  NotePencil,
  Phone,
  PhoneCall,
  Plus,
  PlusCircle,
  Sparkle,
  WarningCircle,
  Table,
  UserCircle,
  X,
  XCircle,
  FileText,
  ClipboardText,
} from "@phosphor-icons/react";
import { AppShell } from "../components/layout/AppShell.jsx";
import {
  FilterSelect,
  FormField,
  ToggleView,
} from "../components/common/Controls.jsx";
import { LegacyTailwindMapper } from "../components/common/LegacyTailwindMapper.jsx";
import { activities, followUps, stats, tableRows } from "../config/crmData.jsx";
import IntroVideo from "../assets/intro.mp4";
import RVSLogo from "../assets/RVSLogo.png";
import { AssignedDataView } from "./assigned-data/AssignedDataView.jsx";
import { LeadCallActionModal } from "./assigned-data/components/LeadCallActionModal.jsx";
import { RestrictedCallActionModal } from "./assigned-data/components/NurturingCallAction.jsx";
import { VisitSCallActionModal } from "./assigned-data/components/VisitSCallAction.jsx";
import { VisitCCallaActionModal } from "./assigned-data/components/Visit_CCallaAction.jsx";
import { FormIssuedCallActionModal } from "./assigned-data/components/FormIssuedCallAction.jsx";
import { UnsuccessfulCallAction } from "./assigned-data/components/UnsuccessfulCallAction.jsx";
import { stageTabs } from "./assigned-data/config/stageConfig.jsx";
import { FollowUpsWindowView } from "./FollowUps.jsx";
import Login from "./Login.jsx";
import ChangePassword from "./ChangePassword.jsx";

const dashboardStatTone = {
  primary: {
    card: "border-l-[var(--primary)]",
    value: "text-[var(--primary)]",
    spark:
      "bg-[linear-gradient(120deg,rgba(148,163,184,0.1),rgba(148,163,184,0.3))]",
  },
  success: {
    card: "border-l-[var(--success)]",
    value: "text-[var(--success)]",
    spark:
      "bg-[linear-gradient(120deg,rgba(22,163,74,0.12),rgba(22,163,74,0.35))]",
  },
  warning: {
    card: "border-l-[var(--warning)]",
    value: "text-[var(--warning)]",
    spark:
      "bg-[linear-gradient(120deg,rgba(245,158,11,0.14),rgba(245,158,11,0.35))]",
  },
  danger: {
    card: "border-l-[var(--danger)]",
    value: "text-[var(--danger)]",
    spark:
      "bg-[linear-gradient(120deg,rgba(220,38,38,0.14),rgba(220,38,38,0.35))]",
  },
};

const followUpStatusTone = {
  overdue: "bg-amber-100 text-amber-700",
  scheduled: "bg-blue-100 text-blue-700",
};

const rowSourceTone = {
  "source-blue": "bg-blue-100 text-blue-700",
  "source-amber": "bg-amber-100 text-amber-700",
  "source-violet": "bg-violet-100 text-violet-700",
  "source-pink": "bg-pink-100 text-pink-700",
  "source-sky": "bg-sky-100 text-sky-700",
  "source-cyan": "bg-cyan-100 text-cyan-700",
};

const rowStatusTone = {
  "status-blue": "bg-blue-100 text-blue-700",
  "status-indigo": "bg-indigo-100 text-indigo-700",
  "status-teal": "bg-teal-100 text-teal-700",
  "status-amber": "bg-amber-100 text-amber-700",
  "status-orange": "bg-orange-100 text-orange-700",
  "status-violet": "bg-violet-100 text-violet-700",
  "status-green": "bg-green-100 text-green-700",
};

function DashboardView({ formattedDate }) {
  return (
    <div className="relative min-h-[calc(100vh-56px)]">
      <main className="flex flex-col gap-5 px-6 py-6 max-[1024px]:px-4">
        <section>
          <h1 className="m-0 text-xl text-[var(--heading)]">
            Good afternoon, Arunav
          </h1>
          <p className="mt-1.5 text-[13px] text-slate-500">{formattedDate}</p>
        </section>

        <section
          className="grid grid-cols-4 gap-4 max-[1280px]:grid-cols-2 max-[700px]:grid-cols-1"
          aria-label="Lead statistics"
        >
          {stats.map((card) => {
            const tone =
              dashboardStatTone[card.tone] || dashboardStatTone.primary;
            return (
              <article
                key={card.title}
                className={`rounded-lg border border-[var(--border)] border-l-4 bg-white px-3.5 py-3 shadow-[0_2px_10px_rgba(15,23,42,0.06)] ${tone.card}`}
              >
                <h3 className="m-0 text-[13px] font-semibold text-[var(--body)]">
                  {card.title}
                </h3>
                <p
                  className={`m-0 mt-2 text-4xl font-bold leading-none ${tone.value}`}
                >
                  {card.value}
                </p>
                <p className="mb-2.5 mt-1.5 text-xs text-slate-500">
                  {card.note}
                </p>
                <div
                  className={`h-6 rounded ${tone.spark}`}
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </section>

        <section className="grid grid-cols-[1.5fr_1fr] gap-4 max-[1280px]:grid-cols-1">
          <article
            className="rounded-lg border border-[var(--border)] bg-white p-3.5 shadow-[0_2px_10px_rgba(15,23,42,0.05)]"
            aria-label="Today follow-ups"
          >
            <div className="mb-2 flex items-center justify-between">
              <h2 className="m-0 text-base text-[var(--heading)]">
                Today&apos;s Follow-ups
              </h2>
              <span className="grid h-6 min-w-6 place-items-center rounded-full bg-blue-100 px-2 text-xs font-semibold text-[var(--primary)]">
                {followUps.length}
              </span>
            </div>

            {followUps.map((item) => (
              <div
                className="grid min-h-16 grid-cols-[32px_1fr_auto] items-center gap-2.5 border-b border-slate-100 max-[700px]:grid-cols-[32px_1fr]"
                key={`${item.name}-${item.time}`}
              >
                <div
                  className="grid h-8 w-8 place-items-center rounded-full bg-[linear-gradient(135deg,#3b82f6,#2563eb)] text-[13px] font-semibold text-white"
                  aria-hidden="true"
                >
                  {item.name.slice(0, 1)}
                </div>
                <div>
                  <strong className="block text-sm text-[var(--heading)]">
                    {item.name}
                  </strong>
                  <span className="text-xs text-slate-500">{item.detail}</span>
                </div>
                <div className="text-right max-[700px]:col-start-2 max-[700px]:mb-2 max-[700px]:text-left">
                  <time className="block text-xs text-[var(--body)]">
                    {item.time}
                  </time>
                  <span
                    className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${followUpStatusTone[item.status.toLowerCase()] || "bg-slate-100 text-slate-700"}`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </article>

          <article
            className="rounded-lg border border-[var(--border)] bg-white p-3.5 shadow-[0_2px_10px_rgba(15,23,42,0.05)]"
            aria-label="Recent activities"
          >
            <div className="mb-2 flex items-center justify-between">
              <h2 className="m-0 text-base text-[var(--heading)]">
                Recent Activity
              </h2>
            </div>

            <ul className="m-0 list-none p-0">
              {activities.map((item, index) => (
                <li
                  className="grid grid-cols-[62px_22px_1fr] items-start gap-2.5 py-2"
                  key={item}
                >
                  <time className="text-xs text-slate-500">{`${9 + index}:00 AM`}</time>
                  <span
                    className="grid h-[22px] w-[22px] place-items-center rounded-full border border-dashed border-blue-200 text-[var(--primary)]"
                    aria-hidden="true"
                  >
                    <Clock size={12} weight="bold" />
                  </span>
                  <p className="m-0 text-[13px] text-[var(--body)]">{item}</p>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </main>
    </div>
  );
}

function TableView({ onOpenLead }) {
  const [currentPage, setCurrentPage] = useState(1);
  const selectedCount = tableRows.filter((row) => row.selected).length;
  const rowsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(tableRows.length / rowsPerPage));
  const currentPageSafe = Math.min(currentPage, totalPages);
  const startIndex = (currentPageSafe - 1) * rowsPerPage;
  const paginatedRows = tableRows.slice(startIndex, startIndex + rowsPerPage);

  return (
    <main className="flex flex-col gap-5 px-6 py-6 max-[1024px]:px-4">
      <section className="flex min-h-12 items-center justify-between gap-3 rounded-lg border border-[var(--border)] bg-white px-3 py-2 max-[1024px]:flex-wrap max-[1024px]:items-start">
        <div className="flex items-center gap-2 max-[700px]:w-full max-[700px]:flex-wrap">
          <FilterSelect label="Grade: All Grades" />
          <FilterSelect label="Source: All Sources" />
          <FilterSelect label="Status: All Statuses" />
          <FilterSelect label="This Month" />
        </div>
      </section>

      <section className="flex min-h-12 items-center justify-between gap-3 rounded-lg border border-[var(--border)] bg-white px-3 py-2 max-[1024px]:flex-wrap max-[1024px]:items-start">
        <div className="flex items-center gap-2 max-[700px]:w-full max-[700px]:flex-wrap">
          <ToggleView active="table" />
          <button
            className="inline-flex min-h-9 cursor-pointer items-center gap-2 rounded-md border border-[var(--border)] bg-white px-3 text-[var(--body)]"
            type="button"
          >
            <DownloadSimple size={16} weight="regular" /> Export to Excel
          </button>
        </div>
      </section>

      {selectedCount > 0 ? (
        <section
          className="flex min-h-12 items-center justify-between gap-3 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 max-[1024px]:flex-wrap max-[1024px]:items-start"
          aria-label="Bulk actions"
        >
          <p className="m-0 text-[13px] font-semibold text-blue-700">
            {selectedCount} leads selected
          </p>
          <div className="flex items-center gap-2">
            <button
              className="min-h-9 cursor-pointer rounded-md border border-blue-300 bg-white px-2.5 text-[13px] font-medium text-blue-700"
              type="button"
            >
              Change Status
            </button>
            <button
              className="min-h-9 cursor-pointer rounded-md border border-blue-300 bg-white px-2.5 text-[13px] font-medium text-blue-700"
              type="button"
            >
              Export Selected
            </button>
          </div>
        </section>
      ) : null}

      <section
        className="overflow-hidden rounded-t-lg border border-[var(--border)] bg-white"
        aria-label="My leads table"
      >
        <div className="overflow-auto">
          <table className="w-full min-w-[1280px] border-collapse">
            <thead>
              <tr>
                <th className="sticky top-0 z-[2] border-b border-[var(--border)] bg-[var(--bg)] px-2.5 py-3 text-left text-xs font-semibold uppercase tracking-[0.03em] text-slate-500 whitespace-nowrap">
                  <input
                    type="checkbox"
                    aria-label="Select all leads"
                    readOnly
                  />
                </th>
                {[
                  "Lead ID",
                  "Student Name",
                  "Parent Name",
                  "Contact",
                  "Grade",
                  "Source",
                  "Status",
                  "Enquiry Date",
                  "Last Follow-up",
                  "Next Action",
                ].map((header) => (
                  <th
                    key={header}
                    className="sticky top-0 z-[2] border-b border-[var(--border)] bg-[var(--bg)] px-2.5 py-3 text-left text-xs font-semibold uppercase tracking-[0.03em] text-slate-500 whitespace-nowrap"
                  >
                    <span className="mr-1.5">{header}</span>
                    <ArrowsDownUp size={12} weight="regular" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedRows.map((row) => (
                <tr
                  key={row.leadId}
                  className={
                    row.selected
                      ? "bg-blue-50"
                      : "even:bg-slate-50 hover:bg-slate-100"
                  }
                >
                  <td className="whitespace-nowrap border-b border-slate-100 px-2.5 py-3 text-[13px] text-[var(--body)]">
                    <input
                      type="checkbox"
                      checked={row.selected}
                      readOnly
                      aria-label={`Select ${row.leadId}`}
                    />
                  </td>
                  <td className="whitespace-nowrap border-b border-slate-100 px-2.5 py-3 text-[13px] text-[var(--body)]">
                    {row.leadId}
                  </td>
                  <td className="whitespace-nowrap border-b border-slate-100 px-2.5 py-3 text-[13px] text-[var(--body)]">
                    <button
                      className="cursor-pointer border-0 bg-transparent p-0 text-[13px] text-[var(--primary)]"
                      type="button"
                      onClick={onOpenLead}
                    >
                      {row.student}
                    </button>
                  </td>
                  <td className="whitespace-nowrap border-b border-slate-100 px-2.5 py-3 text-[13px] text-[var(--body)]">
                    {row.parent}
                  </td>
                  <td className="whitespace-nowrap border-b border-slate-100 px-2.5 py-3 text-[13px] text-[var(--body)]">
                    {row.contact}
                  </td>
                  <td className="whitespace-nowrap border-b border-slate-100 px-2.5 py-3 text-[13px] text-[var(--body)]">
                    {row.grade}
                  </td>
                  <td className="whitespace-nowrap border-b border-slate-100 px-2.5 py-3 text-[13px] text-[var(--body)]">
                    <span
                      className={`inline-flex min-h-[22px] items-center rounded-xl px-2.5 py-0.5 text-[11px] font-semibold ${rowSourceTone[row.sourceTone] || "bg-slate-100 text-slate-700"}`}
                    >
                      {row.source}
                    </span>
                  </td>
                  <td className="whitespace-nowrap border-b border-slate-100 px-2.5 py-3 text-[13px] text-[var(--body)]">
                    <span
                      className={`inline-flex min-h-[22px] items-center rounded-xl px-2.5 py-0.5 text-[11px] font-semibold ${rowStatusTone[row.statusTone] || "bg-slate-100 text-slate-700"}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap border-b border-slate-100 px-2.5 py-3 text-[13px] text-[var(--body)]">
                    {row.enquiry}
                  </td>
                  <td className="whitespace-nowrap border-b border-slate-100 px-2.5 py-3 text-[13px] text-[var(--body)]">
                    {row.followUp}
                  </td>
                  <td className="whitespace-nowrap border-b border-slate-100 px-2.5 py-3 text-[13px] text-[var(--body)]">
                    <span
                      className={
                        row.overdue
                          ? "inline-flex items-center gap-1.5 font-bold text-[var(--danger)]"
                          : "inline-flex items-center gap-1.5 font-medium text-[var(--heading)]"
                      }
                    >
                      {row.nextAction}
                      {row.overdue ? (
                        <span
                          className="inline-block h-2 w-2 rounded-full bg-amber-500"
                          aria-hidden="true"
                        />
                      ) : null}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="flex min-h-12 items-center justify-between gap-2.5 border-t border-[var(--border)] px-3 max-[1024px]:flex-wrap max-[1024px]:items-start">
          <p className="m-0 text-[13px] text-slate-500">
            {`Showing ${tableRows.length ? startIndex + 1 : 0}-${Math.min(startIndex + rowsPerPage, tableRows.length)} of ${tableRows.length} leads`}
          </p>
          <div className="flex items-center gap-2">
            <button
              className="h-8 w-8 rounded-md border border-[var(--border)] bg-white text-slate-600"
              type="button"
              aria-label="Previous page"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPageSafe === 1}
            >
              ‹
            </button>
            <button
              className="h-8 w-8 rounded-md border border-[var(--border)] bg-white text-slate-600"
              type="button"
              aria-label="Next page"
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              disabled={currentPageSafe === totalPages}
            >
              ›
            </button>
          </div>
        </footer>
      </section>
    </main>
  );
}

const leadTimeline = [
  {
    type: "Phone Call",
    date: "11 Apr 2026 · 2:30 PM · Phone Call",
    note: "Spoke with father. Interested in visiting campus next week. Will call back on Monday to confirm date.",
    author: "Arunav Kishor",
    tone: "blue",
    icon: PhoneCall,
  },
  {
    type: "WhatsApp",
    date: "09 Apr 2026 · 11:00 AM · WhatsApp",
    note: "Sent school brochure and fee structure PDF. Parent acknowledged receipt.",
    author: "Arunav Kishor",
    tone: "green",
    icon: ChatCircleDots,
  },
  {
    type: "Phone Call",
    date: "08 Apr 2026 · 3:15 PM · Phone Call",
    note: "First contact. Parent enquired about Grade 5 admission. Interested in CBSE curriculum and sports facilities.",
    author: "Arunav Kishor",
    tone: "blue",
    icon: PhoneCall,
  },
  {
    type: "System",
    date: "08 Apr 2026 · 10:00 AM · System",
    note: "Lead created from website form. Auto-assigned to Arunav Kishor.",
    author: "System",
    tone: "purple",
    icon: Sparkle,
    system: true,
  },
];

const leadActions = [
  { key: "followup", label: "Follow-up", tone: "action-blue", icon: PhoneCall },
  {
    key: "schedule",
    label: "Schedule Visit",
    tone: "action-amber",
    icon: Buildings,
  },
  { key: "issue", label: "Issue Form", tone: "action-violet", icon: FileText },
  {
    key: "convert",
    label: "Mark Converted",
    tone: "action-green",
    icon: CheckCircle,
  },
  { key: "lost", label: "Mark Lost", tone: "action-red", icon: XCircle },
  { key: "edit", label: "Edit Lead", tone: "action-gray", icon: NotePencil },
];

const modalModes = [
  { label: "Call", icon: PhoneCall, active: true },
  { label: "Visit", icon: Buildings },
  { label: "WhatsApp", icon: ChatCircleDots },
  { label: "SMS", icon: EnvelopeSimple },
  { label: "Other", icon: ClipboardText },
];

function FollowUpModal({ onClose }) {
  return (
    <LegacyTailwindMapper>
      <div
        className="screen-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Log Follow-up"
      >
        <section className="followup-modal">
          <header className="followup-header">
            <div>
              <h2>Log Follow-up</h2>
              <p>Aarav Mehta · LM-0247</p>
            </div>
            <button
              className="icon-btn"
              type="button"
              aria-label="Close follow-up modal"
              onClick={onClose}
            >
              <X size={18} weight="regular" />
            </button>
          </header>

          <div className="drawer-divider" />

          <div className="followup-body">
            <FormField label="Date" hint="DD/MM/YYYY format">
              <div className="form-input date-input">
                <input type="text" value="13/04/2026" readOnly />
                <CalendarDots size={16} weight="regular" />
              </div>
            </FormField>

            <FormField label="Mode" required>
              <div
                className="mode-grid"
                role="group"
                aria-label="Follow-up mode"
              >
                {modalModes.map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <button
                      key={mode.label}
                      type="button"
                      className={mode.active ? "active" : ""}
                    >
                      <Icon size={15} weight="regular" /> {mode.label}
                    </button>
                  );
                })}
              </div>
            </FormField>

            <FormField label="Notes" required>
              <textarea
                className="form-textarea"
                rows={4}
                readOnly
                value="Spoke with father. Confirmed campus visit for Thursday 17 April at 10 AM. Very interested in sports facilities and CBSE board."
              />
            </FormField>

            <div className="drawer-divider" />

            <FormField label="Next Action Date">
              <div className="form-input date-input">
                <input type="text" value="17/04/2026" readOnly />
                <CalendarDots size={16} weight="regular" />
              </div>
            </FormField>

            <FormField label="Next Action Note">
              <input
                className="form-input"
                type="text"
                value="Campus visit - 10 AM. Prepare Grade 5 class demo."
                readOnly
              />
            </FormField>
          </div>

          <footer className="followup-footer">
            <button className="mini-ghost" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="primary-btn inline-save" type="button">
              Save Follow-up
            </button>
          </footer>
        </section>
      </div>
    </LegacyTailwindMapper>
  );
}

function ScheduleVisitModal({ onClose }) {
  return (
    <LegacyTailwindMapper>
      <div
        className="screen-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Schedule Campus Visit"
      >
        <section className="visit-modal">
          <header className="followup-header">
            <div>
              <h2>
                <CalendarDots size={18} weight="regular" /> Schedule Campus
                Visit
              </h2>
              <p>Aarav Mehta · Grade 5</p>
            </div>
            <button
              className="icon-btn"
              type="button"
              aria-label="Close visit modal"
              onClick={onClose}
            >
              <X size={18} weight="regular" />
            </button>
          </header>
          <div className="drawer-divider" />

          <div className="followup-body">
            <FormField label="Visit Date" required>
              <div className="form-input date-input">
                <input type="text" value="17/04/2026" readOnly />
                <CalendarDots size={16} weight="regular" />
              </div>
            </FormField>

            <FormField label="Visit Time" required>
              <div className="form-input date-input">
                <input type="text" value="10:00 AM" readOnly />
                <Clock size={16} weight="regular" />
              </div>
            </FormField>

            <FormField label="Visiting With">
              <input
                className="form-input"
                type="text"
                value="Father - Mr. Rajesh Mehta"
                readOnly
              />
            </FormField>

            <FormField label="Areas of Interest">
              <div className="visit-chip-grid">
                <button className="visit-chip active" type="button">
                  Classrooms
                </button>
                <button className="visit-chip active" type="button">
                  Sports Complex
                </button>
                <button className="visit-chip" type="button">
                  Labs
                </button>
                <button className="visit-chip" type="button">
                  Library
                </button>
                <button className="visit-chip" type="button">
                  Hostel
                </button>
              </div>
            </FormField>

            <FormField label="Special Requests / Notes">
              <textarea
                className="form-textarea"
                rows={3}
                readOnly
                value="Any accessibility needs or specific requests..."
              />
            </FormField>

            <div className="reminder-row">
              <label>
                <input type="checkbox" checked readOnly /> Send SMS reminder 1
                day before
              </label>
              <label>
                <input type="checkbox" checked readOnly /> Send email reminder 1
                day before
              </label>
            </div>

            <div className="info-callout">
              <p>
                <CheckCircle size={15} weight="regular" /> The parent will
                receive an auto-confirmation SMS and email with visit details
                and campus directions.
              </p>
            </div>
          </div>

          <footer className="followup-footer">
            <button className="mini-ghost" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="primary-btn inline-save" type="button">
              Schedule Visit
            </button>
          </footer>
        </section>
      </div>
    </LegacyTailwindMapper>
  );
}

function ConvertLeadModal({ onClose }) {
  return (
    <LegacyTailwindMapper>
      <div
        className="screen-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Convert Lead"
      >
        <section className="convert-modal">
          <div className="convert-top">
            <div className="convert-icon">
              <Check size={24} weight="bold" />
            </div>
            <h2>Convert Lead</h2>
            <p>Aarav Mehta · LM-0247</p>
          </div>

          <div className="convert-summary">
            <p>
              <strong>Student:</strong> Aarav Mehta
            </p>
            <p>
              <strong>Grade:</strong> 5
            </p>
            <p>
              <strong>School:</strong> Raj Vedanta
            </p>
            <p>
              <strong>Source:</strong> Website
            </p>
            <p>
              <strong>Days in Pipeline:</strong> 9
            </p>
            <p>
              <strong>Counsellor:</strong> Priya Sharma
            </p>
          </div>

          <div className="convert-radio-group">
            <label>
              <input type="radio" name="conversion-path" checked readOnly />
              <span>Standard Admission → Entrance Exam</span>
            </label>
            <small>Triggers Entrance Exam workflow</small>
            <label>
              <input type="radio" name="conversion-path" readOnly />
              <span>Direct Admission</span>
            </label>
            <small>Requires override justification</small>
          </div>

          <FormField label="Conversion Notes">
            <textarea
              className="form-textarea"
              rows={3}
              readOnly
              value="Any notes for the admission record..."
            />
          </FormField>

          <footer className="followup-footer">
            <button className="mini-ghost" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="confirm-green" type="button">
              Confirm Conversion ✅
            </button>
          </footer>
        </section>
      </div>
    </LegacyTailwindMapper>
  );
}

function LostLeadModal({ onClose }) {
  return (
    <LegacyTailwindMapper>
      <div
        className="screen-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Mark Lead as Lost"
      >
        <section className="lost-modal">
          <div className="convert-top">
            <div className="lost-icon">
              <X size={22} weight="bold" />
            </div>
            <h2 className="lost-title">Mark as Lost</h2>
            <p>Aarav Mehta · LM-0247</p>
          </div>

          <div className="followup-body">
            <FormField label="Reason for Loss" required>
              <button className="form-select" type="button">
                <span>Chose another school</span>
                <CaretDown size={14} weight="regular" />
              </button>
              <div className="option-row">
                Chose another school · Fee too high · Relocated / moving away ·
                Not responding / went cold · Admission elsewhere confirmed ·
                Changed mind about grade/board · Other
              </div>
            </FormField>

            <FormField label="Additional Details">
              <textarea
                className="form-textarea"
                rows={3}
                readOnly
                value="Parent confirmed admission at Delhi Public School. Was primarily comparing fee structures."
              />
            </FormField>

            <div className="callout danger">
              <p>
                <WarningCircle size={15} weight="regular" /> Lost leads can be
                reactivated in the next admission cycle from the Reports
                section.
              </p>
            </div>
          </div>

          <footer className="followup-footer">
            <button className="mini-ghost" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="danger-btn" type="button">
              Mark as Lost
            </button>
          </footer>
        </section>
      </div>
    </LegacyTailwindMapper>
  );
}

function ReportsView({ onOpenMobileDashboard, onOpenMobileKanban }) {
  const funnel = [
    { label: "Lead", value: 47, pct: "100%", tone: "#2563eb" },
    // { label: "Contacted", value: 38, pct: "81%", tone: "#4f46e5" },
    { label: "Nurturing", value: 27, pct: "57%", tone: "#0d9488" },
    { label: "Visit Scheduled", value: 18, pct: "38%", tone: "#f59e0b" },
    { label: "Visit Completed", value: 14, pct: "30%", tone: "#ea580c" },
    { label: "Form Issued", value: 11, pct: "23%", tone: "#7c3aed" },
    { label: "Unsuccessful", value: 6, pct: "13%", tone: "#f97316" },
    { label: "Dead Leads", value: 5, pct: "11%", tone: "#6b7280" },
    { label: "Converted", value: 8, pct: "17%", tone: "#16a34a" },
  ];

  return (
    <main className="flex flex-col gap-5 px-6 py-6 max-[1024px]:px-4">
      <section className="flex min-h-12 items-center justify-between gap-3 rounded-lg border border-[var(--border)] bg-white px-3 py-2 max-[1024px]:flex-wrap max-[1024px]:items-start">
        <div className="flex items-center gap-2 max-[700px]:w-full max-[700px]:flex-wrap">
          <FilterSelect label="Admission Cycle: 2026-27" />
          <FilterSelect label="01 Apr - 13 Apr 2026" />
          <FilterSelect label="Grade: All" />
        </div>
        <button
          className="inline-flex min-h-9 cursor-pointer items-center gap-2 rounded-md border border-[var(--border)] bg-white px-3 text-[var(--body)]"
          type="button"
        >
          <DownloadSimple size={16} weight="regular" /> Export PDF
        </button>
      </section>

      <section className="grid grid-cols-4 gap-4 max-[1024px]:grid-cols-1">
        <article className="rounded-lg border border-[var(--border)] bg-white p-3.5 shadow-[0_2px_10px_rgba(15,23,42,0.05)]">
          <h4 className="m-0 text-[13px] text-slate-500">My Total Leads</h4>
          <p className="mb-1.5 mt-2 text-[32px] font-bold text-slate-900">47</p>
          <span className="text-xs font-semibold text-green-600">
            +12 this week ↗
          </span>
        </article>
        <article className="rounded-lg border border-[var(--border)] bg-white p-3.5 shadow-[0_2px_10px_rgba(15,23,42,0.05)]">
          <h4 className="m-0 text-[13px] text-slate-500">Conversion Rate</h4>
          <p className="mb-1.5 mt-2 text-[32px] font-bold text-green-600">
            38.2%
          </p>
          <span className="text-xs font-semibold text-green-600">
            vs 31% last cycle ↗
          </span>
        </article>
        <article className="rounded-lg border border-[var(--border)] bg-white p-3.5 shadow-[0_2px_10px_rgba(15,23,42,0.05)]">
          <h4 className="m-0 text-[13px] text-slate-500">
            Avg Days to Convert
          </h4>
          <p className="mb-1.5 mt-2 text-[32px] font-bold text-blue-600">
            12.4
          </p>
          <span className="text-xs text-slate-600">Target: ≤14 days</span>
        </article>
        <article className="rounded-lg border border-[var(--border)] bg-white p-3.5 shadow-[0_2px_10px_rgba(15,23,42,0.05)]">
          <h4 className="m-0 text-[13px] text-slate-500">Overdue Follow-ups</h4>
          <p className="mb-1.5 mt-2 text-[32px] font-bold text-amber-500">7</p>
          <span className="text-xs text-slate-600">
            3 critical (&gt;5 days)
          </span>
        </article>
      </section>

      <section className="grid grid-cols-2 gap-4 max-[1024px]:grid-cols-1">
        <article className="rounded-lg border border-[var(--border)] bg-white p-3.5 shadow-[0_2px_10px_rgba(15,23,42,0.05)]">
          <h3 className="m-0 mb-3 text-base text-[var(--heading)]">
            My Lead Funnel
          </h3>
          <div className="grid gap-2">
            {funnel.map((bar, index) => (
              <div
                key={bar.label}
                className="grid grid-cols-[100px_1fr_auto] items-center gap-2.5 text-xs"
              >
                <span>{bar.label}</span>
                <div className="h-5 overflow-hidden rounded-md bg-slate-100">
                  <div
                    className="h-full"
                    style={{
                      width: `${100 - index * 8}%`,
                      background: bar.tone,
                    }}
                  />
                </div>
                <strong>
                  {bar.value} · {bar.pct}
                </strong>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-lg border border-[var(--border)] bg-white p-3.5 shadow-[0_2px_10px_rgba(15,23,42,0.05)]">
          <h3 className="m-0 mb-3 text-base text-[var(--heading)]">
            My Leads by Source
          </h3>
          <div className="flex items-center gap-3.5">
            <div className="relative grid h-[170px] w-[170px] place-items-center rounded-full bg-[conic-gradient(#2563eb_0_34%,#4f46e5_34%_60%,#0d9488_60%_77%,#ec4899_77%_87%,#38bdf8_87%_93%,#f59e0b_93%_97%,#16a34a_97%_100%)]">
              <span className="absolute h-24 w-24 rounded-full bg-white" />
              <span className="relative text-[26px] font-bold text-slate-900">
                47
              </span>
            </div>
            <ul className="m-0 grid list-none gap-1.5 p-0 text-xs text-slate-700">
              <li>Walk-in 34%</li>
              <li>Website 26%</li>
              <li>Phone 17%</li>
              <li>Instagram 10%</li>
              <li>Facebook 6%</li>
              <li>Google Ads 4%</li>
              <li>Referral 3%</li>
            </ul>
          </div>
        </article>
      </section>

      <article className="rounded-lg border border-[var(--border)] bg-white p-3.5 shadow-[0_2px_10px_rgba(15,23,42,0.05)]">
        <h3 className="m-0 mb-3 text-base text-[var(--heading)]">
          Follow-up Activity (Last 4 Weeks)
        </h3>
        <div className="grid grid-cols-4 items-end gap-3">
          {["Week 1", "Week 2", "Week 3", "Week 4"].map((week, i) => (
            <div key={week} className="text-center">
              <div className="flex h-[130px] items-end justify-center gap-1.5">
                <span
                  style={{ height: `${44 + i * 10}px` }}
                  className="inline-block w-4 rounded-t bg-[#2563eb]"
                />
                <span
                  style={{ height: `${30 + i * 10}px` }}
                  className="inline-block w-4 rounded-t bg-[#16a34a]"
                />
                <span
                  style={{ height: `${20 + i * 8}px` }}
                  className="inline-block w-4 rounded-t bg-[#f59e0b]"
                />
              </div>
              <small className="text-[10px] text-slate-500">{week}</small>
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-lg border border-[var(--border)] bg-white p-3.5 shadow-[0_2px_10px_rgba(15,23,42,0.05)]">
        <h3 className="m-0 mb-3 text-base text-[var(--heading)]">
          My Leads by Grade
        </h3>
        <div className="grid grid-cols-[repeat(15,minmax(0,1fr))] items-end gap-1.5 max-[1024px]:overflow-x-auto max-[1024px]:[grid-template-columns:repeat(15,40px)]">
          {[
            "Nursery",
            "LKG",
            "UKG",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
          ].map((grade, i) => (
            <div key={grade} className="text-center">
              <div className="flex h-24 flex-col-reverse items-stretch overflow-hidden rounded bg-slate-100">
                <span
                  className="block bg-[#2563eb]"
                  style={{ height: `${10 + (i % 5) * 4}px` }}
                />
                <span
                  className="block bg-[#0d9488]"
                  style={{ height: `${8 + (i % 4) * 3}px` }}
                />
                <span
                  className="block bg-[#f59e0b]"
                  style={{ height: `${6 + (i % 3) * 3}px` }}
                />
              </div>
              <small className="text-[10px] text-slate-500">{grade}</small>
            </div>
          ))}
        </div>
      </article>

      <section className="flex gap-2.5 max-[700px]:flex-col">
        <button
          className="inline-flex min-h-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-[var(--border)] bg-white px-3 text-[var(--body)]"
          type="button"
          onClick={onOpenMobileDashboard}
        >
          Open Mobile Dashboard
        </button>
        <button
          className="inline-flex min-h-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-[var(--border)] bg-white px-3 text-[var(--body)]"
          type="button"
          onClick={onOpenMobileKanban}
        >
          Open Mobile Kanban
        </button>
      </section>
    </main>
  );
}

function MobileDashboardView() {
  return (
    <main className="grid min-h-[calc(100vh-56px)] place-items-center p-4">
      <section className="relative h-[844px] w-[390px] max-w-full overflow-hidden rounded-3xl border-8 border-slate-900 bg-slate-50">
        <header className="flex h-14 items-center justify-between border-b border-[var(--border)] bg-white px-3">
          <ListBullets size={20} weight="regular" />
          <strong className="text-[15px] text-slate-900">Raj Vedanta</strong>
          <div className="inline-flex items-center gap-2">
            <Bell size={18} weight="regular" />
            <UserCircle size={28} weight="regular" />
          </div>
        </header>
        <div className="p-4">
          <h3 className="m-0 text-lg text-slate-900">Good afternoon, Priya</h3>
          <p className="mt-1 text-xs text-slate-500">13 April 2026</p>
          <div className="mt-3.5 grid grid-cols-2 gap-3">
            {stats.map((card) => (
              <article
                key={card.title}
                className="rounded-lg border border-[var(--border)] border-l-4 border-l-[var(--primary)] bg-white p-2.5"
              >
                <h4 className="m-0 text-[11px] text-slate-600">{card.title}</h4>
                <strong className="text-[28px] text-slate-900">
                  {card.value}
                </strong>
              </article>
            ))}
          </div>
          <article className="mt-3 rounded-lg border border-[var(--border)] bg-white p-3">
            <h4 className="m-0 mb-1.5 text-slate-900">Today's Follow-ups</h4>
            <p className="m-0 mb-1.5 text-[13px] text-[var(--body)]">
              Rohit Sharma · Grade 5 · 10:30 AM
            </p>
            <p className="m-0 mb-1.5 text-[13px] text-[var(--body)]">
              Ananya Gupta · Grade 3 · 11:45 AM
            </p>
            <p className="m-0 mb-1.5 text-[13px] text-[var(--body)]">
              Vihaan Mehta · Nursery · 01:00 PM
            </p>
            <p className="m-0 text-[13px] text-[var(--body)]">
              Saanvi Iyer · Grade 7 · 03:10 PM
            </p>
          </article>
          <article className="mt-3 rounded-lg border border-[var(--border)] bg-white p-3">
            <h4 className="m-0 mb-1.5 text-slate-900">Recent Activity</h4>
            <p className="m-0 mb-1.5 text-[13px] text-[var(--body)]">
              Marked Ananya as Visit Completed
            </p>
            <p className="m-0 mb-1.5 text-[13px] text-[var(--body)]">
              Sent brochure to Rohit's parent
            </p>
            <p className="m-0 mb-1.5 text-[13px] text-[var(--body)]">
              Added Kavya Verma lead
            </p>
            <p className="m-0 text-[13px] text-[var(--body)]">
              Updated Kabir Singh notes
            </p>
          </article>
        </div>
        <nav className="absolute bottom-0 left-0 right-0 grid h-14 grid-cols-4 place-items-center border-t border-[var(--border)] bg-white text-[10px] text-slate-500">
          <span className="font-semibold text-[var(--primary)]">Home</span>
          <span>Pipeline</span>
          <span>Leads</span>
          <span>Reports</span>
        </nav>
        <button
          className="absolute bottom-[66px] right-4 h-12 w-12 rounded-full border-0 bg-[var(--primary)] text-white"
          type="button"
        >
          <Plus size={20} weight="regular" />
        </button>
      </section>
    </main>
  );
}

function MobileKanbanView() {
  return (
    <main className="grid min-h-[calc(100vh-56px)] place-items-center p-4">
      <section className="relative h-[844px] w-[390px] max-w-full overflow-hidden rounded-3xl border-8 border-slate-900 bg-slate-50">
        <header className="flex h-14 items-center justify-between border-b border-[var(--border)] bg-white px-3">
          <CaretDown size={18} weight="regular" />
          <strong className="text-[15px] text-slate-900">Assigned Data</strong>
          <ArrowsDownUp size={18} weight="regular" />
        </header>
        <div className="flex gap-2.5 overflow-x-auto p-4">
          <article className="min-w-[280px]">
            <header className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-slate-900">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: "#0D9488" }}
              />{" "}
              Nurturing{" "}
              <span className="grid h-[22px] min-w-[26px] place-items-center rounded-full bg-slate-200 px-2 text-[11px] text-slate-600">
                15
              </span>
            </header>
            <div
              className="mb-2.5 w-[280px] rounded-lg border border-[var(--border)] border-t-[3px] bg-white p-3"
              style={{ borderTopColor: "#0D9488" }}
            >
              <h4 className="m-0 text-sm font-medium text-[var(--heading)]">
                Meera Desai
              </h4>
              <p className="mb-2.5 mt-1.5 text-xs text-slate-500">
                Grade 7 · Instagram
              </p>
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>📅 10 Apr</span>
                <span className="h-2 w-2 rounded-full bg-amber-500" />
              </div>
            </div>
            <div
              className="mb-2.5 w-[280px] rounded-lg border border-[var(--border)] border-t-[3px] bg-white p-3"
              style={{ borderTopColor: "#0D9488" }}
            >
              <h4 className="m-0 text-sm font-medium text-[var(--heading)]">
                Ishaan Khan
              </h4>
              <p className="mb-2.5 mt-1.5 text-xs text-slate-500">
                Grade 5 · Walk-in
              </p>
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>📅 12 Apr</span>
              </div>
            </div>
            <div
              className="mb-2.5 w-[280px] rounded-lg border border-[var(--border)] border-t-[3px] bg-white p-3"
              style={{ borderTopColor: "#0D9488" }}
            >
              <h4 className="m-0 text-sm font-medium text-[var(--heading)]">
                Sneha Gupta
              </h4>
              <p className="mb-2.5 mt-1.5 text-xs text-slate-500">
                Grade 8 · Google Ads
              </p>
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>📅 13 Apr</span>
              </div>
            </div>
            <div
              className="w-[280px] rounded-lg border border-[var(--border)] border-t-[3px] bg-white p-3"
              style={{ borderTopColor: "#0D9488" }}
            >
              <h4 className="m-0 text-sm font-medium text-[var(--heading)]">
                Ritu Solanki
              </h4>
              <p className="mb-2.5 mt-1.5 text-xs text-slate-500">
                Grade 2 · Reference
              </p>
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>📅 08 Apr</span>
                <span className="h-2 w-2 rounded-full bg-amber-500" />
              </div>
            </div>
          </article>
          <div className="min-w-10" />
        </div>
        <div className="flex justify-center gap-1.5 pb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
        </div>
        <nav className="absolute bottom-0 left-0 right-0 grid h-14 grid-cols-4 place-items-center border-t border-[var(--border)] bg-white text-[10px] text-slate-500">
          <span>Home</span>
          <span className="font-semibold text-[var(--primary)]">Assigned</span>
          <span>Leads</span>
          <span>Reports</span>
        </nav>
      </section>
    </main>
  );
}

function LeadDetailView({
  followupOpen,
  onOpenFollowup,
  onCloseFollowup,
  visitOpen,
  onOpenVisit,
  onCloseVisit,
  convertOpen,
  onOpenConvert,
  onCloseConvert,
  lostOpen,
  onOpenLost,
  onCloseLost,
}) {
  const steps = [
    { label: "Lead", state: "done" },
    // { label: "Contacted", state: "done" },
    { label: "Nurturing", state: "active" },
    { label: "Visit Scheduled", state: "todo" },
    { label: "Unsuccessful", state: "todo" },
    { label: "Dead Leads", state: "todo" },
    // { label: "Visit Completed", state: "todo" },
    // { label: "Form Issued", state: "todo" },
    // { label: "Converted", state: "todo" },
  ];

  return (
    <LegacyTailwindMapper>
      <main className="lead-detail-page">
        <section className="lead-main">
          <article className="panel-card">
            <div className="stage-stepper">
              {steps.map((step, index) => (
                <div key={step.label} className="step-item">
                  <div className={`step-dot ${step.state}`} />
                  {index < steps.length - 1 ? (
                    <div className="step-line" />
                  ) : null}
                  <span>{step.label}</span>
                </div>
              ))}
            </div>

            <button
              className="outline-btn add-followup-btn"
              type="button"
              onClick={onOpenFollowup}
            >
              <PhoneCall size={16} weight="regular" /> + Add Follow-up
            </button>

            <div className="activity-timeline">
              {leadTimeline.map((entry) => {
                const Icon = entry.icon;
                return (
                  <div key={entry.date} className="activity-row">
                    <div className="timeline-rail" />
                    <div className={`activity-icon ${entry.tone}`}>
                      <Icon size={16} weight="regular" />
                    </div>
                    <div className="activity-content">
                      <h4>{entry.date}</h4>
                      <p className={entry.system ? "system-note" : ""}>
                        {entry.note}
                      </p>
                      <span>— {entry.author}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        </section>

        <aside className="lead-side">
          <article className="panel-card lead-info-card">
            <div className="lead-head">
              <div>
                <h2>Aarav Mehta</h2>
                <p>LM-0247</p>
              </div>
              <span className="chip status-teal">Nurturing</span>
            </div>

            <div className="drawer-divider" />

            <div className="lead-info-grid">
              <p>
                <strong>Parent:</strong> Sunita Mehta
              </p>
              <p>
                <strong>Contact:</strong>{" "}
                <a href="#" aria-label="Call parent">
                  <Phone size={13} weight="regular" /> +91 98765 43210
                </a>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href="#" aria-label="Email parent">
                  <EnvelopeSimple size={13} weight="regular" />{" "}
                  sunita.mehta@gmail.com
                </a>
              </p>
              <p>
                <strong>Grade:</strong> Grade 5
              </p>
              <p>
                <strong>Source:</strong>{" "}
                <span className="chip source-blue">Website</span>
              </p>
              <p>
                <strong>Campaign:</strong> Google Ads - Summer 2026
              </p>
              <p>
                <strong>School:</strong> Raj Vedanta School
              </p>
              <p>
                <strong>Enquiry Date:</strong> 08/04/2026
              </p>
              <p>
                <strong>Next Follow-up:</strong>{" "}
                <span className="next-warning">14/04/2026 (Tomorrow)</span>
              </p>
              <p>
                <strong>Days in Pipeline:</strong> 5 days
              </p>
            </div>

            <div className="action-grid">
              {leadActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.key}
                    className={`action-btn ${action.tone}`}
                    type="button"
                    onClick={() => {
                      if (action.key === "followup") onOpenFollowup();
                      if (action.key === "schedule") onOpenVisit();
                      if (action.key === "convert") onOpenConvert();
                      if (action.key === "lost") onOpenLost();
                    }}
                  >
                    <Icon size={16} weight="regular" /> {action.label}
                  </button>
                );
              })}
            </div>
          </article>
        </aside>

        {followupOpen ? <FollowUpModal onClose={onCloseFollowup} /> : null}
        {visitOpen ? <ScheduleVisitModal onClose={onCloseVisit} /> : null}
        {convertOpen ? <ConvertLeadModal onClose={onCloseConvert} /> : null}
        {lostOpen ? <LostLeadModal onClose={onCloseLost} /> : null}
      </main>
    </LegacyTailwindMapper>
  );
}

function NewLeadView({ mode, setMode, onClose }) {
  const isBackdated = mode === "backdated";
  const isDuplicate = mode === "duplicate";

  const stateValues = {
    default: {
      student: "Kavya Sharma",
      parent: "Rajesh Sharma",
      contact: "94251 67890",
      email: "rajesh.sharma@email.com",
      grade: "Grade 3",
      source: "Walk-in",
      date: "13/04/2026",
      notes: "Parent asked for transport details and fee timeline.",
      reason: "",
    },
    backdated: {
      student: "Ira Chaturvedi",
      parent: "Manish Chaturvedi",
      contact: "99008 77331",
      email: "manish.c@email.com",
      grade: "Grade 2",
      source: "Phone Call",
      date: "08/04/2026",
      notes: "Interested in scholarship options and classroom visit.",
      reason:
        "Walk-in received on Saturday, school office closed for data entry",
    },
    duplicate: {
      student: "Aarav Mehta",
      parent: "Sunita Mehta",
      contact: "98765 43210",
      email: "sunita.mehta@email.com",
      grade: "Grade 5",
      source: "Website",
      date: "13/04/2026",
      notes: "Parent requested callback after 5 PM.",
      reason: "",
    },
  }[mode];

  return (
    <LegacyTailwindMapper>
      <main className="new-lead-view">
        <AssignedDataView onCallAction={() => {}} />
        <div className="pipeline-dim" aria-hidden="true" />

        <aside className="lead-drawer" aria-label="New lead panel">
          <header className="drawer-header">
            <h2>Add New Lead</h2>
            <button
              className="icon-btn"
              type="button"
              aria-label="Close panel"
              onClick={onClose}
            >
              <X size={18} weight="regular" />
            </button>
          </header>
          <div className="drawer-divider" />

          <div
            className="state-toggle"
            role="group"
            aria-label="Entry state preview"
          >
            <button
              className={mode === "default" ? "active" : ""}
              type="button"
              onClick={() => setMode("default")}
            >
              Default
            </button>
            <button
              className={mode === "backdated" ? "active" : ""}
              type="button"
              onClick={() => setMode("backdated")}
            >
              Backdated
            </button>
            <button
              className={mode === "duplicate" ? "active" : ""}
              type="button"
              onClick={() => setMode("duplicate")}
            >
              Duplicate
            </button>
          </div>

          <section className="drawer-body">
            <div className="section-label">Student Information</div>

            <FormField
              label="Student Name"
              required
              hint="Enter student's official name as per school records."
            >
              <input
                className="form-input"
                type="text"
                value={stateValues.student}
                readOnly
              />
            </FormField>

            <FormField
              label="Parent / Guardian Name"
              hint="Primary parent or guardian for communication."
            >
              <input
                className="form-input"
                type="text"
                value={stateValues.parent}
                readOnly
              />
            </FormField>

            <FormField
              label="Contact Number"
              required
              hint="Use the number where WhatsApp/calls are reachable."
            >
              <div
                className={`form-input with-prefix ${isDuplicate ? "danger" : ""}`}
              >
                <span className="prefix-chip">+91</span>
                <input type="text" value={stateValues.contact} readOnly />
              </div>
              {!isDuplicate ? (
                <p className="field-inline success">
                  <CheckCircle size={14} weight="regular" /> No duplicate found
                </p>
              ) : null}
              {isDuplicate ? (
                <div className="callout danger">
                  <p className="callout-title">
                    <WarningCircle size={16} weight="regular" /> Possible
                    duplicate detected
                  </p>
                  <div className="duplicate-card">
                    Aarav Mehta · Grade 5 · Status: Nurturing · Counsellor:
                    Priya Sharma
                  </div>
                  <div className="duplicate-actions">
                    <button className="mini-outline" type="button">
                      View Existing Lead
                    </button>
                    <button className="mini-ghost" type="button">
                      Proceed Anyway
                    </button>
                  </div>
                </div>
              ) : null}
            </FormField>

            <FormField
              label="Email"
              hint="Optional, useful for brochure and updates."
            >
              <input
                className="form-input"
                type="email"
                value={stateValues.email}
                readOnly
              />
            </FormField>

            <FormField
              label="Grade of Interest"
              required
              hint="Academic session 2026-27 intake."
            >
              <button className="form-select" type="button">
                <span>{stateValues.grade}</span>
                <CaretDown size={14} weight="regular" />
              </button>
              <div className="option-row">Nursery · LKG · UKG · 1-12</div>
            </FormField>

            <div className="section-label">Enquiry Details</div>

            <FormField
              label="Source Channel"
              required
              hint="How the parent first connected with admissions."
            >
              <button className="form-select" type="button">
                <span>{stateValues.source}</span>
                <CaretDown size={14} weight="regular" />
              </button>
            </FormField>

            <FormField
              label="Enquiry Date"
              required
              hint="Date format: DD/MM/YYYY"
            >
              <div
                className={`form-input date-input ${isBackdated ? "warning" : ""}`}
              >
                <input type="text" value={stateValues.date} readOnly />
                {isBackdated ? (
                  <Clock size={16} weight="regular" />
                ) : (
                  <CalendarDots size={16} weight="regular" />
                )}
              </div>
              {isBackdated ? (
                <div className="callout warning">
                  <p>
                    <WarningCircle size={16} weight="regular" /> This date is in
                    the past. A reason is required for backdated entries.
                  </p>
                </div>
              ) : null}
            </FormField>

            {isBackdated ? (
              <FormField
                label="Reason for Backdating"
                required
                hint="Required for audit trail and lead timeline accuracy."
              >
                <textarea
                  className="form-textarea warning"
                  rows={2}
                  value={stateValues.reason}
                  readOnly
                />
              </FormField>
            ) : null}

            <FormField label="School" hint="Auto-set from counsellor account.">
              <div className="form-input disabled-field">
                <input type="text" value="Raj Vedanta School" readOnly />
                <LockSimple size={15} weight="regular" />
              </div>
            </FormField>

            <FormField
              label="Campaign Name"
              hint="Auto-filled for digital leads"
            >
              <input
                className="form-input disabled-input"
                type="text"
                value="Auto-filled for digital leads"
                readOnly
              />
            </FormField>

            <FormField
              label="Notes"
              hint="Internal comments visible to admissions team."
            >
              <textarea
                className="form-textarea"
                rows={3}
                value={stateValues.notes}
                readOnly
              />
            </FormField>
          </section>

          <footer className="drawer-footer">
            <button className="ghost-primary" type="button">
              Save & Add Another
            </button>
            <button
              className="primary-btn inline-save"
              type="button"
              disabled={isDuplicate}
            >
              Save Lead
            </button>
          </footer>
        </aside>
      </main>
    </LegacyTailwindMapper>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const [passwordPromptOpen, setPasswordPromptOpen] = useState(false);
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [leadEntryMode, setLeadEntryMode] = useState("default");
  const [followupOpen, setFollowupOpen] = useState(false);
  const [visitOpen, setVisitOpen] = useState(false);
  const [convertOpen, setConvertOpen] = useState(false);
  const [lostOpen, setLostOpen] = useState(false);
  const [callActionOpen, setCallActionOpen] = useState(false);
  const [selectedLeadForCall, setSelectedLeadForCall] = useState(null);
  const [markedCallLeadIds, setMarkedCallLeadIds] = useState([]);
  const [leadStageById, setLeadStageById] = useState({});
  const [followUpScheduleByLeadId, setFollowUpScheduleByLeadId] = useState({});
  const [dismissedFollowUpLeadIds, setDismissedFollowUpLeadIds] = useState([]);

  const formattedDate = useMemo(() => {
    const date = new Date("2026-04-13T12:30:00");
    return new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }, [activeView]);

  const openCallActionModal = (lead) => {
    setSelectedLeadForCall(lead);
    setCallActionOpen(true);
  };

  const closeCallActionModal = () => {
    setCallActionOpen(false);
    setSelectedLeadForCall(null);
  };

  const handleCallActionSubmit = (callData) => {
    console.log("Call action submitted:", callData);
    const selectedStatus = callData.status;
    const canMoveStage = stageTabs.includes(selectedStatus);
    const followUpDateTime = callData.followUpDateTime?.trim() || "";
    const leadId = selectedLeadForCall?.leadId;

    if (canMoveStage && selectedLeadForCall?.leadId) {
      setLeadStageById((state) => ({
        ...state,
        [selectedLeadForCall.leadId]: selectedStatus,
      }));
    }

    if (selectedLeadForCall?.stage === "Lead") {
      setMarkedCallLeadIds((state) => {
        if (state.includes(selectedLeadForCall.leadId)) return state;
        return [...state, selectedLeadForCall.leadId];
      });
    }

    if (leadId) {
      setDismissedFollowUpLeadIds((state) => {
        if (followUpDateTime) {
          return state.filter((id) => id !== leadId);
        }

        if (state.includes(leadId)) {
          return state;
        }

        return [...state, leadId];
      });

      setFollowUpScheduleByLeadId((state) => {
        const nextState = { ...state };

        if (followUpDateTime) {
          nextState[leadId] = followUpDateTime;
        } else {
          delete nextState[leadId];
        }

        return nextState;
      });
    }
  };

  const renderCallActionModal = () => {
    if (!callActionOpen || !selectedLeadForCall) {
      return null;
    }

    const ModalComponent =
      selectedLeadForCall.stage === "Lead"
        ? LeadCallActionModal
        : selectedLeadForCall.stage === "Visit Scheduled"
          ? VisitSCallActionModal
          : selectedLeadForCall.stage === "Visit Completed"
            ? VisitCCallaActionModal
            : selectedLeadForCall.stage === "Form Issued"
              ? FormIssuedCallActionModal
              : selectedLeadForCall.stage === "Unsuccessful"
                ? UnsuccessfulCallAction
                : RestrictedCallActionModal;

    return (
      <ModalComponent
        lead={selectedLeadForCall}
        sectionName={selectedLeadForCall.stage}
        onClose={closeCallActionModal}
        onSubmit={handleCallActionSubmit}
      />
    );
  };

  if (!loggedIn) {
    return (
      <Login
        onLogin={() => {
          setLoggedIn(true);
          setActiveView("pipeline");
          setPasswordPromptOpen(true);
        }}
      />
    );
  }

  if (passwordPromptOpen) {
    return (
      <ChangePassword
        onComplete={() => {
          setPasswordPromptOpen(false);
          setWelcomeOpen(true);
        }}
        onSkip={() => {
          setPasswordPromptOpen(false);
          setWelcomeOpen(true);
        }}
      />
    );
  }

  if (welcomeOpen) {
    return (
      <main
        className="grid min-h-screen place-items-center bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_72%)] px-5 py-8"
        aria-label="Welcome page"
      >
        <section className="h-auto max-h-[92vh] w-[min(1240px,96vw)] overflow-auto rounded-[14px] border border-blue-100 bg-white p-[22px] shadow-[0_12px_36px_rgba(0,0,0,0.14)]">
          <div className="grid min-h-full items-center justify-items-center gap-4 [grid-template-columns:850px_1fr] max-[900px]:grid-cols-1">
            <div className="flex flex-col items-center gap-3">
              <div className="h-[450px] w-[850px] overflow-hidden rounded-[14px] border border-blue-100 bg-[linear-gradient(135deg,#eff6ff,#ffffff)] shadow-[0_10px_24px_rgba(37,99,235,0.14)] max-[900px]:h-auto max-[900px]:w-full">
                <video
                  className="block h-full w-full object-cover"
                  src={IntroVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            </div>

            <div className="flex max-w-[340px] flex-col items-center gap-3.5 px-2 text-center">
              <h1 className="m-0 text-[clamp(40px,4.6vw,62px)] font-extrabold leading-[0.95] tracking-[-0.04em] text-slate-900">
                Raj Vedanta School
              </h1>
              <p className="m-0 max-w-[26ch] text-lg font-semibold text-[var(--body)]">
                Your journey with our institution begins here.
              </p>
              <blockquote className="m-0 max-w-[30ch] rounded-lg border-l-4 border-[var(--primary)] bg-[#f8fbff] px-[18px] py-4 text-[15px] leading-[1.65] text-blue-900">
                Education is the most powerful tool which you can use to change
                the world.
              </blockquote>
              <button
                className="mt-1 min-h-11 min-w-[220px] cursor-pointer rounded-md border-0 bg-[var(--primary)] px-4 text-sm font-semibold text-white hover:bg-[var(--primary-dark)]"
                type="button"
                onClick={() => setWelcomeOpen(false)}
              >
                Continue to CRM
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (activeView === "pipeline") {
    return (
      <>
        <AppShell
          activeView="pipeline"
          setActiveView={setActiveView}
          breadcrumb="Assigned Data"
          onFabClick={() => {
            setLeadEntryMode("default");
            setActiveView("new-lead");
          }}
        >
          <AssignedDataView
            markedCallLeadIds={markedCallLeadIds}
            leadStageById={leadStageById}
            onCallAction={openCallActionModal}
          />
        </AppShell>
        {renderCallActionModal()}
      </>
    );
  }

  if (activeView === "table") {
    return (
      <AppShell
        activeView="table"
        setActiveView={setActiveView}
        breadcrumb="My Leads · Table View"
        onFabClick={() => {
          setLeadEntryMode("default");
          setActiveView("new-lead");
        }}
      >
        <TableView onOpenLead={() => setActiveView("lead-detail")} />
      </AppShell>
    );
  }

  if (activeView === "new-lead") {
    return (
      <AppShell
        activeView="new-lead"
        setActiveView={setActiveView}
        breadcrumb="Assigned Data · Add New Lead"
        showFab={false}
      >
        <NewLeadView
          mode={leadEntryMode}
          setMode={setLeadEntryMode}
          onClose={() => setActiveView("pipeline")}
        />
      </AppShell>
    );
  }

  if (activeView === "reports") {
    return (
      <AppShell
        activeView="reports"
        setActiveView={setActiveView}
        breadcrumb="My Reports · Priya Sharma"
        onFabClick={() => {
          setLeadEntryMode("default");
          setActiveView("new-lead");
        }}
      >
        <ReportsView
          onOpenMobileDashboard={() => setActiveView("mobile-dashboard")}
          onOpenMobileKanban={() => setActiveView("mobile-kanban")}
        />
      </AppShell>
    );
  }

  if (activeView === "follow-ups") {
    return (
      <>
        <AppShell
          activeView="follow-ups"
          setActiveView={setActiveView}
          breadcrumb="Follow-Up's"
          onFabClick={() => {
            setLeadEntryMode("default");
            setActiveView("new-lead");
          }}
        >
          <FollowUpsWindowView
            leadStageById={leadStageById}
            followUpScheduleByLeadId={followUpScheduleByLeadId}
            dismissedFollowUpLeadIds={dismissedFollowUpLeadIds}
            onCallAction={openCallActionModal}
          />
        </AppShell>
        {renderCallActionModal()}
      </>
    );
  }

  if (activeView === "mobile-dashboard") {
    return (
      <AppShell
        activeView="reports"
        setActiveView={setActiveView}
        breadcrumb="Mobile Preview · Dashboard"
      >
        <MobileDashboardView />
      </AppShell>
    );
  }

  if (activeView === "mobile-kanban") {
    return (
      <AppShell
        activeView="reports"
        setActiveView={setActiveView}
        breadcrumb="Mobile Preview · Assigned Data"
      >
        <MobileKanbanView />
      </AppShell>
    );
  }

  if (activeView === "lead-detail") {
    return (
      <AppShell
        activeView="table"
        setActiveView={setActiveView}
        breadcrumb="My Leads > Aarav Mehta · LM-0247"
        onFabClick={() => {
          setLeadEntryMode("default");
          setActiveView("new-lead");
        }}
      >
        <LeadDetailView
          followupOpen={followupOpen}
          onOpenFollowup={() => setFollowupOpen(true)}
          onCloseFollowup={() => setFollowupOpen(false)}
          visitOpen={visitOpen}
          onOpenVisit={() => setVisitOpen(true)}
          onCloseVisit={() => setVisitOpen(false)}
          convertOpen={convertOpen}
          onOpenConvert={() => setConvertOpen(true)}
          onCloseConvert={() => setConvertOpen(false)}
          lostOpen={lostOpen}
          onOpenLost={() => setLostOpen(true)}
          onCloseLost={() => setLostOpen(false)}
        />
      </AppShell>
    );
  }

  return (
    <AppShell
      activeView="dashboard"
      setActiveView={setActiveView}
      breadcrumb="Dashboard"
      onFabClick={() => {
        setLeadEntryMode("default");
        setActiveView("new-lead");
      }}
    >
      <DashboardView formattedDate={formattedDate} />
    </AppShell>
  );
}

export default App;
