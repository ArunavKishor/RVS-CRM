import { FiMessageCircle } from "react-icons/fi";

export function Footer() {
  return (
    <footer
      className="fixed bottom-0 left-[var(--sidebar-width)] right-[var(--quickbar-width)] z-40 flex min-h-[var(--footer-height)] items-center justify-between gap-3 border-t border-[#d6dde8] bg-[#eef2f7] px-[18px] py-2 text-xs text-gray-500 max-[1024px]:left-0 max-[1024px]:right-0 max-[1024px]:justify-between max-[1024px]:px-3"
      aria-label="Website footer"
    >
      <p className="absolute left-1/2 m-0 max-w-[calc(100%-280px)] -translate-x-1/2 overflow-hidden text-ellipsis whitespace-nowrap text-center text-xs max-[1024px]:static max-[1024px]:max-w-full max-[1024px]:translate-x-0">
        © 2026, Raj Digital Pvt. Ltd. All Rights Reserved.
      </p>

      <button
        type="button"
        className="ml-auto inline-flex min-h-9 cursor-pointer items-center gap-[7px] rounded-md border border-blue-600 bg-[#f8fbff] px-3.5 text-xs font-medium text-slate-900 transition-colors hover:bg-[#eef4ff] max-[1024px]:min-h-8 max-[1024px]:px-2.5"
      >
        <FiMessageCircle size={16} aria-hidden="true" />
        Contact Support
      </button>
    </footer>
  );
}
