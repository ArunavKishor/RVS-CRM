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
import { NotificationsPanel } from "../components/layout/NotificationsPanel.jsx";
import {
  FilterSelect,
  FormField,
  ToggleView,
} from "../components/common/Controls.jsx";
import { activities, followUps, stats, tableRows } from "../config/crmData.jsx";
import IntroVideo from "../assets/intro.mp4";
import RVSLogo from "../assets/RVSLogo.png";
import { AssignedDataView } from "./assigned-data/AssignedDataView.jsx";
import { LeadCallActionModal } from "./assigned-data/components/LeadCallActionModal.jsx";
import { RestrictedCallActionModal } from "./assigned-data/components/nurturingcallAction.jsx";
import { stageTabs } from "./assigned-data/config/stageConfig.jsx";

function DashboardView({
  formattedDate,
  notificationsOpen,
  onCloseNotifications,
}) {
  return (
    <div className="dashboard-home-wrap">
      <main className="content-area">
        <section className="greeting">
          <h1>Good afternoon, Arunav</h1>
          <p>{formattedDate}</p>
        </section>

        <section className="stat-grid" aria-label="Lead statistics">
          {stats.map((card) => (
            <article key={card.title} className={`stat-card ${card.tone}`}>
              <h3>{card.title}</h3>
              <p className="stat-number">{card.value}</p>
              <p className="stat-note">{card.note}</p>
              <div className="sparkline" aria-hidden="true" />
            </article>
          ))}
        </section>

        <section className="split-grid">
          <article className="panel-card" aria-label="Today follow-ups">
            <div className="panel-head">
              <h2>Today&apos;s Follow-ups</h2>
              <span className="count-pill">{followUps.length}</span>
            </div>

            {followUps.map((item) => (
              <div className="follow-row" key={`${item.name}-${item.time}`}>
                <div className="avatar" aria-hidden="true">
                  {item.name.slice(0, 1)}
                </div>
                <div className="follow-meta">
                  <strong>{item.name}</strong>
                  <span>{item.detail}</span>
                </div>
                <div className="follow-right">
                  <time>{item.time}</time>
                  <span className={`status-chip ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </article>

          <article className="panel-card" aria-label="Recent activities">
            <div className="panel-head">
              <h2>Recent Activity</h2>
            </div>

            <ul className="timeline">
              {activities.map((item, index) => (
                <li key={item}>
                  <time>{`${9 + index}:00 AM`}</time>
                  <span className="line-dot" aria-hidden="true">
                    <Clock size={12} weight="bold" />
                  </span>
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </main>

      {notificationsOpen ? (
        <NotificationsPanel onClose={onCloseNotifications} />
      ) : null}
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
    <main className="view-content">
      <section className="filter-bar">
        <div className="filter-left">
          <FilterSelect label="Grade: All Grades" />
          <FilterSelect label="Source: All Sources" />
          <FilterSelect label="Status: All Statuses" />
          <FilterSelect label="This Month" />
        </div>
      </section>

      <section className="filter-bar">
        <div className="filter-right">
          <ToggleView active="table" />
          <button className="outline-btn" type="button">
            <DownloadSimple size={16} weight="regular" /> Export to Excel
          </button>
        </div>
      </section>

      {selectedCount > 0 ? (
        <section className="selection-bar" aria-label="Bulk actions">
          <p>{selectedCount} leads selected</p>
          <div className="selection-actions">
            <button type="button">Change Status</button>
            <button type="button">Export Selected</button>
          </div>
        </section>
      ) : null}

      <section className="table-shell" aria-label="My leads table">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>
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
                  <th key={header}>
                    <span>{header}</span>
                    <ArrowsDownUp size={12} weight="regular" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedRows.map((row) => (
                <tr
                  key={row.leadId}
                  className={row.selected ? "selected-row" : ""}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={row.selected}
                      readOnly
                      aria-label={`Select ${row.leadId}`}
                    />
                  </td>
                  <td>{row.leadId}</td>
                  <td>
                    <button
                      className="name-link"
                      type="button"
                      onClick={onOpenLead}
                    >
                      {row.student}
                    </button>
                  </td>
                  <td>{row.parent}</td>
                  <td>{row.contact}</td>
                  <td>{row.grade}</td>
                  <td>
                    <span className={`chip ${row.sourceTone}`}>
                      {row.source}
                    </span>
                  </td>
                  <td>
                    <span className={`chip ${row.statusTone}`}>
                      {row.status}
                    </span>
                  </td>
                  <td>{row.enquiry}</td>
                  <td>{row.followUp}</td>
                  <td>
                    <span
                      className={
                        row.overdue ? "next-action overdue" : "next-action"
                      }
                    >
                      {row.nextAction}
                      {row.overdue ? (
                        <span className="overdue-dot" aria-hidden="true" />
                      ) : null}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="table-footer">
          <p>
            {`Showing ${tableRows.length ? startIndex + 1 : 0}-${Math.min(startIndex + rowsPerPage, tableRows.length)} of ${tableRows.length} leads`}
          </p>
          <div className="table-pagination">
            <button
              type="button"
              aria-label="Previous page"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPageSafe === 1}
            >
              ‹
            </button>
            <button
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
            <div className="mode-grid" role="group" aria-label="Follow-up mode">
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
  );
}

function ScheduleVisitModal({ onClose }) {
  return (
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
              <CalendarDots size={18} weight="regular" /> Schedule Campus Visit
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
              <input type="checkbox" checked readOnly /> Send SMS reminder 1 day
              before
            </label>
            <label>
              <input type="checkbox" checked readOnly /> Send email reminder 1
              day before
            </label>
          </div>

          <div className="info-callout">
            <p>
              <CheckCircle size={15} weight="regular" /> The parent will receive
              an auto-confirmation SMS and email with visit details and campus
              directions.
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
  );
}

function ConvertLeadModal({ onClose }) {
  return (
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
  );
}

function LostLeadModal({ onClose }) {
  return (
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
              reactivated in the next admission cycle from the Reports section.
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
    <main className="view-content reports-page">
      <section className="filter-bar">
        <div className="filter-left">
          <FilterSelect label="Admission Cycle: 2026-27" />
          <FilterSelect label="01 Apr - 13 Apr 2026" />
          <FilterSelect label="Grade: All" />
        </div>
        <div className="filter-right">
          <button className="outline-btn" type="button">
            <DownloadSimple size={16} weight="regular" /> Export PDF
          </button>
        </div>
      </section>

      <section className="report-kpi-grid">
        <article className="panel-card">
          <h4>My Total Leads</h4>
          <p className="report-big">47</p>
          <span className="trend-up">+12 this week ↗</span>
        </article>
        <article className="panel-card">
          <h4>Conversion Rate</h4>
          <p className="report-big green">38.2%</p>
          <span className="trend-up">vs 31% last cycle ↗</span>
        </article>
        <article className="panel-card">
          <h4>Avg Days to Convert</h4>
          <p className="report-big blue">12.4</p>
          <span>Target: ≤14 days</span>
        </article>
        <article className="panel-card">
          <h4>Overdue Follow-ups</h4>
          <p className="report-big amber">7</p>
          <span>3 critical (&gt;5 days)</span>
        </article>
      </section>

      <section className="report-two-col">
        <article className="panel-card">
          <h3>My Lead Funnel</h3>
          <div className="funnel-bars">
            {funnel.map((bar, index) => (
              <div key={bar.label} className="funnel-row">
                <span>{bar.label}</span>
                <div className="funnel-track">
                  <div
                    className="funnel-fill"
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

        <article className="panel-card">
          <h3>My Leads by Source</h3>
          <div className="donut-wrap">
            <div className="donut-chart">
              <span>47</span>
            </div>
            <ul className="donut-legend">
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

      <article className="panel-card">
        <h3>Follow-up Activity (Last 4 Weeks)</h3>
        <div className="weekly-chart">
          {["Week 1", "Week 2", "Week 3", "Week 4"].map((week, i) => (
            <div key={week} className="week-group">
              <div className="bar-stack">
                <span
                  style={{ height: `${44 + i * 10}px` }}
                  className="bar call"
                />
                <span
                  style={{ height: `${30 + i * 10}px` }}
                  className="bar wa"
                />
                <span
                  style={{ height: `${20 + i * 8}px` }}
                  className="bar visit"
                />
              </div>
              <small>{week}</small>
            </div>
          ))}
        </div>
      </article>

      <article className="panel-card">
        <h3>My Leads by Grade</h3>
        <div className="grade-chart">
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
            <div key={grade} className="grade-col">
              <div className="stack">
                <span
                  className="seg1"
                  style={{ height: `${10 + (i % 5) * 4}px` }}
                />
                <span
                  className="seg2"
                  style={{ height: `${8 + (i % 4) * 3}px` }}
                />
                <span
                  className="seg3"
                  style={{ height: `${6 + (i % 3) * 3}px` }}
                />
              </div>
              <small>{grade}</small>
            </div>
          ))}
        </div>
      </article>

      <section className="mobile-preview-actions">
        <button
          className="outline-btn"
          type="button"
          onClick={onOpenMobileDashboard}
        >
          Open Mobile Dashboard
        </button>
        <button
          className="outline-btn"
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
    <main className="mobile-view-page">
      <section className="phone-frame">
        <header className="mobile-topbar">
          <ListBullets size={20} weight="regular" />
          <strong>Raj Vedanta</strong>
          <div className="mobile-icons">
            <Bell size={18} weight="regular" />
            <UserCircle size={28} weight="regular" />
          </div>
        </header>
        <div className="mobile-content">
          <h3>Good afternoon, Priya</h3>
          <p>13 April 2026</p>
          <div className="mobile-stats">
            {stats.map((card) => (
              <article key={card.title} className={`mobile-stat ${card.tone}`}>
                <h4>{card.title}</h4>
                <strong>{card.value}</strong>
              </article>
            ))}
          </div>
          <article className="mobile-card">
            <h4>Today's Follow-ups</h4>
            <p>Rohit Sharma · Grade 5 · 10:30 AM</p>
            <p>Ananya Gupta · Grade 3 · 11:45 AM</p>
            <p>Vihaan Mehta · Nursery · 01:00 PM</p>
            <p>Saanvi Iyer · Grade 7 · 03:10 PM</p>
          </article>
          <article className="mobile-card">
            <h4>Recent Activity</h4>
            <p>Marked Ananya as Visit Completed</p>
            <p>Sent brochure to Rohit's parent</p>
            <p>Added Kavya Verma lead</p>
            <p>Updated Kabir Singh notes</p>
          </article>
        </div>
        <nav className="mobile-nav">
          <span className="active">Home</span>
          <span>Pipeline</span>
          <span>Leads</span>
          <span>Reports</span>
        </nav>
        <button className="mobile-fab" type="button">
          <Plus size={20} weight="regular" />
        </button>
      </section>
    </main>
  );
}

function MobileKanbanView() {
  return (
    <main className="mobile-view-page">
      <section className="phone-frame">
        <header className="mobile-topbar">
          <CaretDown size={18} weight="regular" />
           <strong>Assigned Data</strong>
          <ArrowsDownUp size={18} weight="regular" />
        </header>
        <div className="mobile-kanban-scroll">
          <article className="mobile-column">
            <header>
              <span
                className="head-dot"
                style={{ backgroundColor: "#0D9488" }}
              />{" "}
              Nurturing <span className="head-count">15</span>
            </header>
            <div className="lead-card" style={{ borderTopColor: "#0D9488" }}>
              <h4>Meera Desai</h4>
              <p>Grade 7 · Instagram</p>
              <div className="lead-meta-row">
                <span>📅 10 Apr</span>
                <span className="overdue-dot" />
              </div>
            </div>
            <div className="lead-card" style={{ borderTopColor: "#0D9488" }}>
              <h4>Ishaan Khan</h4>
              <p>Grade 5 · Walk-in</p>
              <div className="lead-meta-row">
                <span>📅 12 Apr</span>
              </div>
            </div>
            <div className="lead-card" style={{ borderTopColor: "#0D9488" }}>
              <h4>Sneha Gupta</h4>
              <p>Grade 8 · Google Ads</p>
              <div className="lead-meta-row">
                <span>📅 13 Apr</span>
              </div>
            </div>
            <div className="lead-card" style={{ borderTopColor: "#0D9488" }}>
              <h4>Ritu Solanki</h4>
              <p>Grade 2 · Reference</p>
              <div className="lead-meta-row">
                <span>📅 08 Apr</span>
                <span className="overdue-dot" />
              </div>
            </div>
          </article>
          <div className="mobile-column-peek" />
        </div>
        <div className="swipe-dots">
          <span />
          <span />
          <span className="active" />
          <span />
          <span />
          <span />
          <span />
        </div>
        <nav className="mobile-nav">
          <span>Home</span>
          <span className="active">Assigned</span>
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
                  Aarav Mehta · Grade 5 · Status: Nurturing · Counsellor: Priya
                  Sharma
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

          <FormField label="Campaign Name" hint="Auto-filled for digital leads">
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
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const [passwordPromptOpen, setPasswordPromptOpen] = useState(false);
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [leadEntryMode, setLeadEntryMode] = useState("default");
  const [followupOpen, setFollowupOpen] = useState(false);
  const [visitOpen, setVisitOpen] = useState(false);
  const [convertOpen, setConvertOpen] = useState(false);
  const [lostOpen, setLostOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(true);
  const [callActionOpen, setCallActionOpen] = useState(false);
  const [selectedLeadForCall, setSelectedLeadForCall] = useState(null);
  const [markedCallLeadIds, setMarkedCallLeadIds] = useState([]);
  const [leadStageById, setLeadStageById] = useState({});

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
    const resetScroll = () => {
      window.scrollTo(0, 0);

      document
        .querySelectorAll(
          ".app-panel, .content-area, .view-content, .assigned-table-wrap, .table-shell",
        )
        .forEach((element) => {
          element.scrollTop = 0;
        });
    };

    requestAnimationFrame(resetScroll);
  }, [activeView]);

  const passwordRules = [
    {
      label: "At least 8 characters",
      valid: passwordForm.newPassword.length >= 8,
    },
    {
      label: "At least 1 uppercase letter",
      valid: /[A-Z]/.test(passwordForm.newPassword),
    },
    {
      label: "At least 1 lowercase letter",
      valid: /[a-z]/.test(passwordForm.newPassword),
    },
    {
      label: "At least 1 number",
      valid: /\d/.test(passwordForm.newPassword),
    },
    {
      label: "At least 1 special character",
      valid: /[^A-Za-z0-9]/.test(passwordForm.newPassword),
    },
  ];

  const handlePasswordComplete = () => {
    setPasswordError("");
    setPasswordPromptOpen(false);
    setWelcomeOpen(true);
  };

  if (!loggedIn) {
    return (
      <main className="login-page">
        <section className="login-card" aria-label="Counsellor login panel">
          <div className="logo-box" aria-hidden="true">
            RV
          </div>

          <header className="login-title-wrap">
            <h1>Raj Vedanta Admissions</h1>
            <p>Counsellor Login</p>
          </header>

          <hr />

          <form
            className="login-form"
            onSubmit={(event) => {
              event.preventDefault();
              setLoggedIn(true);
              setActiveView("pipeline");
              setPasswordPromptOpen(true);
            }}
          >
            <label htmlFor="email">Email Address / ईमेल</label>
            <div className="input-wrap">
              <EnvelopeSimple size={18} weight="regular" />
              <input
                id="email"
                type="email"
                placeholder="counsellor@rajvedanta.edu.in"
                required
              />
            </div>

            <label htmlFor="password">Password</label>
            <div className="input-wrap">
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                required
              />
              <button
                className="icon-btn"
                type="button"
                aria-label="Toggle password visibility"
              >
                <EyeSlash size={18} weight="regular" />
              </button>
            </div>

            <button className="primary-btn" type="submit">
              Log In
            </button>
          </form>

          <button className="link-btn" type="button">
            Forgot Password?
          </button>
        </section>

        <p className="login-footer">Raj Vedanta School</p>
      </main>
    );
  }

  if (passwordPromptOpen) {
    return (
      <main className="password-page" aria-label="Change password page">
        <section className="password-modal" role="dialog" aria-modal="true">
          <header className="followup-header password-header">
            <img src={RVSLogo} alt="RVSLogo" className="password-logo" />
            <div>
              <h2>
                <LockSimple size={20} weight="regular" /> Change Your Password
              </h2>
              <p>
                For account safety, update your password before you continue.
              </p>
            </div>
          </header>

          <form
            className="password-body"
            onSubmit={(event) => {
              event.preventDefault();
              const allRulesValid = passwordRules.every((rule) => rule.valid);

              if (!allRulesValid) {
                setPasswordError(
                  "New password is weak. Please satisfy all strength rules.",
                );
                return;
              }

              if (passwordForm.newPassword !== passwordForm.confirmPassword) {
                setPasswordError(
                  "New password and confirm password do not match.",
                );
                return;
              }

              if (passwordForm.oldPassword === passwordForm.newPassword) {
                setPasswordError(
                  "New password must be different from your old password.",
                );
                return;
              }

              handlePasswordComplete();
            }}
          >
            <label htmlFor="old-password">Old Password</label>
            <div className="input-wrap">
              <input
                id="old-password"
                type="password"
                placeholder="Enter old password"
                value={passwordForm.oldPassword}
                onChange={(event) => {
                  setPasswordForm((state) => ({
                    ...state,
                    oldPassword: event.target.value,
                  }));
                  setPasswordError("");
                }}
                required
              />
            </div>

            <label htmlFor="new-password">New Password</label>
            <div className="input-wrap">
              <input
                id="new-password"
                type="password"
                placeholder="Create new password"
                value={passwordForm.newPassword}
                onChange={(event) => {
                  setPasswordForm((state) => ({
                    ...state,
                    newPassword: event.target.value,
                  }));
                  setPasswordError("");
                }}
                required
              />
            </div>

            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="input-wrap">
              <input
                id="confirm-password"
                type="password"
                placeholder="Re-enter new password"
                value={passwordForm.confirmPassword}
                onChange={(event) => {
                  setPasswordForm((state) => ({
                    ...state,
                    confirmPassword: event.target.value,
                  }));
                  setPasswordError("");
                }}
                required
              />
            </div>

            <section
              className="password-rules"
              aria-label="Password strength rules"
            >
              <h3>Password must include:</h3>
              <ul>
                {passwordRules.map((rule) => (
                  <li
                    key={rule.label}
                    className={rule.valid ? "rule-item valid" : "rule-item"}
                  >
                    {rule.valid ? (
                      <Check size={14} weight="bold" aria-hidden="true" />
                    ) : (
                      <X size={14} weight="bold" aria-hidden="true" />
                    )}
                    {rule.label}
                  </li>
                ))}
              </ul>
            </section>

            {passwordError ? (
              <div className="callout danger">
                <p>
                  <WarningCircle size={16} weight="regular" /> {passwordError}
                </p>
              </div>
            ) : null}

            <footer className="password-footer">
              <button
                className="skip-btn"
                type="button"
                onClick={handlePasswordComplete}
              >
                Skip for Now
              </button>
              <button className="primary-btn" type="submit">
                Update Password
              </button>
            </footer>
          </form>
        </section>
      </main>
    );
  }

  if (welcomeOpen) {
    return (
      <main className="welcome-page" aria-label="Welcome page">
        <section className="welcome-card">
          <div className="welcome-hero">
            <div className="welcome-media-panel">
              <div className="welcome-media-frame">
                <video
                  className="welcome-video"
                  src={IntroVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            </div>

            <div className="welcome-copy-panel">
              <h1>Raj Vedanta School</h1>
              <p>Your journey with our institution begins here.</p>
              <blockquote>
                Education is the most powerful tool which you can use to change
                the world.
              </blockquote>
              <button
                className="primary-btn welcome-btn"
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
          onBellClick={() => {
            setNotificationsOpen(true);
            setActiveView("dashboard");
          }}
          onFabClick={() => {
            setLeadEntryMode("default");
            setActiveView("new-lead");
          }}
        >
          <AssignedDataView
            markedCallLeadIds={markedCallLeadIds}
            leadStageById={leadStageById}
            onCallAction={(lead) => {
              setSelectedLeadForCall(lead);
              setCallActionOpen(true);
            }}
          />
        </AppShell>
        {callActionOpen && selectedLeadForCall ? (
          selectedLeadForCall.stage === "Lead" ? (
            <LeadCallActionModal
              lead={selectedLeadForCall}
              onClose={() => {
                setCallActionOpen(false);
                setSelectedLeadForCall(null);
              }}
              onSubmit={(callData) => {
                console.log("Call action submitted:", callData);
                const selectedStatus = callData.status;
                const canMoveStage = stageTabs.includes(selectedStatus);

                if (canMoveStage && selectedLeadForCall?.leadId) {
                  setLeadStageById((state) => ({
                    ...state,
                    [selectedLeadForCall.leadId]: selectedStatus,
                  }));
                }

                if (selectedLeadForCall?.stage === "Lead") {
                  setMarkedCallLeadIds((state) => {
                    if (state.includes(selectedLeadForCall.leadId))
                      return state;
                    return [...state, selectedLeadForCall.leadId];
                  });
                }
              }}
            />
          ) : (
            <RestrictedCallActionModal
              lead={selectedLeadForCall}
              onClose={() => {
                setCallActionOpen(false);
                setSelectedLeadForCall(null);
              }}
              onSubmit={(callData) => {
                console.log("Call action submitted:", callData);
                const selectedStatus = callData.status;
                const canMoveStage = stageTabs.includes(selectedStatus);

                if (canMoveStage && selectedLeadForCall?.leadId) {
                  setLeadStageById((state) => ({
                    ...state,
                    [selectedLeadForCall.leadId]: selectedStatus,
                  }));
                }

                if (selectedLeadForCall?.stage === "Lead") {
                  setMarkedCallLeadIds((state) => {
                    if (state.includes(selectedLeadForCall.leadId))
                      return state;
                    return [...state, selectedLeadForCall.leadId];
                  });
                }
              }}
            />
          )
        ) : null}
      </>
    );
  }

  if (activeView === "table") {
    return (
      <AppShell
        activeView="table"
        setActiveView={setActiveView}
        breadcrumb="My Leads · Table View"
        onBellClick={() => {
          setNotificationsOpen(true);
          setActiveView("dashboard");
        }}
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
        onBellClick={() => {
          setNotificationsOpen(true);
          setActiveView("dashboard");
        }}
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
        onBellClick={() => {
          setNotificationsOpen(true);
          setActiveView("dashboard");
        }}
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

  if (activeView === "mobile-dashboard") {
    return (
      <AppShell
        activeView="reports"
        setActiveView={setActiveView}
        breadcrumb="Mobile Preview · Dashboard"
        onBellClick={() => {
          setNotificationsOpen(true);
          setActiveView("dashboard");
        }}
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
        onBellClick={() => {
          setNotificationsOpen(true);
          setActiveView("dashboard");
        }}
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
        onBellClick={() => {
          setNotificationsOpen(true);
          setActiveView("dashboard");
        }}
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
      onBellClick={() => setNotificationsOpen((state) => !state)}
      onFabClick={() => {
        setLeadEntryMode("default");
        setActiveView("new-lead");
      }}
    >
      <DashboardView
        formattedDate={formattedDate}
        notificationsOpen={notificationsOpen}
        onCloseNotifications={() => setNotificationsOpen(false)}
      />
    </AppShell>
  );
}

export default App;
