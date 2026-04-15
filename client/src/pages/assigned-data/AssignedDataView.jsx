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
      className="flex h-[calc(100vh-56px)] flex-col gap-3.5 overflow-hidden px-6 py-6 max-[1024px]:h-auto max-[1024px]:overflow-visible"
      style={{
        "--active-stage": theme.color,
        "--active-stage-soft": theme.soft,
      }}
    >
      {/* <section className="assigned-head">
        <h2>Assigned Data</h2>
      </section> */}

      <AssignedStageTabs
        stageTabs={stageTabs}
        activeStage={activeStage}
        setActiveStage={setActiveStage}
        stageThemes={stageThemes}
      />

      <section className="flex items-center justify-between max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-2">
        <p className="m-0 text-[15px] font-medium text-gray-500">{`${activeStage} queue`}</p>
        <span className="rounded-xl bg-[var(--active-stage-soft)] px-3 py-1 text-[22px] font-bold text-[var(--active-stage)] max-[1024px]:text-lg">
          {`${enabledCount} / ${displayedRows.length}`}
        </span>
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
