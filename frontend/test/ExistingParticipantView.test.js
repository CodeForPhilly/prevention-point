import { render } from "@testing-library/react"
import React from "react"
import ExistingParticipantView from "../src/views/ExistingParticipantView"
import { BrowserRouter } from "react-router-dom"

describe("<ExistingParticipantView />", () => {
  it("should render an ExistingParticipantView component", () => {
    render(
      <BrowserRouter>
        <ExistingParticipantView />
      </BrowserRouter>
    )
  })

  //  TODO: Mock a mobx store for tests to render the Participant Form correctly
})
