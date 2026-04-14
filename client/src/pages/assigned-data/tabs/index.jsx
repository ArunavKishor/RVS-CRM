import { LeadTab } from "./LeadTab.jsx";
import { ContactedTab } from "./ContactedTab.jsx";
import { NurturingTab } from "./NurturingTab.jsx";
import { VisitScheduledTab } from "./VisitScheduledTab.jsx";
import { VisitCompletedTab } from "./VisitCompletedTab.jsx";
import { FormIssuedTab } from "./FormIssuedTab.jsx";
import { UnsuccessfulTab } from "./UnsuccessfulTab.jsx";
import { DeadLeadsTab } from "./DeadLeadsTab.jsx";
import { ConvertedTab } from "./ConvertedTab.jsx";

export const tabComponentsByStage = {
  Lead: LeadTab,
  Contacted: ContactedTab,
  Nurturing: NurturingTab,
  "Visit Scheduled": VisitScheduledTab,
  "Visit Completed": VisitCompletedTab,
  "Form Issued": FormIssuedTab,
  Unsuccessful: UnsuccessfulTab,
  "Dead Leads": DeadLeadsTab,
  Converted: ConvertedTab,
};
