import { AssignedStageTable } from "../components/AssignedStageTable.jsx";

export function LeadTab({
  enabledLeadIdSet,
  nextLeadToCallId,
  onCallAction,
  paginatedRows,
  tableWrapRef,
  currentPageSafe,
  setCurrentPage,
  totalPages,
  displayedRows,
  startIndex,
  rowsPerPage,
}) {
  return (
    <AssignedStageTable
      variant="lead"
      ariaLabel="Lead stage student list"
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
  );
}
