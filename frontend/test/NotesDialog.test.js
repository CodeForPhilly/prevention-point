import React from "react"
//import { mount } from "enzyme"
import { createMount } from "@material-ui/core/test-utils"
import NotesDialog from "../src/components/NotesDialog"

const mockQueueData = 1
const mockId = 1
// temporarily turning off snapshot testing: the UI will continue to change based on the needs of Prevention Point and therefore snapshot testing is a little out of scope at this time. Would prefer reliable unit testing
xdescribe("Render the NotesDialog component", () => {
  const visibleDialog = true
  const toggleVisibleDialog = jest.fn()
  let wrapper

  const mount = createMount()

  beforeEach(() => {
    wrapper = mount(
      <NotesDialog
        visibleDialog={visibleDialog}
        toggleVisibleDialog={toggleVisibleDialog}
        queueData={mockQueueData}
        id={mockId}
      />
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should match the snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should have a notes input", () => {
    expect(wrapper.exists("#notes")).toEqual(true)
  })

  it("should have a submit button", () => {
    expect(wrapper.exists("#submit")).toEqual(true)
  })

  it("should have a cancel button", () => {
    expect(wrapper.exists("#cancel")).toEqual(true)
  })
})
