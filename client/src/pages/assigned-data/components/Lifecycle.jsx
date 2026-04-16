function getInitials(name) {
  if (!name) return "ST";

  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function buildJourney(currentStage) {
  const primaryFlow = [
    "Lead",
    "Nurturing",
    "Visit Scheduled",
    "Visit Completed",
    "Form Issued",
    "Converted",
  ];

  const terminalStages = new Set(["Unsuccessful", "Dead Leads"]);

  if (primaryFlow.includes(currentStage)) {
    const stageIndex = primaryFlow.indexOf(currentStage);
    return primaryFlow.slice(0, stageIndex + 1);
  }

  if (terminalStages.has(currentStage)) {
    return ["Lead", "Nurturing", currentStage];
  }

  return ["Lead"];
}

export function LeadLifecycleTrail({ studentName, sectionName }) {
  const initials = getInitials(studentName);
  const journey = buildJourney(sectionName || "Lead");
  const lastIndex = journey.length - 1;

  return (
    <div className="mx-3 flex min-w-0 flex-1 flex-col">
      <h3 className="mb-1.5 inline-flex w-fit items-center rounded-md bg-white/20 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-white">
        Life Cycle
      </h3>
      <div className="flex w-full items-center gap-2 overflow-x-auto rounded-lg border border-white/20 bg-white/8 px-2 py-1.5">
        <span className="grid h-7 min-w-7 place-items-center rounded-full bg-white/20 text-[11px] font-bold tracking-wide text-white">
          {initials}
        </span>

        {journey.map((stage, index) => {
          const isCurrent = index === lastIndex;

          return (
            <div key={stage} className="flex items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap ${
                  isCurrent
                    ? "bg-white text-[#1e3a8a]"
                    : "bg-white/16 text-white"
                }`}
              >
                {stage}
              </span>
              {index < lastIndex ? (
                <span className="text-[11px] font-semibold text-white/75">
                  {">"}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function LifeCycle(props) {
  return <LeadLifecycleTrail {...props} />;
}
