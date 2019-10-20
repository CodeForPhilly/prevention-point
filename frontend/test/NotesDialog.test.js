import React from "react"
import { mount } from "enzyme"

import NotesDialog from "../src/components/NotesDialog"

describe("Render the NotesDialog component", () => {
  const visibleDialog = true
  const toggleVisibleDialog = jest.fn()
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <NotesDialog
        visibleDialog={visibleDialog}
        toggleVisibleDialog={toggleVisibleDialog}
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
