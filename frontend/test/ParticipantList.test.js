import { render } from "@testing-library/react"
import React from "react"
import ParticipantList from "../src/views/ParticipantList"
import { BrowserRouter } from "react-router-dom"

import { RootStore, RootStoreContext } from "../src/stores/RootStore"

const mockRootStore = new RootStore()
mockRootStore.ParticipantStore.setParticipantsList([
  {
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
  },
  {
    id: 7,
    pp_id: "8AXHR",
    sep_id: 10009,
    first_name: "Gabriella",
    last_name: "Brown",
    last_four_ssn: "8294",
    race: "asian pi",
    gender: "other",
    date_of_birth: "2003-02-13",
    start_date: "1977-06-18",
    is_insured: true,
    insurer: 1,
    maiden_name: "Flores",
  },
])

describe("<ParticipantList />", () => {
  it("should render a ParticipantList component", () => {
    render(
      <RootStoreContext.Provider value={new RootStore()}>
        <BrowserRouter>
          <ParticipantList />
        </BrowserRouter>
      </RootStoreContext.Provider>
    )
  })

  it("should render a ParticipantList component and contain the page heading", () => {
    const { getAllByLabelText } = render(
      <RootStoreContext.Provider value={new RootStore()}>
        <BrowserRouter>
          <ParticipantList />
        </BrowserRouter>
      </RootStoreContext.Provider>
    )
    const prevPointHeadingText = getAllByLabelText(/heading/i)
    expect(prevPointHeadingText[0]).toHaveTextContent("Participants")
    expect(prevPointHeadingText).toHaveLength(3)
  })

  it("should render a ParticipantList component and contain the table", () => {
    const { getByLabelText } = render(
      <RootStoreContext.Provider value={mockRootStore}>
        <BrowserRouter>
          <ParticipantList />
        </BrowserRouter>
      </RootStoreContext.Provider>
    )
    const tableElement = getByLabelText(/list of participants/i)
    expect(tableElement).toBeInTheDocument()
  })

  it("should render a ParticipantList component and a table with the correct number of rows", () => {
    const { getAllByLabelText } = render(
      <RootStoreContext.Provider value={mockRootStore}>
        <BrowserRouter>
          <ParticipantList />
        </BrowserRouter>
      </RootStoreContext.Provider>
    )
    const tableRows = getAllByLabelText("trow")
    expect(tableRows).toHaveLength(2)
  })

  it("should render a PreventionPoint button with a string as a label", () => {
    const { getByTestId } = render(
      <RootStoreContext.Provider value={new RootStore()}>
        <BrowserRouter>
          <ParticipantList />
        </BrowserRouter>
      </RootStoreContext.Provider>
    )
    const noResultsButton = getByTestId("no-results-button")
    expect(noResultsButton).not.toHaveTextContent("")
  })

  it("should render a ParticipantList component and have a bottom navigation", () => {
    const { getByLabelText } = render(
      <RootStoreContext.Provider value={new RootStore()}>
        <BrowserRouter>
          <ParticipantList />
        </BrowserRouter>
      </RootStoreContext.Provider>
    )
    const bottomNavElement = getByLabelText(/Bottom Navigation/i)
    expect(bottomNavElement).toBeInTheDocument()
  })
})
