import { LockSimple, LockSimpleOpen, PhoneCall } from "@phosphor-icons/react";

export function AssignedLeadTableSection({
  stage,
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
    <>
      <section
        className="assigned-table-wrap"
        aria-label="Assigned student list"
        ref={tableWrapRef}
      >
        <table className="assigned-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Lead ID</th>
              <th>Student Name</th>
              <th>Parent Name</th>
              <th>Contact</th>
              <th>Grade</th>
              <th>Source</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((row) => {
              const isUnlockedLead =
                stage === "Lead" && enabledLeadIdSet.has(row.leadId);
              const isCurrentLead =
                stage === "Lead" && row.leadId === nextLeadToCallId;

              return (
                <tr key={row.leadId} className={row.active ? "active" : ""}>
                  <td>
                    {stage === "Lead" ? (
                      isUnlockedLead ? (
                        <LockSimpleOpen
                          size={18}
                          weight="regular"
                          className={`unlock-icon ${
                            isCurrentLead ? "current-unlock-icon" : ""
                          }`}
                        />
                      ) : (
                        <LockSimple
                          size={18}
                          weight="regular"
                          className="lock-icon"
                        />
                      )
                    ) : row.locked ? (
                      <LockSimple
                        size={18}
                        weight="regular"
                        className="lock-icon"
                      />
                    ) : (
                      <span className="active-dot" aria-hidden="true" />
                    )}
                  </td>
                  <td>{row.leadId}</td>
                  <td className="name-cell">{row.student}</td>
                  <td>{row.parent}</td>
                  <td>{row.contact}</td>
                  <td>{row.grade}</td>
                  <td>
                    <span className="chip source-tag">{row.source}</span>
                  </td>
                  <td>
                    {stage === "Lead" ? (
                      <button
                        className={`call-btn ${
                          isCurrentLead
                            ? "current-call-btn"
                            : isUnlockedLead
                              ? "unlocked-call-btn"
                              : ""
                        }`}
                        type="button"
                        onClick={() => onCallAction(row)}
                        disabled={!isUnlockedLead}
                      >
                        <PhoneCall size={15} weight="regular" /> Call
                      </button>
                    ) : row.active ? (
                      <button
                        className="call-btn"
                        type="button"
                        onClick={() => onCallAction(row)}
                      >
                        <PhoneCall size={15} weight="regular" /> Call
                      </button>
                    ) : (
                      <span className="locked-text">Locked</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section
        className="assigned-pagination"
        aria-label="Assigned data pagination"
      >
        <p>
          {`Showing ${displayedRows.length ? startIndex + 1 : 0}-${Math.min(startIndex + rowsPerPage, displayedRows.length)} of ${displayedRows.length}`}
        </p>
        <div className="pagination-actions">
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPageSafe === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                type="button"
                className={currentPageSafe === page ? "active" : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ),
          )}
          <button
            type="button"
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
            disabled={currentPageSafe === totalPages}
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
}
