import { render } from "@testing-library/react"
import React from "react"
import ParticipantList from "../src/views/ParticipantList"
import { BrowserRouter } from "react-router-dom"

describe("<ParticipantList />", () => {
  it("should render a ParticipantList component", () => {
    render(
      <BrowserRouter>
        <ParticipantList />
      </BrowserRouter>
    )
  })

  it("should render a ParticipantList component and contain the page heading", () => {
    const { getAllByLabelText } = render(
      <BrowserRouter>
        <ParticipantList />
      </BrowserRouter>
    )
    const prevPointHeadingText = getAllByLabelText(/heading/i)
    expect(prevPointHeadingText[0]).toHaveTextContent("Participants")
    expect(prevPointHeadingText).toHaveLength(2)
  })

  it("should render a ParticipantList component and contain the table", () => {
    const { getByLabelText } = render(
      <BrowserRouter>
        <ParticipantList />
      </BrowserRouter>
    )
    const tableElement = getByLabelText(/table/i)
    expect(tableElement).toBeInTheDocument()
  })

  it("should render a ParticipantList component and have a bottom navigation", () => {
    const { getByLabelText } = render(
      <BrowserRouter>
        <ParticipantList />
      </BrowserRouter>
    )
    const bottomNavElement = getByLabelText(/bottomNav/i)
    expect(bottomNavElement).toBeInTheDocument()
  })
})
