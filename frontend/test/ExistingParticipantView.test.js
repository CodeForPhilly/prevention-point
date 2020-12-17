import { render } from "@testing-library/react"
import React from "react"
import { createMemoryHistory } from "history"
import ExistingParticipantView from "../src/views/ExistingParticipantView"
import { Router, Route } from "react-router-dom"
import { RootStore, RootStoreContext } from "../src/stores/RootStore"
import api from "../src/api"

jest.mock("../src/api")

const mockRootStore = new RootStore()
mockRootStore.ParticipantStore.setParticipant({
  id: 6,
  pp_id: "ZG0DI",
  sep_id: 41673,
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
})

// eslint-disable-next-line react/prop-types
const StateAndRouterProviders = ({ children, state, history }) => (
  //testing-library.com/docs/react-testing-library/setup#custom-render
  <RootStoreContext.Provider value={state}>
    <Router history={history}>
      <Route path="/participants/:participantId"> {children} </Route>
      <Route path="/404">the 404 page</Route>
    </Router>
  </RootStoreContext.Provider>
)

const renderWithRouter = (children, state, { route = "/" } = {}) => {
  // https://testing-library.com/docs/example-react-router/
  const history = createMemoryHistory()
  history.push(route)
  return render(StateAndRouterProviders({ children, state, history }))
}

describe("<ExistingParticipantView /> router basics", () => {
  it("renders a participant form", () => {
    const { getByLabelText } = renderWithRouter(
      <ExistingParticipantView />,
      mockRootStore,
      { route: "/participants/6/" }
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
        route: "/participants/6/",
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
        route: "/participants/6/visits",
      }
    )
    expect(getByLabelText("Participant Form")).toBeInTheDocument()
    expect(queryByText("Create Visit")).toBeNull()
    expect(getByLabelText("visits table")).toBeInTheDocument()
  })

  it("renders the visits data when /visits/:id is the path ending", () => {
    const { queryByText, getByLabelText } = renderWithRouter(
      <ExistingParticipantView />,
      mockRootStore,
      {
        route: "/participants/6/visits/32",
      }
    )
    expect(getByLabelText("Participant Form")).toBeInTheDocument()
    expect(queryByText("Create Visit")).toBeNull()
    expect(queryByText("Visit Data")).toBeInTheDocument()
  })
})

describe("<ExistingParticipantView /> mounting process", () => {
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
      route: "/participants/6/",
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
      route: "/participants/6/",
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

  it("redirects to 404 if the server returns !ok", async () => {
    api.getParticipantById = jest
      .fn()
      .mockResolvedValue({ ok: false, data: {} })
    const history = createMemoryHistory()
    history.push("/participants/500/")

    // findbytext is async
    const { findByText } = render(
      StateAndRouterProviders({
        children: <ExistingParticipantView />,
        state: mockRootStore,
        history,
      })
    )

    const notFound = await findByText(/the 404 page/i)
    expect(notFound).toBeInTheDocument()

    expect(history.location.pathname).toEqual("/404/")
  })

  it("updates the participant to match the url id", async () => {
    const mockServerResponse = {
      ok: true,
      data: {
        id: 1,
        pp_id: "GFDRT",
        sep_id: 10000,
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
    const history = createMemoryHistory()
    history.push("/participants/1/")

    const { findByLabelText } = render(
      StateAndRouterProviders({
        children: <ExistingParticipantView />,
        state: mockRootStore,
        history,
      })
    )

    const fname = await findByLabelText(/first name/i)
    const lname = await findByLabelText(/last name/i)
    expect(fname.value).toEqual(mockServerResponse.data.first_name)
    expect(lname.value).toEqual(mockServerResponse.data.last_name)

    expect(history.location.pathname).toEqual("/participants/1/")
  })
})
