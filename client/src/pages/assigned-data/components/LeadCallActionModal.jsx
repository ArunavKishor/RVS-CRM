import { useEffect, useState } from "react";
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

const callTags = [
  "Call not connected",
  "Call not picked",
  "Switched off",
  "Out of range",
  "Interested",
  "Will think",
  "Not interested",
  "Already joined",
  "Not sure",
  "Out of town",
  "Distance issue",
  "Fees issue",
  "Unable to come",
  "Health issue",
  "Family issue",
  "After exam",
  "Other",
];

const callStatuses = [
  "Nurturing",
  "Visit Scheduled",
  "Unsuccessful",
  "Dead Leads",
];

const autoStatusByTag = {
  "Call not connected": "Unsuccessful",
  "Call not picked": "Unsuccessful",
  "Switched off": "Unsuccessful",
  "Out of range": "Unsuccessful",
  Interested: "Nurturing",
  "Will think": "Nurturing",
  "Not sure": "Nurturing",
  "Out of town": "Nurturing",
  "Health issue": "Nurturing",
  "Family issue": "Nurturing",
  "After exam": "Nurturing",
  "Distance issue": "Nurturing",
  "Fees issue": "Nurturing",
  "Unable to come": "Nurturing",
  "Not interested": "Dead Leads",
  "Already joined": "Dead Leads",
};

const mockCallLogs = [
  {
    id: 1,
    date: "13/04/2026",
    time: "02:30 PM",
    status: "Nurturing",
    tag: "Interested",
    duration: "12 mins 45 secs",
    remarks:
      "Spoke with father. Interested in visiting campus next week. Will call back on Monday to confirm date.",
    templateSent: "Welcome Message",
  },
];

