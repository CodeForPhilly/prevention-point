import { validateForm, PARTICIPANT_SCHEMA } from "../src/validation/index"

let MOCK_SCHEMA = {
  first_name: "ted",
  last_name: "nougat",
  date_of_birth: new Date("1989-07-13"),
  pp_id: "sb12345",
  sep_id: "sd1234",
  maiden_name: "Haroldson",
  is_insured: true,
  insurer: "7",
}

describe("Participant Schema Validation", () => {
  it("should not return any errors initially", async () => {
    const validationErrors = await validateForm(MOCK_SCHEMA, PARTICIPANT_SCHEMA)
    expect(validationErrors.length).toEqual(0)
  })

  it("participant needs a first name", async () => {
    MOCK_SCHEMA.first_name = null
    const validationErrors = await validateForm(MOCK_SCHEMA, PARTICIPANT_SCHEMA)
    expect(validationErrors[0].name).toEqual("first_name")
    expect(validationErrors.length).toEqual(1)
  })

  it("participant first name should be a minimum of 2 characters long", async () => {
    MOCK_SCHEMA.first_name = "t"
    const validationErrors = await validateForm(MOCK_SCHEMA, PARTICIPANT_SCHEMA)
    expect(validationErrors[0].name).toEqual("first_name")
    expect(validationErrors.length).toEqual(1)
    MOCK_SCHEMA.first_name = "ted"
  })

  it("participant needs a last name", async () => {
    MOCK_SCHEMA.last_name = null
    const validationErrors = await validateForm(MOCK_SCHEMA, PARTICIPANT_SCHEMA)
    expect(validationErrors[0].name).toEqual("last_name")
    expect(validationErrors.length).toEqual(1)
  })

  it("participant last name should be a minimum of 2 characters long", async () => {
    MOCK_SCHEMA.last_name = "n"
    const validationErrors = await validateForm(MOCK_SCHEMA, PARTICIPANT_SCHEMA)
    expect(validationErrors[0].name).toEqual("last_name")
    expect(validationErrors.length).toEqual(1)
    MOCK_SCHEMA.last_name = "nougat"
  })

  it("should return an error when date of birth is earlier than 12/31/1899, 31/12/1899 for our Euro friends", async () => {
    MOCK_SCHEMA.date_of_birth = new Date("1899-12-30")
    const validationErrors = await validateForm(MOCK_SCHEMA, PARTICIPANT_SCHEMA)
    expect(validationErrors[0].name).toEqual("date_of_birth")
    expect(validationErrors.length).toEqual(1)
  })

  it("should return an error when date of birth is in the future", async () => {
    MOCK_SCHEMA.date_of_birth = new Date("2100-01-01")
    const validationErrors = await validateForm(MOCK_SCHEMA, PARTICIPANT_SCHEMA)
    expect(validationErrors[0].name).toEqual("date_of_birth")
    expect(validationErrors.length).toEqual(1)
    MOCK_SCHEMA.date_of_birth = new Date("1989-07-13")
  })

  it("should return an error when ppid is null", async () => {
    MOCK_SCHEMA.pp_id = null
    const validationErrors = await validateForm(MOCK_SCHEMA, PARTICIPANT_SCHEMA)
    expect(validationErrors[0].name).toEqual("pp_id")
    expect(validationErrors.length).toEqual(1)
  })

  it("should return an error when ppid is not string", async () => {
    MOCK_SCHEMA.pp_id = 12345
    const validationErrors = await validateForm(MOCK_SCHEMA, PARTICIPANT_SCHEMA)
    expect(validationErrors[0].name).toEqual("pp_id")
    expect(validationErrors.length).toEqual(1)
  })

  it("should return an error when ppid is less than 4 characters long", async () => {
    MOCK_SCHEMA.pp_id = "123"
    const validationErrors = await validateForm(MOCK_SCHEMA, PARTICIPANT_SCHEMA)
    expect(validationErrors[0].name).toEqual("pp_id")
    expect(validationErrors.length).toEqual(1)
    MOCK_SCHEMA.pp_id = "12345"
  })

  it("should return an error when sep_id is null", async () => {
    MOCK_SCHEMA.sep_id = null
    const validationErrors = await validateForm(MOCK_SCHEMA, PARTICIPANT_SCHEMA)
    expect(validationErrors[0].name).toEqual("sep_id")
    expect(validationErrors.length).toEqual(1)
  })

  it("should return an error when sep_id is not string", async () => {
    MOCK_SCHEMA.sep_id = 12345
    const validationErrors = await validateForm(MOCK_SCHEMA, PARTICIPANT_SCHEMA)
    expect(validationErrors[0].name).toEqual("sep_id")
    expect(validationErrors.length).toEqual(1)
    MOCK_SCHEMA.sep_id = "sd1234"
  })

  it("should return an error when is_insured is not bool", async () => {
    MOCK_SCHEMA.is_insured = "true"
    const validationErrors = await validateForm(MOCK_SCHEMA, PARTICIPANT_SCHEMA)
    expect(validationErrors[0].name).toEqual("is_insured")
    expect(validationErrors.length).toEqual(1)
  })

  it("should return an error when is_insured is true and insurer is not string", async () => {
    MOCK_SCHEMA.is_insured = true
    MOCK_SCHEMA.insurer = 8
    const validationErrors = await validateForm(MOCK_SCHEMA, PARTICIPANT_SCHEMA)
    expect(validationErrors[0].name).toEqual("insurer")
    expect(validationErrors.length).toEqual(1)
  })

  it("should return an error when is_insured is true and insurer is a string without digits", async () => {
    MOCK_SCHEMA.insurer = "a"
    const validationErrors = await validateForm(MOCK_SCHEMA, PARTICIPANT_SCHEMA)
    expect(validationErrors[0].name).toEqual("insurer")
    expect(validationErrors.length).toEqual(1)
  })
})
