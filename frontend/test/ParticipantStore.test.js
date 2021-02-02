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
      sep_id: "ab12345",
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
    expect(store.participant.sep_id).toBe("ab12345")
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

  it("sets last four digits of SSN from user data", () => {
    store.setLastFourSSN("1234")
    expect(store.participant.last_four_ssn).toBe("1234")
  })

  it("lowercases sep_id", () => {
    store.setSEPID("ABCD1234")
    expect(store.participant.sep_id).toBe("abcd1234")
  })

  it("sets visit program from user data", () => {
    let data = [
      {
        id: 1,
        name: "test1",
        is_closed: false,
        is_frozen: false,
        has_queue: false,
      },
      {
        id: 2,
        name: "test2",
        is_closed: false,
        is_frozen: false,
        has_queue: false,
      },
      {
        id: 3,
        name: "test3",
        is_closed: false,
        is_frozen: false,
        has_queue: false,
      },
      {
        id: 4,
        name: "test4",
        is_closed: true,
        is_frozen: true,
        has_queue: false,
      },
      {
        id: 5,
        name: "test5",
        is_closed: true,
        is_frozen: true,
        has_queue: false,
      },
    ]
    store.setPrograms(data)
    expect(store.programs.length).toBe(3)
  })

  it("sets visit program, visit service and services list from user data", () => {
    let programID = 3
    let data = [
      {
        id: 1,
        name: "test1",
        is_closed: false,
        is_frozen: false,
        has_queue: false,
        services: Array(1),
      },
      {
        id: 2,
        name: "test2",
        is_closed: false,
        is_frozen: false,
        has_queue: false,
        services: Array(1, 2),
      },
      {
        id: 3,
        name: "test3",
        is_closed: false,
        is_frozen: false,
        has_queue: false,
        services: Array(1, 2, 3),
      },
      {
        id: 4,
        name: "test4",
        is_closed: true,
        is_frozen: true,
        has_queue: false,
        services: Array(1, 2, 3, 4),
      },
      {
        id: 5,
        name: "test5",
        is_closed: true,
        is_frozen: true,
        has_queue: false,
        services: Array(1, 2, 3, 4, 5),
      },
    ]
    store.setPrograms(data)
    store.setVisitProgram(programID)
    expect(store.visit.service).toBe("")
    expect(store.visit.program).toBe(3)
    expect(store.services.length).toBe(3)
  })

  it("sets the route to the queue table", () => {
    expect(store.routeToQueueTable).toBe(false)
    store.setRouteToQueue(true)
    expect(store.routeToQueueTable).toBe(true)
  })

  it("sets the participant id from user data", () => {
    let id = 1
    store.setVisitParticipantId(id)
    expect(store.visit.participant).toBe(1)
  })

  it("sets the visit list", () => {
    let data = Array(1, 2, 3, 4, 5)
    store.setVisitsList(data)
    expect(store.visitList.length).toBe(5)
  })

  it("sets the site list", () => {
    let data = [
      { id: 1, site_name: "test1", site_type: "hq" },
      { id: 2, site_name: "test2", site_type: "hq2" },
      { id: 3, site_name: "test3", site_type: "hq3" },
      { id: 4, site_name: "test4", site_type: "hq4" },
      { id: 5, site_name: "test5", site_type: "hq5" },
    ]
    store.setSites(data)
    expect(store.sites.length).toBe(5)
    expect(store.sites[3].id).toBe(4)
  })

  it("sets the current site", () => {
    let data = [
      { id: 1, site_name: "test1", site_type: "hq" },
      { id: 2, site_name: "test2", site_type: "hq2" },
      { id: 3, site_name: "test3", site_type: "hq3" },
      { id: 4, site_name: "test4", site_type: "hq4" },
      { id: 5, site_name: "test5", site_type: "hq5" },
    ]
    store.setCurrentSite(data[1])
    expect(store.currentSite.id).toBe(2)
  })

  it("sets the visit data", () => {
    let data = {
      id: 5,
      participant: 5,
      URGENCY_LEVEL: { TIME_SENSITIVE: 1 },
      program: 5,
      service: 1,
      notes: "blah five five five",
      urgency: "TIME_SENSITIVE",
    }
    store.setVisitData(data)
    expect(store.visitData.id).toBe(5)
    expect(store.visitData.urgency).toBe("TIME_SENSITIVE")
  })

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

  it("handles changes to participant data", () => {
    store.handleParticipantChange({ name: "is_insured", value: "true" })
    expect(store.participant.is_insured).toBe(true)
    store.handleParticipantChange({ name: "pp_id", value: "ab1234" })
    expect(store.participant.pp_id).toBe("ab1234")
    store.handleParticipantChange({ name: "insurer", value: 2 })
    expect(store.participant.insurer).toBe("2")
  })

  it("handles changes to visit data", () => {
    store.handleVisitChange({ name: "test", value: 7 })
    expect(store.visit.test).toBe(7)
  })

  //Utility functions
  it("creates a start date", () => {
    let newDate = format(new Date("07-13-1989"), "yyyy-MM-dd")
    expect(newDate).toBe("1989-07-13")
  })
})
