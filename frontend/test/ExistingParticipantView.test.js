import { render } from "@testing-library/react"
import React from "react"
import ExistingParticipantView from "../src/views/ExistingParticipantView"
import { BrowserRouter } from "react-router-dom"
import { RootStore, RootStoreContext } from "../src/stores/RootStore"

const mockRootStore = new RootStore()
mockRootStore.ParticipantStore.setParticipant({
  id: 6,
  pp_id: "ZG0DI",
  sep_id: 41673,
  first_name: "Erik",
  last_name: "Wagner",
  last_four_ssn: "7241",
  race: "white (caucasian)",
  gender: "mtf",
  date_of_birth: "1967-05-31",
  start_date: "1989-12-05",
  is_insured: false,
  insurer: 4,
  maiden_name: "Hernandez",
})

describe("<ExistingParticipantView />", () => {
  it("should render an ExistingParticipantView component", () => {
    render(
      <RootStoreContext.Provider value={mockRootStore}>
        <BrowserRouter>
          <ExistingParticipantView />
        </BrowserRouter>
      </RootStoreContext.Provider>
    )
  })
})
