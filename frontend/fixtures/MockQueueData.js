let id = 0
function createData(urgency, uid, last, timeElapsed, status, seen) {
  id += 1
  return { id, urgency, uid, last, timeElapsed, status, seen }
}

//TODO: remove mockup data
export const caseManagementQueueData = {
  id: "case_management",
  name: "Case Management",
  waitTime: "10 minutes",
  length: 2,
  rows: [
    createData(1, "FL159", "Last", "1:23 PM", "checkedIn", true),
    createData(1, "FL237", "Last", "1:23 PM", "checkedIn", false),
  ],
}
export const legalServicesQueueData = {
  id: "legal_services",
  name: "Legal Services",
  waitTime: "5 minutes",
  length: 3,
  rows: [
    createData(1, "FL262", "Last", "1:23 PM", "checkedIn", false),
    createData(1, "FL305", "Last", "1:23 PM", "checkedIn", false),
    createData(3, "FL356", "Last", "1:23 PM", "checkedIn", false),
  ],
}
export const stepQueueData = {
  id: "step",
  name: "Step",
  waitTime: "7 minutes",
  length: 5,
  rows: [
    createData(1, "FL159", "Last", "1:23 PM", "checkedIn", false),
    createData(1, "FL237", "Last", "1:23 PM", "checkedIn", false),
    createData(3, "FL262", "Last", "1:23 PM", "checkedIn", true),
    createData(1, "FL305", "Last", "1:23 PM", "checkedIn", false),
    createData(5, "FL356", "Last", "1:23 PM", "checkedIn", true),
  ],
}
