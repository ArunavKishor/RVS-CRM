import { useState } from "react";
import {
  CalendarDots,
  CaretDown,
  ChatCircleDots,
  Check,
  CheckCircle,
  Clock,
  GridFour,
  Kanban,
  Phone,
  PhoneCall,
  UserCircle,
  X,
} from "@phosphor-icons/react";
import { FormField } from "../../../components/common/Controls.jsx";
import { LegacyTailwindMapper } from "../../../components/common/LegacyTailwindMapper.jsx";
import { LeadLifecycleTrail } from "./LifeCycle.jsx";

const callTags = [
  "Visit completed",
  "Parent cancelled visit",
  "Call not connected",
  "Unable to come",
  "Not interested",
  "Already joined",
  "Other",
];

const callStatuses = [
  "Visit Completed",
  "Unsuccessful",
  "Dead Leads",
  "Nurturing",
];

const autoStatusByTag = {
  "Visit completed": "Visit Completed",
  "Parent cancelled visit": "Unsuccessful",
  "Call not connected": "Unsuccessful",
  "Unable to come": "Nurturing",
  "Not interested": "Dead Leads",
  "Already joined": "Dead Leads",
};

const mockCallLogs = [
  {
    id: 1,
    date: "13/04/2026",
    time: "02:30 PM",
    status: "Visit Completed",
    tag: "Visit completed",
    duration: "08 mins 10 secs",
    remarks:
      "Parent confirmed student attended visit. Shared next admission steps and document checklist.",
    templateSent: "Visit Follow-up",
  },
];

