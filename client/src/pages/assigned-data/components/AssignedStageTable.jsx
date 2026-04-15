import { LockSimple, LockSimpleOpen, PhoneCall } from "@phosphor-icons/react";

const sourceTagTone = {
  Website: "border-blue-300 bg-blue-50 text-blue-700",
  Instagram: "border-pink-300 bg-pink-50 text-pink-700",
  "Walk-in": "border-green-300 bg-green-50 text-green-800",
  Reference: "border-violet-300 bg-violet-50 text-violet-700",
  Referral: "border-violet-300 bg-violet-50 text-violet-700",
  Facebook: "border-sky-300 bg-sky-50 text-sky-800",
  "Google Ads": "border-amber-300 bg-amber-50 text-amber-800",
  YouTube: "border-red-300 bg-red-50 text-red-700",
  "WhatsApp Campaign": "border-emerald-300 bg-emerald-50 text-emerald-700",
};

function getSourceTagClasses(source) {
  return sourceTagTone[source] || "border-slate-300 bg-slate-50 text-slate-600";
}

function getPaginationButtonClass(isActive) {
  return [
    "min-h-[34px] rounded-lg border px-2.5 text-[13px] font-semibold",
    isActive
      ? "border-[var(--active-stage)] bg-[var(--active-stage-soft)] text-[var(--active-stage)]"
      : "border-slate-300 bg-white text-slate-700",
  ].join(" ");
}

