import { render } from "@testing-library/react"
import React from "react"
import VisitData from "../src/components/VisitRouter/VisitData"
import { createMemoryHistory } from "history"
import { Router, Route } from "react-router-dom"

const history = createMemoryHistory()

const mockVisitData = {
  id: 1,
  needles_in: 1,
  needles_out: 2,
  exchanged_for: 3,
  created_at: new Date(),
  site: { site_name: "a-site" },
}

//  need router to test because the component uses params to redirect if necessary
// redirect testing happens in ExistingParticipantView.test.js, we are assuming the data coming in is correct here for now
const renderWithRouter = (children, /*state = null,*/ { route = "/" } = {}) => {
  history.push(route)
  return render(
    <Router history={history}>
      <Route path="/"> {children} </Route>
      <Route path="/404">the 404 page</Route>
    </Router>
  )
}

describe("<VisitData />", () => {
  it("renders the visitData component", () => {
    renderWithRouter(<VisitData visitData={mockVisitData} />)
  })

  it("has needles in value in dom", () => {
    const { getByText } = renderWithRouter(
      <VisitData visitData={mockVisitData} />
    )
    expect(getByText(/needles in: 1/i)).toBeInTheDocument()
  })

  it("has needles out value in dom", () => {
    const { getByText } = renderWithRouter(
      <VisitData visitData={mockVisitData} />
    )
    expect(getByText(/needles out: 2/i)).toBeInTheDocument()
  })

  it("has needles exchanged for value in dom", () => {
    const { getByText } = renderWithRouter(
      <VisitData visitData={mockVisitData} />
    )
    expect(getByText(/needles exchanged for: 3/i)).toBeInTheDocument()
  })

  it("has site value in dom", () => {
    const { getByText } = renderWithRouter(
      <VisitData visitData={mockVisitData} />
    )
    expect(getByText(/exchange site: a-site/i)).toBeInTheDocument()
  })

  it("has visit date in dom", () => {
    const { getByText } = renderWithRouter(
      <VisitData visitData={mockVisitData} />
    )
    expect(getByText(/visit date:.*/i)).toBeInTheDocument()
  })
})
