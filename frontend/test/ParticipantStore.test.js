import { ParticipantStore } from "../src/stores/ParticipantStore"
import { format } from "date-fns"

//Test the participant store actions
describe("Participant Store", () => {
  const store = new ParticipantStore()

  //Setters
  it("sets an is editing flag", () => {
    store.setIsEditing(true)
    expect(store.isEditing).toBe(true)
  })

  it("sets a participant from user data", () => {
    let startDate = format(new Date("1989-07-13"), "yyyy-MM-dd")
    let data = {
      id: 1,
      first_name: "Buck",
      last_name: "Turgison",
      last_four_ssn: 1234,
      date_of_birth: "10-28-1929",
      start_date: startDate,
      pp_id: "12345",
      sep_id: "12345",
      maiden_name: "Strangelove",
      race: "white (caucasian)",
      gender: "male",
      is_insured: true,
      insuranceType: "Medical",
      insurer: "Strategic Air Command",
    }
    store.setParticipant(data)
    expect(store.participant.id).toBe(1)
    expect(store.participant.first_name).toBe("Buck")
    expect(store.participant.last_name).toBe("Turgison")
    expect(store.participant.last_four_ssn).toBe(1234)
    expect(store.participant.date_of_birth).toBe("10-28-1929")
    expect(store.participant.start_date).toBe(startDate)
    expect(store.participant.pp_id).toBe("12345")
    expect(store.participant.sep_id).toBe("12345")
    expect(store.participant.maiden_name).toBe("Strangelove")
    expect(store.participant.race).toBe("white (caucasian)")
    expect(store.participant.gender).toBe("male")
    expect(store.participant.is_insured).toBe(true)
    expect(store.participant.insuranceType).toBe("Medical")
    expect(store.participant.insurer).toBe("Strategic Air Command")
  })

  it("sets a visit from user data", () => {
    let data = {
      id: 1,
      participant: 11,
      program: "4",
      service: "2",
      notes: "Blah blah notes blah",
      urgency: "Time Sensitive",
    }
    store.setVisit(data)
    expect(store.visit.id).toBe(1)
    expect(store.visit.participant).toBe(11)
    expect(store.visit.program).toBe("4")
    expect(store.visit.service).toBe("2")
    expect(store.visit.notes).toBe("Blah blah notes blah")
    expect(store.visit.urgency).toBe("Time Sensitive")
  })

  it("sets insurers from user data", () => {
    let data = Array(1, 2, 3, 4, 5, 6, 7)
    store.setInsurers(data)
    expect(store.insurers.length).toBe(7)
  })

  it("sets insurer from user data and enforces stringness", () => {
    store.setInsurer(1)
    expect(store.participant.insurer).toBe("1")
  })

  it("sets ppid & last four SSN from user data", () => {
    store.setPPId("ab1234")
    expect(store.participant.pp_id).toBe("ab1234")
    expect(store.participant.last_four_ssn).toBe("1234")
  })

  //   it("sets last four digits of SSN from user data", () => {})

  //   it("sets visit program from user data", () => {})

  //   it("sets visit service from user data", () => {})

  //   it("sets the route to the queue table", () => {})

  //   it("sets the participant id from user data", () => {})

  //   it("sets the services list", () => {})

  //   it("sets the visits list", () => {})

  //   it("sets the sites list", () => {})

  //   it("sets the current site", () => {})

  //   it("sets the visit data", () => {})

  //   //State actions
  it("creates a default participant", () => {
    store.setDefaultParticipant()
    let startDate = format(new Date(), "yyyy-MM-dd")
    expect(store.participant.id).toBe(null)
    expect(store.participant.first_name).toBe("")
    expect(store.participant.last_name).toBe("")
    expect(store.participant.last_four_ssn).toBe(0)
    expect(store.participant.date_of_birth).toBe("")
    expect(store.participant.start_date).toBe(startDate)
    expect(store.participant.pp_id).toBe("")
    expect(store.participant.sep_id).toBe("")
    expect(store.participant.maiden_name).toBe("")
    expect(store.participant.race).toBe("")
    expect(store.participant.gender).toBe("")
    expect(store.participant.is_insured).toBe(false)
    expect(store.participant.insuranceType).toBe("")
    expect(store.participant.insurer).toBe("")
  })

  it("creates a default visit", () => {
    store.setDefaultVisit()
    expect(store.visit.id).toBe(null)
    expect(store.visit.participant).toBe(null)
    expect(store.visit.program).toBe("")
    expect(store.visit.service).toBe("")
    expect(store.visit.notes).toBe("")
    expect(store.visit.urgency).toBe("")
  })

  it("creates a participant list", () => {
    let data = Array(1, 2, 3, 4, 5)
    store.setParticipantsList(data)
    expect(store.participants.length).toBe(5)
  })

  it("creates an empty participant list", () => {
    let data = "not an array"
    store.setParticipantsList(data)
    expect(store.participants.length).toBe(0)
  })

  //   it("handles changes to participant data", () => {})

  //   it("handles changes to visit data", () => {})

  //   it("creates a new participant", () => {})

  //   it("creates a visit", () => {})

  //   it("creates a front desk event", () => {})

  //   it("creates SEP", () => {})

  //   it("updates a participant", () => {})

  //   it("updates a visit", () => {})

  //   //Utility functions
  //   it("creates a start date", () => {})

  //   //Getters
  //   it("gets insurers", () => {})

  //   it("gets programs", () => {})

  //   it("gets a participant", () => {})

  //   it("gets participant visits", () => {})

  //   it("gets participants", () => {})

  //   it("gets visits", () => {})

  //   it("gets sites", () => {})

  //   it("gets protected visit data", () => {})
})
