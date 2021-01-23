import { validateForm, VISIT_SCHEMA } from "../src/validation/index"

let MOCK_SCHEMA = {
  id: 1,
  participant: 111,
  program: 1,
  service: 1,
  urgency: 1,
  notes: "Blah notes and such!",
}

describe("Visit Schema Validation", () => {
  it("should not return any errors", async () => {
    const validationErrors = await validateForm(MOCK_SCHEMA, VISIT_SCHEMA)
    expect(validationErrors.length).toEqual(0)
  })

  it("should not return any errors with null id", async () => {
    MOCK_SCHEMA.id = null
    const validationErrors = await validateForm(MOCK_SCHEMA, VISIT_SCHEMA)
    expect(validationErrors.length).toEqual(0)
    MOCK_SCHEMA.id = 1
  })

  it("should return one error without program", async () => {
    MOCK_SCHEMA.program = null
    const validationErrors = await validateForm(MOCK_SCHEMA, VISIT_SCHEMA)
    expect(validationErrors.length).toEqual(1)
    expect(validationErrors[0].name).toEqual("program")
    MOCK_SCHEMA.program = 1
  })

  it("should return one error when program is a string", async () => {
    MOCK_SCHEMA.program = "1"
    const validationErrors = await validateForm(MOCK_SCHEMA, VISIT_SCHEMA)
    expect(validationErrors.length).toEqual(1)
    expect(validationErrors[0].name).toEqual("program")
    MOCK_SCHEMA.program = 1
  })

  it("should return one error without service", async () => {
    MOCK_SCHEMA.service = null
    const validationErrors = await validateForm(MOCK_SCHEMA, VISIT_SCHEMA)
    expect(validationErrors.length).toEqual(1)
    expect(validationErrors[0].name).toEqual("service")
    MOCK_SCHEMA.service = 1
  })

  it("should return one error when service is a string", async () => {
    MOCK_SCHEMA.service = "2"
    const validationErrors = await validateForm(MOCK_SCHEMA, VISIT_SCHEMA)
    expect(validationErrors.length).toEqual(1)
    expect(validationErrors[0].name).toEqual("service")
    MOCK_SCHEMA.service = 1
  })

  it("should return one error without urgency", async () => {
    MOCK_SCHEMA.urgency = null
    const validationErrors = await validateForm(MOCK_SCHEMA, VISIT_SCHEMA)
    expect(validationErrors.length).toEqual(1)
    expect(validationErrors[0].name).toEqual("urgency")
    MOCK_SCHEMA.urgency = 1
  })

  it("should return one error when urgency is a string", async () => {
    MOCK_SCHEMA.urgency = "4"
    const validationErrors = await validateForm(MOCK_SCHEMA, VISIT_SCHEMA)
    expect(validationErrors.length).toEqual(1)
    expect(validationErrors[0].name).toEqual("urgency")
    MOCK_SCHEMA.urgency = 1
  })
})
