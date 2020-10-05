import { render } from "@testing-library/react"
import React from "react"
import PrevPointTableHead from "./../src/components/ParticipantTableComponent/PrevPointTableHead"

const table = document.createElement("table")
const tableContainer = {
  container: document.body.appendChild(table),
}

describe("<PrevPointTableHead />", () => {
  it("should render a PrevPointTableHead component", () => {
    render(<PrevPointTableHead />)
  })

  it("should render a PrevPointTableHead and have a TableHead element", () => {
    const { getByLabelText } = render(<PrevPointTableHead />, tableContainer)
    const tableHeadElement = getByLabelText(/table head/i)
    expect(tableHeadElement).toBeInTheDocument()
  })

  it("should render a PrevPointTableHead and have 7 columns", () => {
    const titles = [
      "PPID",
      "First Name",
      "Last Name",
      "Gender",
      "DOB",
      "Race",
      "Edit Participant",
    ]
    const { getAllByLabelText } = render(
      <PrevPointTableHead headerTitles={titles} />,
      tableContainer
    )
    const tableCellList = getAllByLabelText("cell")
    expect(tableCellList).toHaveLength(7)
  })
})
