import { render } from "@testing-library/react"
import React from "react"
import PrevPointTable from "./../src/components/ParticipantTableComponent/PrevPointTable"

describe("<PrevPointTable />", () => {
  it("should render a PrevPointTable component", () => {
    render(<PrevPointTable participants={[]} headerTitles={[]} />)
  })
})