export function LeadCallActionModal({ onClose, lead, onSubmit }) {
  const [activeTab, setActiveTab] = useState("student-info");
  const [callForm, setCallForm] = useState({
    tag: "",
    status: "",
    followUpDate: "",
    followUpTime: "",
    visitDate: "",
    visitTime: "",
    pickupNeed: "",
    pickupTime: "",
    pickupAddress: "",
    remarks: "",
  });
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [sortOrder, setSortOrder] = useState("latest");
  const [errors, setErrors] = useState({});
  const [pickupInfoSaved, setPickupInfoSaved] = useState(false);
  const statusLocked = Boolean(autoStatusByTag[callForm.tag]);
  const selectedStatus = autoStatusByTag[callForm.tag] || callForm.status;
  const isVisitStatusSelected = selectedStatus === "Visit Scheduled";
  const isVisitScheduled = Boolean(callForm.visitDate && callForm.visitTime);

  useEffect(() => {
    if (isVisitStatusSelected) return;

    setPickupInfoSaved(false);
    setCallForm((state) => {
      if (
        !state.visitDate &&
        !state.visitTime &&
        !state.pickupNeed &&
        !state.pickupTime &&
        !state.pickupAddress
      ) {
        return state;
      }

      return {
        ...state,
        visitDate: "",
        visitTime: "",
        pickupNeed: "",
        pickupTime: "",
        pickupAddress: "",
      };
    });
    setErrors((state) => ({
      ...state,
      pickupTime: "",
      pickupAddress: "",
    }));
  }, [isVisitStatusSelected]);

  useEffect(() => {
    if (isVisitScheduled) return;

    setPickupInfoSaved(false);
    setCallForm((state) => {
      if (!state.pickupNeed && !state.pickupTime && !state.pickupAddress) {
        return state;
      }

      return {
        ...state,
        pickupNeed: "",
        pickupTime: "",
        pickupAddress: "",
      };
    });
    setErrors((state) => ({
      ...state,
      pickupTime: "",
      pickupAddress: "",
    }));
  }, [isVisitScheduled]);

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
    if (callForm.tag === "Other" && !callForm.status.trim()) {
      newErrors.status = "Status is required";
    }
    if (isVisitStatusSelected) {
      if (!callForm.visitDate.trim()) {
        newErrors.visitDate = "Visit date is required";
      }
      if (!callForm.visitTime.trim()) {
        newErrors.visitTime = "Visit time is required";
      }
    }
    if (isVisitScheduled && callForm.pickupNeed === "yes") {
      if (!callForm.pickupTime.trim()) {
        newErrors.pickupTime = "Pickup time is required";
      }
      if (!callForm.pickupAddress.trim()) {
        newErrors.pickupAddress = "Pickup address is required";
      }
    }
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
      status: autoStatusByTag[callForm.tag] || callForm.status,
      followUpDateTime:
        callForm.followUpDate && callForm.followUpTime
          ? `${callForm.followUpDate}T${callForm.followUpTime}`
          : "",
      visitDateTime:
        callForm.visitDate && callForm.visitTime
          ? `${callForm.visitDate}T${callForm.visitTime}`
          : "",
      pickupRequired: callForm.pickupNeed === "yes",
      pickupTime: callForm.pickupTime,
      pickupAddress: callForm.pickupAddress,
    });
    onClose();
  };

  const handlePickupInfoSave = (e) => {
    e.preventDefault();

    const pickupErrors = {};
    if (!callForm.pickupTime.trim()) {
      pickupErrors.pickupTime = "Pickup time is required";
    }
    if (!callForm.pickupAddress.trim()) {
      pickupErrors.pickupAddress = "Pickup address is required";
    }

    if (Object.keys(pickupErrors).length > 0) {
      setPickupInfoSaved(false);
      setErrors((state) => ({
        ...state,
        ...pickupErrors,
      }));
      return;
    }

    setErrors((state) => ({
      ...state,
      pickupTime: "",
      pickupAddress: "",
    }));
    setPickupInfoSaved(true);
  };

  const sortedLogs =
    sortOrder === "latest"
      ? [...mockCallLogs].sort((a, b) => new Date(b.date) - new Date(a.date))
      : [...mockCallLogs].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
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
          </div>
          <button
            className="icon-btn call-close-btn"
            type="button"
            aria-label="Close call action modal"
            onClick={onClose}
          >
            <X size={20} weight="regular" />
          </button>
        </header>

        <div className="call-action-tabs">
          <button
            className={
              activeTab === "student-info" ? "tab-btn active" : "tab-btn"
            }
            type="button"
            onClick={() => setActiveTab("student-info")}
          >
            <UserCircle size={16} weight="regular" />
            Student Information
          </button>
          <button
            className={
              activeTab === "previous-logs" ? "tab-btn active" : "tab-btn"
            }
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
                    className="tag-dropdown-trigger"
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
                          className={
                            callForm.tag === tag
                              ? "dropdown-item active"
                              : "dropdown-item"
                          }
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
                    ? `Auto-selected from call outcome: ${autoStatusByTag[callForm.tag]}`
                    : "Choose a status when the outcome is Other."
                }
                required={callForm.tag === "Other"}
              >
                <div
                  className={
                    callForm.status
                      ? "status-grid has-selection"
                      : "status-grid"
                  }
                >
                  {callStatuses.map((status) => (
                    <button
                      key={status}
                      type="button"
                      className={
                        `status-badge status-badge-${status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}` +
                        (callForm.status === status ? " active" : "")
                      }
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

              {isVisitStatusSelected ? (
                <FormField
                  label="3. Visit Schedule"
                  required
                  hint="Optional. Use this when the parent agrees to a campus visit."
                >
                  <div className="schedule-picker-card">
                    <div className="schedule-picker-grid">
                      <label className="schedule-field">
                        <span>Date</span>
                        <input
                          type="date"
                          value={callForm.visitDate}
                          onChange={(e) => {
                            setCallForm((state) => ({
                              ...state,
                              visitDate: e.target.value,
                            }));
                            setErrors((state) => ({
                              ...state,
                              visitDate: "",
                            }));
                          }}
                          className="schedule-input"
                        />
                      </label>
                      <label className="schedule-field">
                        <span>Time</span>
                        <input
                          type="time"
                          value={callForm.visitTime}
                          onChange={(e) => {
                            setCallForm((state) => ({
                              ...state,
                              visitTime: e.target.value,
                            }));
                            setErrors((state) => ({
                              ...state,
                              visitTime: "",
                            }));
                          }}
                          className="schedule-input"
                        />
                      </label>
                    </div>

                    {(errors.visitDate || errors.visitTime) && (
                      <p className="field-error">
                        {errors.visitDate || errors.visitTime}
                      </p>
                    )}

                    {isVisitScheduled ? (
                      <div className="pickup-section">
                        <p className="pickup-question">
                          Do you want school pickup and drop service?
                        </p>
                        <div
                          className="pickup-choice-row"
                          role="group"
                          aria-label="School pick and drop required"
                        >
                          <button
                            type="button"
                            className={
                              callForm.pickupNeed === "no"
                                ? "pickup-choice active"
                                : "pickup-choice"
                            }
                            onClick={() => {
                              setPickupInfoSaved(false);
                              setCallForm((state) => ({
                                ...state,
                                pickupNeed: "no",
                                pickupTime: "",
                                pickupAddress: "",
                              }));
                              setErrors((state) => ({
                                ...state,
                                pickupTime: "",
                                pickupAddress: "",
                              }));
                            }}
                          >
                            No
                          </button>
                          <button
                            type="button"
                            className={
                              callForm.pickupNeed === "yes"
                                ? "pickup-choice active"
                                : "pickup-choice"
                            }
                            onClick={() => {
                              setPickupInfoSaved(false);
                              setCallForm((state) => ({
                                ...state,
                                pickupNeed: "yes",
                              }));
                            }}
                          >
                            Yes
                          </button>
                        </div>

                        {callForm.pickupNeed === "yes" ? (
                          <div className="pickup-details-grid">
                            <label className="pickup-field">
                              <span>Pickup Time</span>
                              <input
                                type="time"
                                value={callForm.pickupTime}
                                onChange={(e) => {
                                  setPickupInfoSaved(false);
                                  setCallForm((state) => ({
                                    ...state,
                                    pickupTime: e.target.value,
                                  }));
                                  setErrors((state) => ({
                                    ...state,
                                    pickupTime: "",
                                  }));
                                }}
                                className="schedule-input"
                              />
                              {errors.pickupTime ? (
                                <p className="field-error">
                                  {errors.pickupTime}
                                </p>
                              ) : null}
                            </label>

                            <label className="pickup-field pickup-address-field">
                              <span>Pickup Address</span>
                              <textarea
                                className="pickup-address-input"
                                rows={3}
                                value={callForm.pickupAddress}
                                onChange={(e) => {
                                  setPickupInfoSaved(false);
                                  setCallForm((state) => ({
                                    ...state,
                                    pickupAddress: e.target.value,
                                  }));
                                  setErrors((state) => ({
                                    ...state,
                                    pickupAddress: "",
                                  }));
                                }}
                                placeholder="Enter the pickup address shared by the parent"
                              />
                              {errors.pickupAddress ? (
                                <p className="field-error">
                                  {errors.pickupAddress}
                                </p>
                              ) : null}
                            </label>

                            <div className="pickup-save-row">
                              <button
                                type="button"
                                className="primary-btn inline-save"
                                onClick={handlePickupInfoSave}
                              >
                                Save Pick & Drop
                              </button>
                              {pickupInfoSaved ? (
                                <p className="field-success">
                                  Pick & Drop info saved.
                                </p>
                              ) : null}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </FormField>
              ) : null}

              <FormField
                label={
                  isVisitStatusSelected
                    ? "4. Follow-up Reminder"
                    : "3. Follow-up Reminder"
                }
                hint="Optional. Set this when you need a callback reminder for another day or time."
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

              <FormField
                label={
                  isVisitStatusSelected ? "5. Call Notes" : "4. Call Notes"
                }
                required
              >
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
              <button className="cancel-btn" type="button" onClick={onClose}>
                Cancel
              </button>
              <button className="submit-btn" type="submit">
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
                  className={sortOrder === "latest" ? "active" : ""}
                  onClick={() => setSortOrder("latest")}
                >
                  Latest
                </button>
                <button
                  type="button"
                  className={sortOrder === "oldest" ? "active" : ""}
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
  );
}
