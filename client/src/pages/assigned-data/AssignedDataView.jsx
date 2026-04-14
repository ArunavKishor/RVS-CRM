import { useEffect, useRef, useState } from "react";
import { LeadTab } from "./tabs/LeadTab.jsx";
import { ContactedTab } from "./tabs/ContactedTab.jsx";
import { NurturingTab } from "./tabs/NurturingTab.jsx";
import { VisitScheduledTab } from "./tabs/VisitScheduledTab.jsx";
import { VisitCompletedTab } from "./tabs/VisitCompletedTab.jsx";
import { FormIssuedTab } from "./tabs/FormIssuedTab.jsx";
import { UnsuccessfulTab } from "./tabs/UnsuccessfulTab.jsx";
import { DeadLeadsTab } from "./tabs/DeadLeadsTab.jsx";
import { ConvertedTab } from "./tabs/ConvertedTab.jsx";

const stageTabs = [
  "Lead",
  "Contacted",
  "Nurturing",
  "Visit Scheduled",
  "Visit Completed",
  "Form Issued",
  "Unsuccessful",
  "Dead Leads",
  "Converted",
];

const stageThemes = {
  Lead: { color: "#2563eb", soft: "#dbeafe" },
  Contacted: { color: "#4f46e5", soft: "#e0e7ff" },
  Nurturing: { color: "#0d9488", soft: "#ccfbf1" },
  "Visit Scheduled": { color: "#f59e0b", soft: "#fef3c7" },
  "Visit Completed": { color: "#ea580c", soft: "#ffedd5" },
  "Form Issued": { color: "#9333ea", soft: "#f3e8ff" },
  Unsuccessful: { color: "#dc2626", soft: "#fee2e2" },
  "Dead Leads": { color: "#475569", soft: "#e2e8f0" },
  Converted: { color: "#16a34a", soft: "#dcfce7" },
};

const tabComponentsByStage = {
  Lead: LeadTab,
  Contacted: ContactedTab,
  Nurturing: NurturingTab,
  "Visit Scheduled": VisitScheduledTab,
  "Visit Completed": VisitCompletedTab,
  "Form Issued": FormIssuedTab,
  Unsuccessful: UnsuccessfulTab,
  "Dead Leads": DeadLeadsTab,
  Converted: ConvertedTab,
};

