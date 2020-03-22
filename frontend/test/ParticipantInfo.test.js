import React from "react"
import { render } from "@testing-library/react"
import ParticipantInfo from "../src/components/ParticipantInfo"
import { BrowserRouter } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const Wrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>

describe("ParticipantInfo Tests", () => {
  it("should render without errors w/ no props", () => {
    render(<ParticipantInfo />, { wrapper: Wrapper })
  })
})
