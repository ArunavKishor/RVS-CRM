export const assignedRows = [
  {
    leadId: "LD-1001",
    student: "Ishita Sharma",
    parent: "Ravi Sharma",
    contact: "+91 98765 1001",
    grade: "Grade 8",
    source: "Website",
    stage: "Lead",
    active: true,
  },
  {
    leadId: "LD-1002",
    student: "Rahul Verma",
    parent: "Sunita Verma",
    contact: "+91 98765 1002",
    grade: "Grade 6",
    source: "Walk-in",
    stage: "Lead",
    locked: true,
  },
  {
    leadId: "LD-1003",
    student: "Aarav Mehta",
    parent: "Sunita Mehta",
    contact: "+91 98765 1003",
    grade: "Grade 5",
    source: "Instagram",
    stage: "Lead",
    active: true,
  },
  {
    leadId: "LD-1004",
    student: "Kavya Jain",
    parent: "Manoj Jain",
    contact: "+91 98765 1004",
    grade: "Grade 7",
    source: "Reference",
    stage: "Lead",
    locked: true,
  },
  {
    leadId: "LD-1005",
    student: "Ananya Patel",
    parent: "Ritu Patel",
    contact: "+91 98765 1005",
    grade: "Grade 9",
    source: "Facebook",
    stage: "Contacted",
    active: true,
  },
  {
    leadId: "LD-1006",
    student: "Vikram Singh",
    parent: "Poonam Singh",
    contact: "+91 98765 1006",
    grade: "Grade 10",
    source: "Website",
    stage: "Contacted",
    locked: true,
  },
  {
    leadId: "LD-1007",
    student: "Sneha Reddy",
    parent: "Mohan Reddy",
    contact: "+91 98765 1007",
    grade: "Grade 11",
    source: "Walk-in",
    stage: "Nurturing",
    active: true,
  },
  {
    leadId: "LD-1008",
    student: "Arjun Mehta",
    parent: "Nidhi Mehta",
    contact: "+91 98765 1008",
    grade: "Grade 8",
    source: "Referral",
    stage: "Nurturing",
    locked: true,
  },
  {
    leadId: "LD-1009",
    student: "Kavya Jain",
    parent: "Anil Jain",
    contact: "+91 98765 1009",
    grade: "Grade 7",
    source: "Website",
    stage: "Visit Scheduled",
    active: true,
  },
  {
    leadId: "LD-1010",
    student: "Manav Nair",
    parent: "Deepa Nair",
    contact: "+91 98765 1010",
    grade: "Grade 12",
    source: "Walk-in",
    stage: "Visit Completed",
    active: true,
  },
  {
    leadId: "LD-1011",
    student: "Ira Kapoor",
    parent: "Saurabh Kapoor",
    contact: "+91 98765 1011",
    grade: "Grade 9",
    source: "Instagram",
    stage: "Form Issued",
    active: true,
  },
  {
    leadId: "LD-1012",
    student: "Rishi Solanki",
    parent: "Seema Solanki",
    contact: "+91 98765 1012",
    grade: "Grade 10",
    source: "Facebook",
    stage: "Unsuccessful",
    active: true,
  },
  {
    leadId: "LD-1013",
    student: "Pallavi Rao",
    parent: "Raghu Rao",
    contact: "+91 98765 1013",
    grade: "Grade 11",
    source: "Website",
    stage: "Dead Leads",
    active: true,
  },
  {
    leadId: "LD-1014",
    student: "Aman Tiwari",
    parent: "Kusum Tiwari",
    contact: "+91 98765 1014",
    grade: "Grade 8",
    source: "Reference",
    stage: "Converted",
    active: true,
  },
  {
    leadId: "LD-1015",
    student: "Neha Das",
    parent: "Rohit Das",
    contact: "+91 98765 1015",
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

export function buildAssignedRows() {
  const leadSeedRows = assignedRows.filter((row) => row.stage === "Lead");

  const createContactNumber = (leadId) => {
    const leadDigits = leadId.replace(/\D/g, "").slice(-4).padStart(4, "0");
    return `+91 98765 ${leadDigits}`;
  };

  const leadStageRows = Array.from({ length: 30 }, (_, index) => {
    const rowNumber = index + 1;
    const isActive = rowNumber % 2 === 1;
    const grade = 1 + (index % 12);

    return {
      leadId: `LD-L${String(rowNumber).padStart(3, "0")}`,
      student: `Lead Student ${rowNumber}`,
      parent: `Lead Parent ${rowNumber}`,
      contact: createContactNumber(`LD-L${String(rowNumber).padStart(3, "0")}`),
      grade: `Grade ${grade}`,
      source: sourcePool[index % sourcePool.length],
      stage: "Lead",
      active: isActive,
      locked: !isActive,
    };
  });

  return [...leadSeedRows, ...leadStageRows];
}
