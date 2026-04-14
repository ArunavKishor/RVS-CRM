export function AssignedStageTabs({
  stageTabs,
  activeStage,
  setActiveStage,
  stageThemes,
}) {
  return (
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
  );
}
