import { render } from "@testing-library/react"
import React from "react"
import VisitTable from "../src/components/VisitRouter/VisitTable"

describe("<VisitTable />", () => {
  it("Renders", () => {
    render(
      <VisitTable
        getParticipantVisits={() => {}}
        participantVisits={[]}
        getProtectedVisitData={() => {}}
      />
    )
  })

  it("Renders", () => {
    const aName = "Kamala Harris"

    render(
      <VisitTable
        fullName={aName}
        getParticipantVisits={() => {}}
        participantVisits={[]}
        getProtectedVisitData={() => {}}
      />
    )
  })
})