export function AssignedStageTable({
  variant = "default",
  ariaLabel,
  paginatedRows,
  tableWrapRef,
  currentPageSafe,
  setCurrentPage,
  totalPages,
  displayedRows,
  startIndex,
  rowsPerPage,
  onCallAction,
  enabledLeadIdSet,
  nextLeadToCallId,
}) {
  return (
    <>
      <section
        className="min-h-0 flex-1 overflow-x-auto overflow-y-scroll rounded-[14px] border border-[var(--border)] bg-white shadow-[0_2px_10px_rgba(15,23,42,0.06)]"
        aria-label={ariaLabel}
        ref={tableWrapRef}
      >
        <table className="w-full min-w-[980px] table-fixed border-collapse">
          <colgroup>
            <col className="w-14" />
            <col className="w-[124px]" />
            <col className="w-[220px]" />
            <col className="w-[200px]" />
            <col className="w-[150px]" />
            <col className="w-[120px]" />
            <col className="w-[130px]" />
            <col className="w-[150px]" />
          </colgroup>
          <thead>
            <tr>
              <th className="border-b border-slate-200 bg-slate-50 px-3 py-3.5 text-left text-[15px] font-bold text-slate-900">
                #
              </th>
              <th className="border-b border-slate-200 bg-slate-50 px-3 py-3.5 text-left text-[15px] font-bold text-slate-900">
                Lead ID
              </th>
              <th className="border-b border-slate-200 bg-slate-50 px-3 py-3.5 text-left text-[15px] font-bold text-slate-900">
                Student Name
              </th>
              <th className="border-b border-slate-200 bg-slate-50 px-3 py-3.5 text-left text-[15px] font-bold text-slate-900">
                Parent Name
              </th>
              <th className="border-b border-slate-200 bg-slate-50 px-3 py-3.5 text-left text-[15px] font-bold text-slate-900">
                Contact
              </th>
              <th className="border-b border-slate-200 bg-slate-50 px-3 py-3.5 text-left text-[15px] font-bold text-slate-900">
                Grade
              </th>
              <th className="border-b border-slate-200 bg-slate-50 px-3 py-3.5 text-left text-[15px] font-bold text-slate-900">
                Source
              </th>
              <th className="border-b border-slate-200 bg-slate-50 px-3 py-3.5 text-left text-[15px] font-bold text-slate-900">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((row) => {
              const isLeadVariant = variant === "lead";
              const isUnlockedLead = isLeadVariant
                ? enabledLeadIdSet?.has(row.leadId)
                : !row.locked;
              const isCurrentLead = isLeadVariant
                ? row.leadId === nextLeadToCallId
                : false;

              return (
                <tr
                  key={row.leadId}
                  className={row.active ? "bg-[var(--active-stage-soft)]" : ""}
                >
                  <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b border-slate-200 px-3 py-3.5 text-[15px] text-slate-700">
                    {isLeadVariant ? (
                      isUnlockedLead ? (
                        <LockSimpleOpen
                          size={18}
                          weight="regular"
                          className={
                            isCurrentLead
                              ? "text-blue-700 drop-shadow-[0_0_6px_rgba(37,99,235,0.35)]"
                              : "text-[var(--active-stage)]"
                          }
                        />
                      ) : (
                        <LockSimple
                          size={18}
                          weight="regular"
                          className="text-slate-400"
                        />
                      )
                    ) : row.locked ? (
                      <LockSimple
                        size={18}
                        weight="regular"
                        className="text-slate-400"
                      />
                    ) : (
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--active-stage)]"
                        aria-hidden="true"
                      />
                    )}
                  </td>
                  <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b border-slate-200 px-3 py-3.5 text-[15px] text-slate-700">
                    {row.leadId}
                  </td>
                  <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b border-slate-200 px-3 py-3.5 text-[15px] font-bold text-slate-900">
                    {row.student}
                  </td>
                  <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b border-slate-200 px-3 py-3.5 text-[15px] text-slate-700">
                    {row.parent}
                  </td>
                  <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b border-slate-200 px-3 py-3.5 text-[15px] text-slate-700">
                    {isLeadVariant && !isUnlockedLead ? "Hidden" : row.contact}
                  </td>
                  <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b border-slate-200 px-3 py-3.5 text-[15px] text-slate-700">
                    {row.grade}
                  </td>
                  <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b border-slate-200 px-3 py-3.5 text-[15px] text-slate-700">
                    <span
                      className={`inline-flex min-h-[22px] items-center rounded-xl border px-2.5 py-0.5 text-[11px] font-semibold ${getSourceTagClasses(row.source)}`}
                    >
                      {row.source}
                    </span>
                  </td>
                  <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b border-slate-200 px-3 py-3.5 text-[15px] text-slate-700">
                    <button
                      className={[
                        "inline-flex min-h-[42px] cursor-pointer items-center gap-2 rounded-xl px-4 font-bold",
                        isLeadVariant && isCurrentLead
                          ? "animate-pulse bg-[linear-gradient(135deg,#2563eb_0%,#1d4ed8_100%)] text-white shadow-[0_0_0_4px_rgba(37,99,235,0.28),0_10px_20px_rgba(37,99,235,0.3)]"
                          : isLeadVariant && isUnlockedLead
                            ? "border border-blue-300 bg-blue-100 text-blue-700"
                            : isLeadVariant && !isUnlockedLead
                              ? "cursor-not-allowed bg-slate-300 text-slate-500"
                              : "bg-[var(--active-stage)] text-white",
                      ].join(" ")}
                      type="button"
                      onClick={() => onCallAction(row)}
                      disabled={isLeadVariant ? !isUnlockedLead : false}
                    >
                      <PhoneCall size={15} weight="regular" /> Call
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section
        className="flex items-center justify-between gap-3 max-[700px]:flex-col max-[700px]:items-start"
        aria-label={`${ariaLabel} pagination`}
      >
        <p className="m-0 text-[13px] font-medium text-slate-500">
          {`Showing ${displayedRows.length ? startIndex + 1 : 0}-${Math.min(startIndex + rowsPerPage, displayedRows.length)} of ${displayedRows.length}`}
        </p>
        <div className="flex items-center gap-2">
          <button
            className={getPaginationButtonClass(false)}
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
                className={getPaginationButtonClass(currentPageSafe === page)}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ),
          )}
          <button
            className={getPaginationButtonClass(false)}
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
