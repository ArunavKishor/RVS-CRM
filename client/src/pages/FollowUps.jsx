import { PhoneCall } from "@phosphor-icons/react";
import { assignedRows } from "./assigned-data/data/assignedRowsData.jsx";

function formatFollowUpDate(dateTime) {
  const parsed = new Date(dateTime);

  return parsed.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function isTodayOrTomorrow(dateTime) {
  const parsed = new Date(dateTime);
  if (Number.isNaN(parsed.getTime())) {
    return false;
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const followUpDate = new Date(
    parsed.getFullYear(),
    parsed.getMonth(),
    parsed.getDate(),
  );

  return (
    followUpDate.getTime() === today.getTime() ||
    followUpDate.getTime() === tomorrow.getTime()
  );
}

function getFollowUpDayLabel(dateTime) {
  const parsed = new Date(dateTime);
  if (Number.isNaN(parsed.getTime())) {
    return { label: "", tone: "" };
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const followUpDate = new Date(
    parsed.getFullYear(),
    parsed.getMonth(),
    parsed.getDate(),
  );

  if (followUpDate.getTime() === today.getTime()) {
    return { label: "Today", tone: "text-orange-700 bg-orange-100" };
  }

  if (followUpDate.getTime() === tomorrow.getTime()) {
    return { label: "Tomorrow", tone: "text-yellow-700 bg-yellow-100" };
  }

  return { label: "", tone: "" };
}

function getFollowUpCategory(stage) {
  if (stage === "Visit Scheduled" || stage === "Visit Completed") {
    return "visit";
  }

  if (stage === "Form Issued") {
    return "exam";
  }

  return "normal";
}

function compareFollowUpDateTime(a, b) {
  const dayA = new Date(a.followUpDateTime);
  const dayB = new Date(b.followUpDateTime);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const normalizedA = new Date(
    dayA.getFullYear(),
    dayA.getMonth(),
    dayA.getDate(),
  ).getTime();
  const normalizedB = new Date(
    dayB.getFullYear(),
    dayB.getMonth(),
    dayB.getDate(),
  ).getTime();

  const todayTime = today.getTime();
  const tomorrowTime = tomorrow.getTime();

  const dayRank = (value) => {
    if (value === todayTime) return 0;
    if (value === tomorrowTime) return 1;
    return 2;
  };

  const rankDifference = dayRank(normalizedA) - dayRank(normalizedB);
  if (rankDifference !== 0) {
    return rankDifference;
  }

  return dayA.getTime() - dayB.getTime();
}

function FollowUpSection({ title, tone, rows, onCallAction }) {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.05)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="m-0 text-lg font-semibold text-[var(--heading)]">
            {title}
          </h2>
          <p className="mt-1 text-xs text-slate-500">{rows.length} items</p>
        </div>
        <span
          className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${tone}`}
        >
          {title}
        </span>
      </div>

      <div className="grid gap-3">
        {rows.length === 0 ? (
          <article className="rounded-lg border border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500">
            No follow-ups available.
          </article>
        ) : null}

        {rows.map((row) => {
          const dayBadge = getFollowUpDayLabel(row.followUpDateTime);

          return (
            <article
              key={row.leadId}
              className="group flex flex-col gap-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
            >
              {/* Left Section: Profile Info */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <strong className="text-base font-bold text-slate-900">
                    {row.student}
                  </strong>
                  {/* Small indicator for active/new could go here */}
                </div>

                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <span className="font-medium text-slate-700">
                    {row.grade}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span>{row.parent}</span>
                </div>
              </div>

              {/* Right Section: Status & Actions */}
              <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
                {/* Status Pills */}
                <div className="flex items-center gap-2">
                  {dayBadge.label && (
                    <span
                      className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${dayBadge.tone}`}
                    >
                      {dayBadge.label}
                    </span>
                  )}
                  <span className="rounded-md bg-blue-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600">
                    {row.stage}
                  </span>
                </div>

                {/* Date/Time - Structured for readability */}
                <div className="flex flex-col border-l border-slate-100 pl-4 text-right max-[700px]:border-none max-[700px]:pl-0 max-[700px]:text-left">
                  <span className="text-[13px] font-medium text-slate-600">
                    {formatFollowUpDate(row.followUpDateTime).split(",")[0]}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {formatFollowUpDate(row.followUpDateTime).split(",")[1]}
                  </span>
                </div>

                {/* Call Button - Premium styling */}
                <button
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 active:scale-95"
                  type="button"
                  onClick={() => onCallAction(row)}
                >
                  <PhoneCall size={18} weight="fill" />
                  <span>Call</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function FollowUpsWindowView({
  leadStageById = {},
  followUpScheduleByLeadId = {},
  dismissedFollowUpLeadIds = [],
  onCallAction,
}) {
  const dismissedLeadIdSet = new Set(dismissedFollowUpLeadIds);

  const followUpRows = assignedRows
    .map((row) => ({
      ...row,
      stage: leadStageById[row.leadId] ?? row.stage,
      followUpDateTime: followUpScheduleByLeadId[row.leadId] || "",
    }))
    .filter(
      (row) =>
        row.stage !== "Converted" &&
        row.stage !== "Dead Leads" &&
        !dismissedLeadIdSet.has(row.leadId) &&
        row.followUpDateTime &&
        isTodayOrTomorrow(row.followUpDateTime),
    )
    .sort(compareFollowUpDateTime);

  const sectionRows = {
    normal: followUpRows.filter(
      (row) => getFollowUpCategory(row.stage) === "normal",
    ),
    visit: followUpRows.filter(
      (row) => getFollowUpCategory(row.stage) === "visit",
    ),
    exam: followUpRows.filter(
      (row) => getFollowUpCategory(row.stage) === "exam",
    ),
  };

  return (
    <main className="flex flex-col gap-5 px-6 py-6 max-[1024px]:px-4">
      <section className="rounded-lg border border-[var(--border)] bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.05)]">
        <h1 className="m-0 text-xl text-[var(--heading)]">Follow-Up&apos;s</h1>
        <p className="mt-1 text-sm text-slate-500">
          Today&apos;s follow-ups appear first, then tomorrow&apos;s, grouped
          into normal, visit scheduled, and exam follow-ups.
        </p>
      </section>

      <section className="grid gap-4 xl:grid-cols-3 max-[1280px]:grid-cols-1">
        <FollowUpSection
          title="Normal"
          tone="bg-slate-100 text-slate-700"
          rows={sectionRows.normal}
          onCallAction={onCallAction}
        />
        <FollowUpSection
          title="Visit Scheduled"
          tone="bg-blue-100 text-blue-700"
          rows={sectionRows.visit}
          onCallAction={onCallAction}
        />
        <FollowUpSection
          title="Exam"
          tone="bg-violet-100 text-violet-700"
          rows={sectionRows.exam}
          onCallAction={onCallAction}
        />
      </section>
    </main>
  );
}
