import { render } from "@testing-library/react"
import React from "react"
import PrevPointTableHead from "./../src/components/ParticipantTableComponent/PrevPointTableHead"

const table = document.createElement("table")
const tableContainer = {
  container: document.body.appendChild(table),
}

describe("<PrevPointTableHead />", () => {
  it("should render a PrevPointTableHead component", () => {
    render(<PrevPointTableHead headerTitles={[]} />, tableContainer)
  })

  it("should render a PrevPointTableHead and have a TableHead element", () => {
    const { getByLabelText } = render(
      <PrevPointTableHead headerTitles={[]} />,
      {
        container: document.body.appendChild(table),
      }
    )
    const tableHeadElement = getByLabelText(/thead/i)
    expect(tableHeadElement).toBeInTheDocument()
  })

  it("should render a PrevPointTableHead and have 8 columns", () => {
    const titles = [
      "PPID",
      "First Name",
      "Last Name",
      "SEP ID",
      "Gender",
      "DOB",
      "Race",
    ]
    const { getAllByLabelText } = render(
      <PrevPointTableHead headerTitles={titles} />,
      tableContainer
    )
    const tableCellList = getAllByLabelText("cell")
    expect(tableCellList).toHaveLength(8)
  })

  it("should have 7 columns if forParticipantTable is false", () => {
    const titles = [
      "PPID",
      "First Name",
      "Last Name",
      "SEP ID",
      "Gender",
      "DOB",
      "Race",
    ]
    const { getAllByLabelText } = render(
      <PrevPointTableHead forParticipantTable={false} headerTitles={titles} />,
      tableContainer
    )
    const tableCellList = getAllByLabelText("cell")
    expect(tableCellList).toHaveLength(7)
  })
})