export function AssignedDataView({ markedCallLeadIds = [], onCallAction }) {
  const [activeStage, setActiveStage] = useState("Lead");
  const [currentPage, setCurrentPage] = useState(1);
  const tableWrapRef = useRef(null);

  const assignedRows = [
    {
      leadId: "LD-1001",
      student: "Ishita Sharma",
      parent: "Ravi Sharma",
      contact: "••••••••••",
      grade: "Grade 8",
      source: "Website",
      stage: "Lead",
      active: true,
    },
    {
      leadId: "LD-1002",
      student: "Rahul Verma",
      parent: "Sunita Verma",
      contact: "••••••••••",
      grade: "Grade 6",
      source: "Walk-in",
      stage: "Lead",
      locked: true,
    },
    {
      leadId: "LD-1003",
      student: "Aarav Mehta",
      parent: "Sunita Mehta",
      contact: "••••••••••",
      grade: "Grade 5",
      source: "Instagram",
      stage: "Lead",
      active: true,
    },
    {
      leadId: "LD-1004",
      student: "Kavya Jain",
      parent: "Manoj Jain",
      contact: "••••••••••",
      grade: "Grade 7",
      source: "Reference",
      stage: "Lead",
      locked: true,
    },
    {
      leadId: "LD-1005",
      student: "Ananya Patel",
      parent: "Ritu Patel",
      contact: "••••••••••",
      grade: "Grade 9",
      source: "Facebook",
      stage: "Contacted",
      active: true,
    },
    {
      leadId: "LD-1006",
      student: "Vikram Singh",
      parent: "Poonam Singh",
      contact: "••••••••••",
      grade: "Grade 10",
      source: "Website",
      stage: "Contacted",
      locked: true,
    },
    {
      leadId: "LD-1007",
      student: "Sneha Reddy",
      parent: "Mohan Reddy",
      contact: "••••••••••",
      grade: "Grade 11",
      source: "Walk-in",
      stage: "Nurturing",
      active: true,
    },
    {
      leadId: "LD-1008",
      student: "Arjun Mehta",
      parent: "Nidhi Mehta",
      contact: "••••••••••",
      grade: "Grade 8",
      source: "Referral",
      stage: "Nurturing",
      locked: true,
    },
    {
      leadId: "LD-1009",
      student: "Kavya Jain",
      parent: "Anil Jain",
      contact: "••••••••••",
      grade: "Grade 7",
      source: "Website",
      stage: "Visit Scheduled",
      active: true,
    },
    {
      leadId: "LD-1010",
      student: "Manav Nair",
      parent: "Deepa Nair",
      contact: "••••••••••",
      grade: "Grade 12",
      source: "Walk-in",
      stage: "Visit Completed",
      active: true,
    },
    {
      leadId: "LD-1011",
      student: "Ira Kapoor",
      parent: "Saurabh Kapoor",
      contact: "••••••••••",
      grade: "Grade 9",
      source: "Instagram",
      stage: "Form Issued",
      active: true,
    },
    {
      leadId: "LD-1012",
      student: "Rishi Solanki",
      parent: "Seema Solanki",
      contact: "••••••••••",
      grade: "Grade 10",
      source: "Facebook",
      stage: "Unsuccessful",
      active: true,
    },
    {
      leadId: "LD-1013",
      student: "Pallavi Rao",
      parent: "Raghu Rao",
      contact: "••••••••••",
      grade: "Grade 11",
      source: "Website",
      stage: "Dead Leads",
      active: true,
    },
    {
      leadId: "LD-1014",
      student: "Aman Tiwari",
      parent: "Kusum Tiwari",
      contact: "••••••••••",
      grade: "Grade 8",
      source: "Reference",
      stage: "Converted",
      active: true,
    },
    {
      leadId: "LD-1015",
      student: "Neha Das",
      parent: "Rohit Das",
      contact: "••••••••••",
      grade: "Grade 6",
      source: "Walk-in",
      stage: "Converted",
      locked: true,
    },
  ];

  const sourcePool = [
    "Website",
    "Walk-in",
    "Instagram",
    "Facebook",
    "Reference",
    "Google Ads",
    "YouTube",
    "WhatsApp Campaign",
  ];

  const generatedRows = Array.from({ length: 35 }, (_, index) => {
    const id = index + 1;
    const stage = stageTabs[index % stageTabs.length];
    const isActive = id % 2 === 1;
    const grade = 1 + (index % 12);

    return {
      leadId: `LD-${1016 + id}`,
      student: `Dummy Student ${id}`,
      parent: `Parent ${id}`,
      contact: isActive ? `+91 98${(10000000 + id).toString()}` : "••••••••••",
      grade: `Grade ${grade}`,
      source: sourcePool[index % sourcePool.length],
      stage,
      active: isActive,
      locked: !isActive,
    };
  });

  const leadStageRows = Array.from({ length: 30 }, (_, index) => {
    const rowNumber = index + 1;
    const isActive = rowNumber % 2 === 1;
    const grade = 1 + (index % 12);

    return {
      leadId: `LD-L${String(rowNumber).padStart(3, "0")}`,
      student: `Lead Student ${rowNumber}`,
      parent: `Lead Parent ${rowNumber}`,
      contact: isActive ? `+91 97${String(6000000 + rowNumber)}` : "••••••••••",
      grade: `Grade ${grade}`,
      source: sourcePool[index % sourcePool.length],
      stage: "Lead",
      active: isActive,
      locked: !isActive,
    };
  });

  const allAssignedRows = [...assignedRows, ...generatedRows, ...leadStageRows];
  const filteredRows = allAssignedRows.filter(
    (row) => row.stage === activeStage,
  );

  const completedLeadIdSet = new Set(markedCallLeadIds);
  const nextLeadToCallId =
    activeStage === "Lead"
      ? (filteredRows.find((row) => !completedLeadIdSet.has(row.leadId))
          ?.leadId ?? null)
      : null;

  const enabledLeadIdSet =
    activeStage === "Lead"
      ? new Set([
          ...markedCallLeadIds,
          ...(nextLeadToCallId ? [nextLeadToCallId] : []),
        ])
      : new Set();

  const getDummyIndianNumber = (leadId) => {
    const seedDigits = leadId.replace(/\D/g, "");
    const seedValue = Number(seedDigits.slice(-9) || "0");
    const nineDigits = String(seedValue % 1000000000).padStart(9, "0");
    return `+91 9${nineDigits}`;
  };

  const displayedRows = filteredRows.map((row) => ({
    ...row,
    contact: (() => {
      if (activeStage !== "Lead") return row.contact;
      if (!enabledLeadIdSet.has(row.leadId)) return "••••••••••";
      if (row.contact && !row.contact.includes("•")) return row.contact;
      return getDummyIndianNumber(row.leadId);
    })(),
  }));

  const enabledCount =
    activeStage === "Lead"
      ? displayedRows.filter((row) => enabledLeadIdSet.has(row.leadId)).length
      : displayedRows.filter((row) => !row.locked).length;

  const rowsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(displayedRows.length / rowsPerPage));
  const currentPageSafe = Math.min(currentPage, totalPages);
  const startIndex = (currentPageSafe - 1) * rowsPerPage;
  const paginatedRows = displayedRows.slice(
    startIndex,
    startIndex + rowsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeStage]);

  useEffect(() => {
    if (tableWrapRef.current) {
      tableWrapRef.current.scrollTop = 0;
    }
  }, [activeStage, currentPage]);

  const theme = stageThemes[activeStage];
  const ActiveTabComponent = tabComponentsByStage[activeStage] || LeadTab;

  return (
    <main
      className="view-content assigned-page"
      style={{
        "--active-stage": theme.color,
        "--active-stage-soft": theme.soft,
      }}
    >
      <section className="assigned-head">
        <h2>Assigned Data</h2>
      </section>

      <section className="assigned-stages" aria-label="Lead stages">
        <div className="stage-scroll">
          {stageTabs.map((tab) => (
            <button
              key={tab}
              className={`stage-tab ${activeStage === tab ? "active" : ""}`}
              type="button"
              onClick={() => setActiveStage(tab)}
              style={{
                "--stage-color": stageThemes[tab].color,
                "--stage-soft": stageThemes[tab].soft,
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      <section className="assigned-note-row">
        <p>{`${activeStage} queue`}</p>
        <span className="assigned-progress">{`${enabledCount} / ${displayedRows.length}`}</span>
      </section>

      <ActiveTabComponent
        enabledLeadIdSet={enabledLeadIdSet}
        nextLeadToCallId={nextLeadToCallId}
        onCallAction={onCallAction}
        paginatedRows={paginatedRows}
        tableWrapRef={tableWrapRef}
        currentPageSafe={currentPageSafe}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        displayedRows={displayedRows}
        startIndex={startIndex}
        rowsPerPage={rowsPerPage}
      />
    </main>
  );
}
