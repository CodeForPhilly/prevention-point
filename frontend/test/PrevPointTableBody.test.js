import { render } from "@testing-library/react"
import React from "react"
import PrevPointTableBody from "./../src/components/ParticipantTableComponent/PrevPointTableBody"
import { BrowserRouter } from "react-router-dom"

const mockParticipantsList = [
  {
    id: null,
    first_name: "John",
    last_name: "Doe",
    last_four_ssn: 1234,
    date_of_birth: "1994/12/01",
    start_date: "2019/04/10",
    pp_id: "JD1234",
    sep_id: "",
    maiden_name: "",
    race: "Other",
    gender: "Other",
    is_insured: false,
    insuranceType: "",
    insurer: "",
  },
  {
    id: null,
    first_name: "Jane",
    last_name: "Doe",
    last_four_ssn: 1234,
    date_of_birth: "1998/20/07",
    start_date: "2020/04/04",
    pp_id: "JD1234",
    sep_id: "",
    maiden_name: "",
    race: "Other",
    gender: "Other",
    is_insured: false,
    insuranceType: "",
    insurer: "",
  },
]
const table = document.createElement("table")

describe("<PrevPointTableBody />", () => {
  it("should render a PrevPointTableBody component", () => {
    render(
      <BrowserRouter>
        <PrevPointTableBody participants={mockParticipantsList} />
      </BrowserRouter>
    )
  })

  it("should render a PrevPointTableBody error message", () => {
    const errorMessage = "Sorry no participants found"
    const { getByText } = render(
      <BrowserRouter>
        <PrevPointTableBody participants={[]} />
      </BrowserRouter>
    )
    const tableBodyError = getByText(errorMessage)
    expect(tableBodyError).toBeInTheDocument()
    expect(tableBodyError).toHaveTextContent("Sorry no participants found")
  })

  it("should render a PrevPointTableBody and have a TableBody element", () => {
    const { getByLabelText } = render(
      <BrowserRouter>
        <PrevPointTableBody participants={mockParticipantsList} />
      </BrowserRouter>,
      {
        container: document.body.appendChild(table),
      }
    )
    const tableBodyElement = getByLabelText(/tbody/i)
    expect(tableBodyElement).toBeInTheDocument()
  })

  it("should render a PrevPointTableBody and have 14 table cells, e.g. 2 rows of data", () => {
    const { getAllByLabelText } = render(
      <BrowserRouter>
        <PrevPointTableBody participants={mockParticipantsList} />
      </BrowserRouter>,
      {
        container: document.body.appendChild(table),
      }
    )
    const tableRows = getAllByLabelText("trow")
    const tableCellList = getAllByLabelText("tcell")
    expect(tableRows).toHaveLength(2)
    expect(tableCellList).toHaveLength(16)
  })
})
