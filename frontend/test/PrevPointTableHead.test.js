import { render } from "@testing-library/react"
import React from "react"
import PrevPointTableHead from "./../src/components/ParticipantTableComponent/PrevPointTableHead"

let table
let tableContainer

describe("<PrevPointTableHead />", () => {
  beforeEach(() => {
    table = document.createElement("table")
    tableContainer = {
      container: document.body.appendChild(table),
    }
  })

  it("should render a PrevPointTableHead component", () => {
    render(<PrevPointTableHead />, tableContainer)
  })

  it("should render a PrevPointTableHead and have a TableHead element", () => {
    const { getByLabelText } = render(<PrevPointTableHead />, tableContainer)
    const tableHeadElement = getByLabelText(/thead/i)
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
