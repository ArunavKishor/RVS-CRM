import { Children, cloneElement, isValidElement } from "react";

const tokenMap = {
  "screen-overlay":
    "fixed inset-0 z-50 grid place-items-center bg-slate-900/35 p-4",
  "followup-modal":
    "w-full max-w-[480px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl",
  "visit-modal":
    "w-full max-w-[560px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl",
  "convert-modal":
    "w-full max-w-[480px] rounded-xl border border-slate-200 bg-white pt-4 shadow-2xl",
  "lost-modal":
    "w-full max-w-[480px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl",
  "followup-header": "flex min-h-[76px] items-center justify-between px-6 py-3",
  "followup-body": "flex flex-col gap-4 p-6",
  "followup-footer":
    "flex min-h-[76px] items-center justify-between gap-3 border-t border-slate-200 px-6 py-4 max-[700px]:flex-col max-[700px]:items-stretch",
  "drawer-divider": "border-t border-slate-200",
  "icon-btn":
    "inline-flex h-11 w-11 items-center justify-center rounded-md border border-transparent bg-transparent text-slate-500 transition hover:bg-slate-100",
  "mode-grid": "grid grid-cols-5 gap-2 max-[700px]:grid-cols-2",
  "reminder-row": "flex flex-col gap-2",
  "info-callout": "rounded-md bg-blue-50 p-3",
  "confirm-green":
    "inline-flex min-h-11 items-center justify-center rounded-md bg-green-600 px-4 text-sm font-semibold text-white",
  "danger-btn":
    "inline-flex min-h-11 items-center justify-center rounded-md bg-red-600 px-4 text-sm font-semibold text-white",
  "convert-top": "px-6 pb-3 text-center",
  "convert-icon":
    "mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-green-600 text-white",
  "convert-summary":
    "mx-6 mb-3 grid grid-cols-2 gap-2 rounded-lg border border-green-200 bg-green-50 p-3 max-[900px]:grid-cols-1",
  "convert-radio-group": "grid gap-1 px-6 pb-3",
  "lost-icon":
    "mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-red-100 text-red-600",
  "lost-title": "text-red-600",
  callout: "mt-2 rounded-md border p-3",
  warning: "border-amber-200 bg-amber-50",
  danger: "border-red-200 bg-red-50",
  success: "text-green-600",
  "callout-title": "mb-2 flex items-start gap-2 font-semibold text-red-900",
  "mini-outline":
    "inline-flex min-h-8 items-center rounded-md border border-blue-300 bg-white px-3 text-xs font-medium text-blue-700",
  "mini-ghost":
    "inline-flex min-h-8 items-center rounded-md border border-transparent bg-slate-100 px-3 text-xs font-medium text-slate-600",
  "new-lead-view": "relative min-h-[calc(100vh-56px)]",
  "pipeline-dim": "pointer-events-none absolute inset-0 bg-slate-900/40",
  "lead-drawer":
    "absolute right-0 top-0 z-30 flex h-full w-full max-w-[480px] flex-col bg-white shadow-2xl",
  "drawer-header": "flex min-h-16 items-center justify-between px-6",
  "state-toggle": "flex gap-2 px-6 pt-3 max-[700px]:flex-wrap",
  "drawer-body": "flex flex-1 flex-col gap-5 overflow-auto px-6 py-5",
  "section-label":
    "mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500",
  "form-input":
    "flex min-h-10 w-full items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-slate-700",
  "date-input": "justify-between",
  "form-select":
    "flex min-h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 text-slate-700",
  "form-textarea":
    "min-h-20 w-full resize-y rounded-md border border-slate-200 p-3 text-slate-700",
  "disabled-field": "bg-slate-50 text-slate-500",
  "disabled-input": "bg-slate-50 text-slate-500",
  "option-row": "mt-2 text-xs text-slate-400",
  "prefix-chip":
    "inline-flex h-6 min-w-9 items-center justify-center rounded-full bg-blue-50 px-2 text-xs font-semibold text-blue-700",
  "field-inline": "mt-2 inline-flex items-center gap-1.5 text-xs",
  "duplicate-card":
    "mb-2 rounded-md border border-red-200 bg-white p-2.5 text-xs text-slate-700",
  "duplicate-actions": "flex gap-2",
  "form-input":
    "flex min-h-10 w-full items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-slate-700",
  "form-textarea":
    "min-h-20 w-full resize-y rounded-md border border-slate-200 p-3 text-slate-700",
  "drawer-footer":
    "sticky bottom-0 flex min-h-[76px] items-center justify-between gap-3 border-t border-slate-200 bg-white px-6 py-4 max-[700px]:flex-col max-[700px]:items-stretch",
  "ghost-primary":
    "inline-flex min-h-11 items-center rounded-md bg-transparent px-2 text-sm font-medium text-blue-600",
  "primary-btn":
    "inline-flex min-h-11 items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-semibold text-white",
  "inline-save": "w-auto min-w-[120px]",
  "lead-detail-page":
    "relative grid grid-cols-[1.5fr_1fr] gap-4 p-6 max-[1200px]:grid-cols-1",
  "lead-main": "min-w-0",
  "lead-side": "min-w-0",
  "panel-card": "rounded-lg border border-slate-200 bg-white p-4 shadow-sm",
  "stage-stepper":
    "mb-4 grid grid-cols-7 max-[1200px]:flex max-[1200px]:gap-2 max-[1200px]:overflow-x-auto max-[1200px]:pb-1",
  "step-item":
    "relative flex flex-col items-center gap-2 max-[1200px]:min-w-[104px]",
  "step-line":
    "absolute left-[calc(50%+8px)] top-[6px] h-0.5 w-[calc(100%-14px)] bg-slate-200",
  "add-followup-btn": "mb-5 border-blue-300 text-blue-600",
  "activity-timeline": "flex flex-col gap-3.5",
  "activity-row": "relative grid grid-cols-[32px_1fr] gap-3 pl-2",
  "timeline-rail":
    "absolute bottom-[-14px] left-[23px] top-0 w-0.5 bg-slate-200",
  "activity-content": "space-y-2",
  "lead-info-card": "p-6",
  "lead-head": "flex items-start justify-between gap-3",
  chip: "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
  "status-teal": "bg-teal-100 text-teal-700",
  "source-blue": "bg-blue-50 text-blue-700",
  "lead-info-grid": "grid gap-2.5 py-4 text-sm text-slate-700",
  "next-warning": "font-bold text-amber-700",
  "action-grid": "grid grid-cols-2 gap-2.5",
  "action-btn":
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border bg-white text-sm",
  "action-blue": "border-blue-300 text-blue-600",
  "action-amber": "border-amber-300 text-amber-700",
  "action-violet": "border-violet-300 text-violet-700",
  "action-green": "border-green-300 text-green-700",
  "action-red": "border-red-300 text-red-700",
  "action-gray": "border-slate-300 text-slate-600",
  "call-action-modal":
    "flex max-h-[92vh] w-full max-w-[920px] flex-col overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-2xl",
  "call-action-header":
    "flex items-center justify-between bg-gradient-to-br from-slate-900 to-blue-700 px-7 py-6 text-white",
  "call-header-left": "flex items-center gap-4",
  "call-header-icon":
    "grid h-[54px] w-[54px] place-items-center rounded-2xl bg-white/15",
  "call-header-section":
    "mt-2 inline-flex w-fit items-center rounded-full bg-white/20 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-slate-50",
  "section-lead": "bg-blue-600",
  "section-nurturing": "bg-green-600",
  "section-visit": "bg-amber-500",
  "section-default": "bg-white/20",
  "section-form-issued": "bg-violet-700",
  "section-unsuccessful": "bg-red-600",
  "call-close-btn":
    "h-10 w-10 rounded-xl border border-white/20 bg-white/10 text-white",
  "call-action-tabs": "flex gap-2.5 bg-blue-50 px-4 pt-3.5",
  "tab-btn":
    "flex-1 rounded-t-2xl border border-slate-200 border-b-0 bg-blue-100 px-4 py-3 text-sm font-semibold text-slate-600",
  "call-action-body": "flex flex-1 flex-col gap-5 overflow-y-auto p-6",
  "call-student-body": "gap-6",
  "call-logs-body": "gap-4.5",
  "student-card-section": "flex",
  "student-info-card":
    "flex flex-1 items-start gap-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-700 p-5 text-white",
  "student-avatar":
    "grid h-[72px] w-[72px] shrink-0 place-items-center rounded-2xl bg-white/15 text-3xl font-extrabold",
  "student-details-wrapper": "flex flex-1 flex-col gap-3",
  "student-summary-row": "flex flex-wrap gap-2",
  "student-summary-chip": "rounded-full px-2.5 py-1 text-[11px] font-bold",
  blue: "bg-blue-200/20 text-blue-100",
  neutral: "bg-white/10 text-slate-200",
  green: "bg-green-300/20 text-green-100",
  orange: "bg-amber-300/25 text-amber-100",
  "detail-group": "flex gap-3.5",
  "primary-group": "gap-4.5",
  "secondary-group": "gap-4.5",
  "contact-group": "gap-4",
  "meta-group": "gap-4",
  "detail-item": "flex flex-1 flex-col gap-1.5",
  "detail-label-row": "flex items-center gap-1.5 text-slate-200",
  "detail-label":
    "text-[11px] font-extrabold uppercase tracking-widest text-slate-200",
  "detail-value": "text-sm font-bold leading-relaxed text-white",
  "primary-value": "text-base font-extrabold",
  "contact-value": "font-mono text-[15px] text-blue-100",
  "grade-badge":
    "inline-flex w-fit items-center rounded-full bg-white/15 px-2.5 py-1.5 text-xs font-extrabold text-white",
  "source-badge":
    "inline-flex w-fit items-center rounded-full bg-blue-200/20 px-2.5 py-1.5 text-xs font-extrabold text-blue-50",
  "lead-id":
    "inline-flex w-fit items-center rounded-full bg-white/15 px-2.5 py-1.5 font-mono text-xs font-extrabold text-white",
  "detail-divider":
    "h-px bg-gradient-to-r from-transparent via-white/30 to-transparent",
  "action-steps-section": "flex flex-col gap-5",
  "section-title":
    "m-0 flex items-center gap-2 text-base font-extrabold text-slate-900",
  "tag-dropdown-wrapper": "relative",
  "tag-dropdown-trigger":
    "flex w-full items-center justify-between rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-left text-sm font-bold text-slate-900",
  "dropdown-value": "flex items-center gap-2.5",
  "tag-dropdown-menu":
    "absolute left-0 right-0 top-full z-[100] mt-2 max-h-72 overflow-y-auto rounded-2xl border border-blue-100 bg-white shadow-xl",
  "dropdown-item":
    "w-full border-0 bg-transparent px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700",
  "status-grid": "mt-2 grid grid-cols-2 gap-2.5",
  "status-badge":
    "rounded-2xl border border-blue-100 bg-white px-3.5 py-3 text-center text-xs font-bold text-slate-900",
  "status-badge-nurturing": "border-amber-200 bg-amber-50 text-amber-800",
  "status-badge-unsuccessful": "border-red-200 bg-red-50 text-red-800",
  "status-badge-visit-scheduled": "border-blue-200 bg-blue-50 text-blue-900",
  "status-badge-visit-completed": "border-green-200 bg-green-50 text-green-800",
  "status-badge-form-issued": "border-violet-200 bg-violet-50 text-violet-800",
  "status-badge-converted": "border-violet-200 bg-violet-50 text-violet-800",
  "status-badge-dead-leads": "border-slate-300 bg-slate-100 text-slate-700",
  "has-selection": "",
  "schedule-picker-card":
    "flex flex-col gap-3 rounded-2xl border border-blue-100 bg-gradient-to-b from-blue-50 to-blue-100/50 p-3.5",
  "schedule-picker-grid": "grid grid-cols-2 gap-3",
  "schedule-field": "flex flex-col gap-2",
  "schedule-input":
    "w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900",
  "pickup-section": "flex flex-col gap-3",
  "pickup-question": "m-0 text-sm font-bold text-slate-800",
  "pickup-choice-row": "flex flex-wrap gap-2.5",
  "pickup-choice":
    "min-h-10 rounded-full border border-blue-100 bg-white px-4 text-xs font-bold text-slate-700",
  "pickup-details-grid": "grid grid-cols-[170px_1fr] items-start gap-3",
  "pickup-field": "flex flex-col gap-2",
  "pickup-address-field": "",
  "pickup-address-input":
    "min-h-24 w-full resize-y rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900",
  "pickup-save-row": "col-span-full flex items-center gap-3",
  "field-success": "m-0 text-xs font-bold text-green-700",
  "followup-display":
    "flex items-center gap-2.5 rounded-xl border-l-4 border-amber-500 bg-amber-50 px-3.5 py-3 text-sm font-semibold text-amber-900",
  modern: "",
  "call-remarks-textarea":
    "min-h-[120px] w-full resize-y rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900",
  "field-error": "mt-1.5 mb-0 text-xs font-bold text-red-700",
  "logs-header-section": "flex items-center justify-between gap-4",
  "sort-selector": "flex gap-1 rounded-full bg-slate-200 p-1",
  "logs-list-container": "flex flex-col gap-3",
  "log-card":
    "rounded-2xl border border-blue-100 border-l-4 border-l-blue-600 bg-gradient-to-b from-white to-blue-50 p-4",
  "log-card-header": "mb-3 flex items-start justify-between gap-3",
  "log-time-section": "flex flex-col gap-0.5",
  "log-time": "text-sm font-extrabold text-slate-900",
  "log-date": "text-[11px] text-slate-500",
  "log-badges": "flex flex-wrap justify-end gap-1.5",
  "log-status-badge":
    "rounded-full bg-blue-100 px-2 py-1 text-[11px] font-extrabold text-blue-700",
  "log-tag-badge":
    "rounded-full bg-amber-200 px-2 py-1 text-[11px] font-extrabold text-amber-800",
  "log-card-body": "flex flex-col gap-2.5",
  "log-remarks-text":
    "m-0 rounded-xl bg-slate-50 p-3 text-sm leading-relaxed text-slate-700",
  "log-meta-row": "flex flex-wrap gap-2.5 text-xs",
  "log-duration-badge":
    "inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-bold text-blue-700",
  "log-template-badge":
    "inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-bold text-blue-700",
  "no-logs-placeholder": "px-6 py-12 text-center text-slate-500",
  "call-action-footer":
    "flex justify-end gap-3 border-t border-slate-200 bg-blue-50 px-6 py-4",
  "cancel-btn":
    "rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-700",
  "submit-btn":
    "inline-flex items-center gap-2 rounded-2xl bg-gradient-to-br from-blue-600 to-slate-900 px-5 py-3 text-sm font-extrabold text-white",
  active: "ring-1 ring-blue-300",
};

function mapClassName(className) {
  if (typeof className !== "string") return className;

  const mapped = className
    .split(/\s+/)
    .filter(Boolean)
    .flatMap((token) => {
      const replacement = tokenMap[token];
      return replacement ? replacement.split(/\s+/).filter(Boolean) : [token];
    })
    .join(" ");

  return mapped;
}

function remapNode(node) {
  if (!isValidElement(node)) return node;

  const props = node.props ?? {};
  const nextProps = {};

  if (typeof props.className === "string") {
    nextProps.className = mapClassName(props.className);
  }

  if (props.children !== undefined) {
    nextProps.children = Children.map(props.children, remapNode);
  }

  return cloneElement(node, nextProps);
}

export function LegacyTailwindMapper({ children }) {
  return <>{Children.map(children, remapNode)}</>;
}
