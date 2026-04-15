import { AssignedStageTable } from "../components/AssignedStageTable.jsx";

export function FormIssuedTab({
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
      ariaLabel="Form Issued stage student list"
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
