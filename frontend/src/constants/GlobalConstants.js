// Queue Table Constants
export const STATUS_OPTIONS = [
  { value: "ARRIVED", name: "Waiting" },
  { value: "STEPPED_OUT", name: "Stepped Out" },
  { value: "LEFT", name: "Left" },
]

// urgency values, 1 is least urgent
const URGENCY_ENUM = {
  TIME_SENSITIVE: 1,
  BRIEF_VISIT: 2,
  URGENT: 3,
  CRISIS: 4,
}

export const URGENCY_OPTIONS = [
  { value: URGENCY_ENUM.TIME_SENSITIVE, name: "Time Sensitive" },
  { value: URGENCY_ENUM.BRIEF_VISIT, name: "Brief Visit" },
  { value: URGENCY_ENUM.URGENT, name: "Urgent" },
  { value: URGENCY_ENUM.CRISIS, name: "Crisis" },
]

export const PARTICIPANT_LIST_TABLE_TITLES = [
  "PPID",
  "First Name",
  "Last Name",
  "Gender",
  "DOB",
  "Race",
  "Edit Participant",
]