export function VisitSCallActionModal({
  onClose,
  lead,
  onSubmit,
  sectionName,
}) {
  const [activeTab, setActiveTab] = useState("student-info");
  const [callForm, setCallForm] = useState({
    tag: "",
    status: "",
    followUpDate: "",
    followUpTime: "",
    remarks: "",
  });
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [sortOrder, setSortOrder] = useState("latest");
  const [errors, setErrors] = useState({});
  const statusLocked = Boolean(autoStatusByTag[callForm.tag]);
  const selectedStatus = autoStatusByTag[callForm.tag] || callForm.status;

  const selectedFollowUpLabel =
    callForm.followUpDate && callForm.followUpTime
      ? new Date(
          `${callForm.followUpDate}T${callForm.followUpTime}`,
        ).toLocaleString("en-IN", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })
      : "Select a date and time";

  const sectionTone =
    sectionName === "Lead"
      ? "lead"
      : sectionName === "Nurturing"
        ? "nurturing"
        : sectionName === "Visit Scheduled"
          ? "visit"
          : "default";

  const handleTagSelect = (tag) => {
    const autoStatus = autoStatusByTag[tag] ?? "";

    setCallForm((state) => ({
      ...state,
      tag,
      status: autoStatus,
    }));

    setErrors((state) => ({
      ...state,
      tag: "",
      status: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!callForm.tag.trim()) newErrors.tag = "Tag is required";
    if (!selectedStatus.trim()) newErrors.status = "Status is required";
    if (!callForm.remarks.trim()) newErrors.remarks = "Remarks are required";
    return newErrors;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      ...callForm,
      status: selectedStatus,
      followUpDateTime:
        callForm.followUpDate && callForm.followUpTime
          ? `${callForm.followUpDate}T${callForm.followUpTime}`
          : "",
    });
    onClose();
  };

  const sortedLogs =
    sortOrder === "latest"
      ? [...mockCallLogs].sort((a, b) => new Date(b.date) - new Date(a.date))
      : [...mockCallLogs].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <LegacyTailwindMapper>
      <div
        className="screen-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Call Action"
      >
        <section className="call-action-modal">
          <header className="call-action-header">
            <div className="call-header-left">
              <div className="call-header-icon">
                <PhoneCall size={24} weight="bold" />
              </div>
              <div>
                <h2>Call Action</h2>
                <p>
                  {lead.student} · {lead.grade} · {lead.source}
                </p>
              </div>
              <div className={`call-header-section section-${sectionTone}`}>
                {sectionName ? `${sectionName} Section` : "Assigned Data"}
              </div>
            </div>

            <LeadLifecycleTrail
              studentName={lead?.student}
              sectionName={sectionName}
            />

            <button
              type="button"
              aria-label="Close call action modal"
              onClick={onClose}
              className="p-2 rounded-full text-white bg-red-500 font-extrabold
  hover:bg-gray-100 hover:text-gray-700 
  transition-all duration-200 
  active:scale-90"
            >
              <X size={20} weight="regular" />
            </button>
          </header>

          <div className="call-action-tabs grid grid-cols-2 gap-2">
            <button
              className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeTab === "student-info"
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              type="button"
              onClick={() => setActiveTab("student-info")}
            >
              <UserCircle size={16} weight="regular" />
              Student Information
            </button>
            <button
              className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeTab === "previous-logs"
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              type="button"
              onClick={() => setActiveTab("previous-logs")}
            >
              <Clock size={16} weight="regular" />
              Previous Logs
            </button>
          </div>

          {activeTab === "student-info" ? (
            <form
              className="call-action-body call-student-body"
              onSubmit={handleSave}
            >
              <section className="student-card-section">
                <div className="student-info-card">
                  <div className="student-avatar">
                    {lead.student.charAt(0).toUpperCase()}
                  </div>
                  <div className="student-details-wrapper">
                    <div className="student-summary-row">
                      <span className="student-summary-chip blue">
                        Active Lead
                      </span>
                      <span className="student-summary-chip neutral">
                        Assigned Data
                      </span>
                      <span className="student-summary-chip green">
                        Ready for call
                      </span>
                    </div>

                    <div className="detail-group primary-group">
                      <div className="detail-item">
                        <div className="detail-label-row">
                          <UserCircle size={14} weight="regular" />
                          <span className="detail-label">Student</span>
                        </div>
                        <span className="detail-value primary-value">
                          {lead.student}
                        </span>
                      </div>
                      <div className="detail-item">
                        <div className="detail-label-row">
                          <UserCircle size={14} weight="regular" />
                          <span className="detail-label">Parent/Guardian</span>
                        </div>
                        <span className="detail-value primary-value">
                          {lead.parent}
                        </span>
                      </div>
                    </div>

                    <div className="detail-divider" />

                    <div className="detail-group contact-group">
                      <div className="detail-item contact-item">
                        <div className="detail-label-row">
                          <Phone size={14} weight="regular" />
                          <span className="detail-label">Contact</span>
                        </div>
                        <span className="detail-value contact-value">
                          {lead.contact}
                        </span>
                      </div>
                    </div>

                    <div className="detail-divider" />

                    <div className="detail-group secondary-group">
                      <div className="detail-item">
                        <div className="detail-label-row">
                          <GridFour size={14} weight="regular" />
                          <span className="detail-label">Grade</span>
                        </div>
                        <span className="detail-value grade-badge">
                          {lead.grade}
                        </span>
                      </div>
                      <div className="detail-item">
                        <div className="detail-label-row">
                          <Kanban size={14} weight="regular" />
                          <span className="detail-label">Source</span>
                        </div>
                        <span className="detail-value source-badge">
                          {lead.source}
                        </span>
                      </div>
                    </div>

                    <div className="detail-divider" />

                    <div className="detail-group meta-group">
                      <div className="detail-item">
                        <div className="detail-label-row">
                          <CheckCircle size={14} weight="regular" />
                          <span className="detail-label">Lead ID</span>
                        </div>
                        <span className="detail-value lead-id">
                          {lead.leadId}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="action-steps-section">
                <h3 className="section-title">Action Items</h3>

                <FormField label="1. Select Call Outcome" required>
                  <div className="tag-dropdown-wrapper">
                    <button
                      type="button"
                      className="w-full flex items-center justify-between px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:border-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowTagDropdown(!showTagDropdown);
                      }}
                    >
                      <span className="dropdown-value">
                        {callForm.tag ? (
                          <>
                            <CheckCircle size={14} weight="regular" />
                            {callForm.tag}
                          </>
                        ) : (
                          <>
                            <CaretDown size={14} weight="regular" />
                            Select call outcome...
                          </>
                        )}
                      </span>
                    </button>
                    {showTagDropdown && (
                      <div className="tag-dropdown-menu">
                        {callTags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-150 ${
                              callForm.tag === tag
                                ? "bg-blue-600 text-white"
                                : "text-gray-700 hover:bg-blue-100"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleTagSelect(tag);
                              setShowTagDropdown(false);
                            }}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.tag && <p className="field-error">{errors.tag}</p>}
                </FormField>

                <FormField
                  label="2. Update Status"
                  hint={
                    statusLocked
                      ? `Auto-selected from call outcome: ${autoStatusByTag[callForm.tag]}. Change section 1 to unlock.`
                      : "Select one target tab for this lead."
                  }
                  required
                >
                  <div
                    className={
                      selectedStatus
                        ? "status-grid has-selection"
                        : "status-grid"
                    }
                  >
                    {callStatuses.map((status) => (
                      <button
                        key={status}
                        type="button"
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
${statusLocked ? "" : "hover:scale-105 active:scale-95"}
${
  statusLocked && selectedStatus !== status
    ? "bg-gray-200 text-gray-500"
    : status === "Visit Completed"
      ? selectedStatus === status
        ? "bg-green-600 text-white shadow"
        : "bg-green-100 text-green-600 hover:bg-green-200"
      : status === "Unsuccessful"
        ? selectedStatus === status
          ? "bg-red-600 text-white shadow"
          : "bg-red-100 text-red-600 hover:bg-red-200"
        : status === "Dead Leads"
          ? selectedStatus === status
            ? "bg-gray-700 text-white shadow"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          : status === "Nurturing"
            ? selectedStatus === status
              ? "bg-blue-600 text-white shadow"
              : "bg-blue-100 text-blue-600 hover:bg-blue-200"
            : ""
}
${statusLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
`}
                        disabled={statusLocked}
                        onClick={(e) => {
                          e.preventDefault();
                          if (statusLocked) return;
                          setCallForm((state) => ({ ...state, status }));
                          setErrors((state) => ({ ...state, status: "" }));
                        }}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                  {errors.status && (
                    <p className="field-error">{errors.status}</p>
                  )}
                </FormField>

                <FormField
                  label="3. Follow-up Reminder"
                  hint="Optional. Set a reminder if another follow-up call is needed."
                >
                  <div className="schedule-picker-card">
                    <div className="schedule-picker-grid">
                      <label className="schedule-field">
                        <span>Date</span>
                        <input
                          type="date"
                          value={callForm.followUpDate}
                          onChange={(e) => {
                            setCallForm((state) => ({
                              ...state,
                              followUpDate: e.target.value,
                            }));
                            setErrors((state) => ({
                              ...state,
                              followUpDate: "",
                            }));
                          }}
                          className="schedule-input"
                        />
                      </label>
                      <label className="schedule-field">
                        <span>Time</span>
                        <input
                          type="time"
                          value={callForm.followUpTime}
                          onChange={(e) => {
                            setCallForm((state) => ({
                              ...state,
                              followUpTime: e.target.value,
                            }));
                            setErrors((state) => ({
                              ...state,
                              followUpTime: "",
                            }));
                          }}
                          className="schedule-input"
                        />
                      </label>
                    </div>

                    <div className="followup-display modern">
                      <CalendarDots size={14} weight="regular" />
                      <span>
                        Scheduled reminder:{" "}
                        <strong>{selectedFollowUpLabel}</strong>
                      </span>
                    </div>
                  </div>
                  {(errors.followUpDate || errors.followUpTime) && (
                    <p className="field-error">
                      {errors.followUpDate || errors.followUpTime}
                    </p>
                  )}
                </FormField>

                <FormField label="4. Call Notes" required>
                  <textarea
                    className="call-remarks-textarea"
                    rows={3}
                    value={callForm.remarks}
                    onChange={(e) => {
                      setCallForm((state) => ({
                        ...state,
                        remarks: e.target.value,
                      }));
                      setErrors((state) => ({ ...state, remarks: "" }));
                    }}
                    placeholder="Enter key discussion points, objections, and next steps..."
                  />
                  {errors.remarks && (
                    <p className="field-error">{errors.remarks}</p>
                  )}
                </FormField>
              </div>

              <footer className="call-action-footer">
                <button
                  className="px-5 py-2.5 rounded-lg font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-all duration-200"
                  type="button"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
                  type="submit"
                >
                  <Check size={16} weight="bold" /> Save & Submit
                </button>
              </footer>
            </form>
          ) : (
            <div className="call-action-body call-logs-body">
              <div className="logs-header-section">
                <h3>Call History</h3>
                <div className="sort-selector">
                  <button
                    type="button"
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                      sortOrder === "latest"
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setSortOrder("latest")}
                  >
                    Latest
                  </button>
                  <button
                    type="button"
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                      sortOrder === "oldest"
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setSortOrder("oldest")}
                  >
                    Oldest
                  </button>
                </div>
              </div>

              <div className="logs-list-container">
                {sortedLogs.length > 0 ? (
                  sortedLogs.map((log) => (
                    <div key={log.id} className="log-card">
                      <div className="log-card-header">
                        <div className="log-time-section">
                          <span className="log-time">{log.time}</span>
                          <span className="log-date">{log.date}</span>
                        </div>
                        <div className="log-badges">
                          <span className="log-status-badge">{log.status}</span>
                          <span className="log-tag-badge">{log.tag}</span>
                        </div>
                      </div>
                      <div className="log-card-body">
                        <p className="log-remarks-text">{log.remarks}</p>
                        <div className="log-meta-row">
                          <span className="log-duration-badge">
                            <Clock size={13} weight="regular" /> {log.duration}
                          </span>
                          <span className="log-template-badge">
                            <ChatCircleDots size={13} weight="regular" />{" "}
                            {log.templateSent}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-logs-placeholder">
                    <Clock size={32} weight="regular" />
                    <p>No previous call logs</p>
                  </div>
                )}
              </div>

              <footer className="call-action-footer">
                <button className="cancel-btn" type="button" onClick={onClose}>
                  Close
                </button>
              </footer>
            </div>
          )}
        </section>
      </div>
    </LegacyTailwindMapper>
  );
}
