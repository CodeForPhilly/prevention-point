import { render } from "@testing-library/react"
import React from "react"
import { createMemoryHistory } from "history"
import ExistingParticipantView from "../src/views/ExistingParticipantView"
import { Router, Route } from "react-router-dom"
import { RootStore, RootStoreContext } from "../src/stores/RootStore"
import api from "../src/api"

jest.mock("../src/api")
const participantId = 6
const mockRootStore = new RootStore()
const history = createMemoryHistory()
const mockParticipant = {
  id: participantId,
  pp_id: "ZG0DI",
  sep_id: "aq41673",
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
}

// eslint-disable-next-line react/prop-types
const StateAndRouterProviders = ({ children, state, history }) => {
  //testing-library.com/docs/react-testing-library/setup#custom-render
  return (
    <RootStoreContext.Provider value={state}>
      <Router history={history}>
        <Route path="/participants/:participantId"> {children} </Route>
        <Route path="/404">the 404 page</Route>
      </Router>
    </RootStoreContext.Provider>
  )
}

// https://testing-library.com/docs/example-react-router/
const renderWithRouter = (children, state, { route = "/" } = {}) => {
  history.push(route)
  return render(StateAndRouterProviders({ children, state, history }))
}

describe("<ExistingParticipantView /> router basics", () => {
  beforeEach(() => {
    mockRootStore.ParticipantStore.setParticipant(mockParticipant)
    mockRootStore.ParticipantStore.setVisitData({})
  })

  it("renders a participant form", () => {
    const { getByLabelText } = renderWithRouter(
      <ExistingParticipantView />,
      mockRootStore,
      { route: `/participants/${participantId}` }
    )

    const fname = getByLabelText(/first name/i)
    const lname = getByLabelText(/last name/i)
    expect(fname.value).toEqual(
      mockRootStore.ParticipantStore.participant.first_name
    )
    expect(lname.value).toEqual(
      mockRootStore.ParticipantStore.participant.last_name
    )

    expect(getByLabelText("Participant Form")).toBeInTheDocument()
  })

  it("renders a participant form", () => {
    const { getByText, queryByLabelText, getByLabelText } = renderWithRouter(
      <ExistingParticipantView />,
      mockRootStore,
      {
        route: `/participants/${participantId}`,
      }
    )
    expect(getByLabelText("Participant Form")).toBeInTheDocument()
    expect(queryByLabelText("visits table")).toBeNull()
    expect(getByText("Create Visit")).toBeInTheDocument()
  })

  it("renders the visits table when /visits/ is the path ending", () => {
    const { getByLabelText, queryByText } = renderWithRouter(
      <ExistingParticipantView />,
      mockRootStore,
      {
        route: `/participants/${participantId}/visits`,
      }
    )
    expect(getByLabelText("Participant Form")).toBeInTheDocument()
    expect(queryByText("Create Visit")).toBeNull()
    expect(getByLabelText("visits table")).toBeInTheDocument()
  })

  it("renders the visits data when /visits/:id is the path ending", () => {
    // for visit data route to render correctly
    mockRootStore.ParticipantStore.setVisitData({
      id: 1,
      created_at: new Date(),
      site: { site_name: "site name" },
      needles_in: 1,
      needles_out: 1,
    })

    const { queryByText, getByLabelText } = renderWithRouter(
      <ExistingParticipantView />,
      mockRootStore,
      {
        route: `/participants/${participantId}/visits/1`,
      }
    )
    expect(getByLabelText("Participant Form")).toBeInTheDocument()
    expect(queryByText("Create Visit")).toBeNull()
    expect(queryByText("Visit Data")).toBeInTheDocument()
  })
})

describe("<ExistingParticipantView /> mounting process", () => {
  beforeEach(() => {
    mockRootStore.ParticipantStore.setParticipant(mockParticipant)
    mockRootStore.ParticipantStore.setVisitData({})
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("calls get insurers and get programs", () => {
    const getInsurers = jest.spyOn(
      mockRootStore.ParticipantStore,
      "getInsurers"
    )
    const getPrograms = jest.spyOn(
      mockRootStore.ParticipantStore,
      "getPrograms"
    )
    renderWithRouter(<ExistingParticipantView />, mockRootStore, {
      route: `/participants/${participantId}`,
    })

    expect(getInsurers).toHaveBeenCalled()
    expect(getPrograms).toHaveBeenCalled()
  })

  it("does not try to get participant from server if route particpant id param mataches store id", () => {
    const getParticipant = jest.spyOn(
      mockRootStore.ParticipantStore,
      "getParticipant"
    )
    renderWithRouter(<ExistingParticipantView />, mockRootStore, {
      route: `/participants/${participantId}`,
    })
    expect(getParticipant).toHaveBeenCalledTimes(0)
  })

  it("tries to get participant from server if route particpant id param mataches store id", () => {
    const getParticipant = jest.spyOn(
      mockRootStore.ParticipantStore,
      "getParticipant"
    )
    renderWithRouter(<ExistingParticipantView />, mockRootStore, {
      route: "/participants/500/",
    })
    expect(getParticipant).toHaveBeenCalledTimes(1)
  })

  it("redirects to /participants/:participantId/visits if participantStore.visitData is an empty {}", async () => {
    const { findByLabelText } = renderWithRouter(
      <ExistingParticipantView />,
      mockRootStore,
      {
        route: `/participants/${participantId}/visits/32`,
      }
    )

    const table = await findByLabelText(/visits table/i)
    expect(table).toBeInTheDocument()
    expect(history.location.pathname).toEqual(
      `/participants/${participantId}/visits`
    )
  })

  it("redirects to 404 if the server returns !ok", async () => {
    api.getParticipantById = jest
      .fn()
      .mockResolvedValue({ ok: false, data: {} })

    const { findByText } = renderWithRouter(
      <ExistingParticipantView />,
      mockRootStore,
      {
        route: "/participants/500/",
      }
    )

    const notFound = await findByText(/the 404 page/i)
    expect(notFound).toBeInTheDocument()
    expect(history.location.pathname).toEqual("/404/")
  })

  it("updates the participant to match the url id", async () => {
    const newId = 10
    const mockServerResponse = {
      ok: true,
      data: {
        id: newId,
        pp_id: "GFDRT",
        sep_id: "rt10000",
        first_name: "Jesse",
        last_name: "Owens",
        last_four_ssn: "7241",
        race: "Black (African American)",
        gender: "m",
        date_of_birth: "1917-05-31",
        start_date: "1989-12-05",
        is_insured: false,
        insurer: 2,
        maiden_name: "Rodriguez",
      },
    }

    api.getParticipantById = jest.fn().mockResolvedValue(mockServerResponse)
    const { findByLabelText } = renderWithRouter(
      <ExistingParticipantView />,
      mockRootStore,
      {
        route: `/participants/${newId}`,
      }
    )

    const fname = await findByLabelText(/first name/i)
    const lname = await findByLabelText(/last name/i)
    expect(fname.value).toEqual(mockServerResponse.data.first_name)
    expect(lname.value).toEqual(mockServerResponse.data.last_name)

    expect(history.location.pathname).toEqual(`/participants/${newId}`)
  })
})
