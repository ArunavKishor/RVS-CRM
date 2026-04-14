export const assignedRows = [
  {
    leadId: "LD-1001",
    student: "Ishita Sharma",
    parent: "Ravi Sharma",
    contact: "••••••••••",
    grade: "Grade 8",
    source: "Website",
    stage: "Lead",
    active: true,
  },
  {
    leadId: "LD-1002",
    student: "Rahul Verma",
    parent: "Sunita Verma",
    contact: "••••••••••",
    grade: "Grade 6",
    source: "Walk-in",
    stage: "Lead",
    locked: true,
  },
  {
    leadId: "LD-1003",
    student: "Aarav Mehta",
    parent: "Sunita Mehta",
    contact: "••••••••••",
    grade: "Grade 5",
    source: "Instagram",
    stage: "Lead",
    active: true,
  },
  {
    leadId: "LD-1004",
    student: "Kavya Jain",
    parent: "Manoj Jain",
    contact: "••••••••••",
    grade: "Grade 7",
    source: "Reference",
    stage: "Lead",
    locked: true,
  },
  {
    leadId: "LD-1005",
    student: "Ananya Patel",
    parent: "Ritu Patel",
    contact: "••••••••••",
    grade: "Grade 9",
    source: "Facebook",
    stage: "Contacted",
    active: true,
  },
  {
    leadId: "LD-1006",
    student: "Vikram Singh",
    parent: "Poonam Singh",
    contact: "••••••••••",
    grade: "Grade 10",
    source: "Website",
    stage: "Contacted",
    locked: true,
  },
  {
    leadId: "LD-1007",
    student: "Sneha Reddy",
    parent: "Mohan Reddy",
    contact: "••••••••••",
    grade: "Grade 11",
    source: "Walk-in",
    stage: "Nurturing",
    active: true,
  },
  {
    leadId: "LD-1008",
    student: "Arjun Mehta",
    parent: "Nidhi Mehta",
    contact: "••••••••••",
    grade: "Grade 8",
    source: "Referral",
    stage: "Nurturing",
    locked: true,
  },
  {
    leadId: "LD-1009",
    student: "Kavya Jain",
    parent: "Anil Jain",
    contact: "••••••••••",
    grade: "Grade 7",
    source: "Website",
    stage: "Visit Scheduled",
    active: true,
  },
  {
    leadId: "LD-1010",
    student: "Manav Nair",
    parent: "Deepa Nair",
    contact: "••••••••••",
    grade: "Grade 12",
    source: "Walk-in",
    stage: "Visit Completed",
    active: true,
  },
  {
    leadId: "LD-1011",
    student: "Ira Kapoor",
    parent: "Saurabh Kapoor",
    contact: "••••••••••",
    grade: "Grade 9",
    source: "Instagram",
    stage: "Form Issued",
    active: true,
  },
  {
    leadId: "LD-1012",
    student: "Rishi Solanki",
    parent: "Seema Solanki",
    contact: "••••••••••",
    grade: "Grade 10",
    source: "Facebook",
    stage: "Unsuccessful",
    active: true,
  },
  {
    leadId: "LD-1013",
    student: "Pallavi Rao",
    parent: "Raghu Rao",
    contact: "••••••••••",
    grade: "Grade 11",
    source: "Website",
    stage: "Dead Leads",
    active: true,
  },
  {
    leadId: "LD-1014",
    student: "Aman Tiwari",
    parent: "Kusum Tiwari",
    contact: "••••••••••",
    grade: "Grade 8",
    source: "Reference",
    stage: "Converted",
    active: true,
  },
  {
    leadId: "LD-1015",
    student: "Neha Das",
    parent: "Rohit Das",
    contact: "••••••••••",
    grade: "Grade 6",
    source: "Walk-in",
    stage: "Converted",
    locked: true,
  },
];

const sourcePool = [
  "Website",
  "Walk-in",
  "Instagram",
  "Facebook",
  "Reference",
  "Google Ads",
  "YouTube",
  "WhatsApp Campaign",
];

export function buildAssignedRows(stageTabs) {
  const generatedRows = Array.from({ length: 35 }, (_, index) => {
    const id = index + 1;
    const stage = stageTabs[index % stageTabs.length];
    const isActive = id % 2 === 1;
    const grade = 1 + (index % 12);

    return {
      leadId: `LD-${1016 + id}`,
      student: `Dummy Student ${id}`,
      parent: `Parent ${id}`,
      contact: isActive ? `+91 98${(10000000 + id).toString()}` : "••••••••••",
      grade: `Grade ${grade}`,
      source: sourcePool[index % sourcePool.length],
      stage,
      active: isActive,
      locked: !isActive,
    };
  });

  const leadStageRows = Array.from({ length: 30 }, (_, index) => {
    const rowNumber = index + 1;
    const isActive = rowNumber % 2 === 1;
    const grade = 1 + (index % 12);

    return {
      leadId: `LD-L${String(rowNumber).padStart(3, "0")}`,
      student: `Lead Student ${rowNumber}`,
      parent: `Lead Parent ${rowNumber}`,
      contact: isActive ? `+91 97${String(6000000 + rowNumber)}` : "••••••••••",
      grade: `Grade ${grade}`,
      source: sourcePool[index % sourcePool.length],
      stage: "Lead",
      active: isActive,
      locked: !isActive,
    };
  });

  return [...assignedRows, ...generatedRows, ...leadStageRows];
}
