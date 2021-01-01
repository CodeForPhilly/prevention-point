import { render } from "@testing-library/react"
import React from "react"
import VisitTable from "../src/components/VisitRouter/VisitTable"

const defaultVisitCount = 5
function generateMockVisit(index) {
  return {
    id: index,
    created_at: new Date(),
    program: {
      name: `program-${index}`,
    },
    service: {
      name: `service-${index}`,
    },
  }
}

function generateMockVisits(visitCount = defaultVisitCount) {
  const visits = []
  for (let i = 0; i < visitCount; i++) {
    visits.push(generateMockVisit(i))
  }

  return visits
}

describe("<VisitTable />", () => {
  const aName = "Kamala Harris"

  it("Renders", () => {
    render(
      <VisitTable
        getParticipantVisits={() => {}}
        participantVisits={[]}
        getProtectedVisitData={() => {}}
      />
    )
  })

  it("Displays the participant nane", () => {
    const { getByText } = render(
      <VisitTable
        fullName={aName}
        getParticipantVisits={() => {}}
        participantVisits={[]}
        getProtectedVisitData={() => {}}
      />
    )

    expect(getByText(`${aName}'s Previous Visits`)).toBeInTheDocument()
  })

  it("calls fn passed to getParticipantVisits on mount", () => {
    const mockVisitsRequest = jest.fn()

    render(
      <VisitTable
        fullName={aName}
        getParticipantVisits={mockVisitsRequest}
        participantVisits={[]}
        getProtectedVisitData={() => {}}
      />
    )

    expect(mockVisitsRequest).toHaveBeenCalled()
  })

  it("displays mock visits", () => {
    const { getAllByLabelText } = render(
      <VisitTable
        fullName={aName}
        getParticipantVisits={() => {}}
        participantVisits={generateMockVisits()}
        getProtectedVisitData={() => {}}
      />
    )

    const visitRows = getAllByLabelText("visit row")
    expect(visitRows.length).toEqual(defaultVisitCount)
  })

  it("calls getProtectedVisitData with id on click", () => {
    const mockDataRequest = jest.fn(x => {
      x
    })
    const visitId = 0

    const { getAllByLabelText } = render(
      <VisitTable
        fullName={aName}
        getParticipantVisits={() => {}}
        participantVisits={generateMockVisits(2)}
        getProtectedVisitData={x => mockDataRequest(x)}
      />
    )

    const icon = getAllByLabelText("get protected visit data")[0]
    icon.click()

    expect(mockDataRequest).toBeCalledWith(visitId)
  })
})
