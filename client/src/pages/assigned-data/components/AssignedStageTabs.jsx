export function AssignedStageTabs({
  stageTabs,
  activeStage,
  setActiveStage,
  stageThemes,
}) {
  return (
    <section className="rounded-xl bg-slate-100 p-1.5" aria-label="Lead stages">
      <div className="grid w-full grid-flow-col auto-cols-[minmax(0,1fr)] gap-2 overflow-x-auto">
        {stageTabs.map((tab) => (
          <button
            key={tab}
            className={`w-full min-h-9 cursor-pointer whitespace-nowrap rounded-full border px-3.5 text-center text-sm font-semibold ${
              activeStage === tab
                ? "border-[var(--stage-color)] bg-[var(--stage-soft)] text-[var(--stage-color)]"
                : "border-[#dbe1ea] bg-transparent text-slate-700"
            }`}
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
  );
}
