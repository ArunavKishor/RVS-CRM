import { useEffect, useRef, useState } from "react";
import { stageTabs, stageThemes } from "./config/stageConfig.jsx";
import { tabComponentsByStage } from "./tabs/index.jsx";
import { buildAssignedRows } from "./data/assignedRowsData.jsx";
import { AssignedStageTabs } from "./components/AssignedStageTabs.jsx";

export function AssignedDataView({
  markedCallLeadIds = [],
  leadStageById = {},
  onCallAction,
}) {
  const [activeStage, setActiveStage] = useState("Lead");
  const [currentPage, setCurrentPage] = useState(1);
  const tableWrapRef = useRef(null);

  const allAssignedRows = buildAssignedRows().map((row) => ({
    ...row,
    stage: leadStageById[row.leadId] ?? row.stage,
  }));
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

  const displayedRows = filteredRows.map((row) => ({ ...row }));

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
  const ActiveTabComponent =
    tabComponentsByStage[activeStage] || tabComponentsByStage["Lead"];

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

      <AssignedStageTabs
        stageTabs={stageTabs}
        activeStage={activeStage}
        setActiveStage={setActiveStage}
        stageThemes={stageThemes}
      />

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
