// import React from "react"
// import { mount } from "enzyme"

import { create } from "./../src/api/index"

describe("Test the visits API endpoint", () => {
  let createAPI

  beforeEach(() => {
    createAPI = create()
  })

  it("api should be defined", () => {
    expect(1).toBe(1)
    expect(createAPI.getVisits).toBeDefined()
  })
})
