import { Footer } from "./Footer.jsx";
import { Header } from "./Header.jsx";
import { LeftSidebar } from "./LeftSidebar.jsx";
import { RightSidebar } from "./RightSidebar.jsx";

export function AppShell({
  activeView,
  setActiveView,
  breadcrumb,
  children,
  showFab = false,
  onFabClick,
  onBellClick,
  onGlobalSearch,
}) {
  return (
    <div className="relative min-h-screen bg-[var(--bg)]">
      <LeftSidebar
        activeView={activeView}
        setActiveView={setActiveView}
        showFab={showFab}
        onFabClick={onFabClick}
      />

      <section className="flex min-h-screen min-w-0 flex-col pt-[72px] pb-[calc(var(--footer-height)+8px)] ml-[var(--sidebar-width)] mr-[var(--quickbar-width)] max-[1024px]:min-h-auto max-[1024px]:mr-0 max-[1024px]:ml-0 max-[1024px]:pt-0">
        <Header
          onAddNewLead={onFabClick}
          onBellClick={onBellClick}
          onGlobalSearch={onGlobalSearch}
        />
        {children}
      </section>

      <RightSidebar />

      <Footer />
    </div>
  );
}
