// Queue Table Constants
export const STATUS_OPTIONS = [
  { value: "ARRIVED", name: "Waiting" },
  { value: "STEPPED_OUT", name: "Stepped Out" },
  { value: "LEFT", name: "Left" },
]

// urgency values, 1 is least urgent
export const URGENCY_OPTIONS = [
  { value: 1, name: "Time Sensitive" },
  { value: 2, name: "Brief Visit" },
  { value: 3, name: "Urgent" },
  { value: 4, name: "Crisis" },
]

export const PARTICIPANT_LIST_TABLE_TITLES = [
  { value: true, name: "PPID" },
  { value: true, name: "First Name" },
  { value: true, name: "Last Name" },
  { value: false, name: "Gender" },
  { value: false, name: "DOB" },
  { value: false, name: "Race" },
  { value: true, name: "Edit Participant" },
]

export const PARTICIPANT_RACE_OPTIONS = [
  { value: "asian pi", name: "Asian" },
  { value: "black (african american)", name: "Black or African American" },
  { value: "latino", name: "Hispanic or Latino" },
  { value: "native american", name: "Native American" },
  { value: "white (caucasian)", name: "White or Caucasian" },
  { value: "other", name: "Other" },
]

export const PARTICIPANT_GENDER_OPTIONS = [
  { value: "male", name: "Male" },
  { value: "female", name: "Female" },
  { value: "mtf", name: "Male to Female" },
  { value: "ftm", name: "Female to Male" },
  { value: "gender queer", name: "Gender Queer" },
  { value: "other", name: "Other" },
]

// values for sidebarView
export const SEARCH = "SEARCH"
export const SEP = "SEP"
