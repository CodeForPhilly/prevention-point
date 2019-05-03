import React from "react"
import { shallow } from "enzyme"

import App from "../src/App"

describe("Render the app", () => {
  it("renders without crashing", () => {
    shallow(<App />)
  })
})
