/* eslint-disable quotes */
import React from "react"
import { configure } from "enzyme"
import { createMount } from "@material-ui/core/test-utils"
import Adapter from "enzyme-adapter-react-16"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"

import ParticipantSearch from "../src/components/ParticipantSearch"
import { RootStoreContext, RootStore } from "../src/stores/RootStore"

configure({ adapter: new Adapter() })

const theme = createMuiTheme({})

describe("<ParticipantSearch />", () => {
  let wrapper
  let mount

  const initialProps = {}

  beforeAll(() => {
    mount = createMount()
    wrapper = mount(
      <RootStoreContext.Provider value={new RootStore()}>
        <ThemeProvider theme={theme}>
          <ParticipantSearch {...initialProps} />
        </ThemeProvider>
      </RootStoreContext.Provider>
    )
  })

  // what to do after each test
  afterAll(() => {
    jest.clearAllMocks()
  })

  it("should work", () => {
    wrapper = mount(
      <RootStoreContext.Provider value={new RootStore()}>
        <ParticipantSearch />
      </RootStoreContext.Provider>
    )
  })

  it("should match the snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should have a participants id", () => {
    expect(wrapper.exists('[name="pp_id"]')).toEqual(true)
  })

  it("should have a first name", () => {
    expect(wrapper.exists('[name="first_name"]')).toEqual(true)
  })

  it("should have a last name", () => {
    expect(wrapper.exists('[name="last_name"]')).toEqual(true)
  })

  it("should have a submit button", () => {
    expect(wrapper.exists("submit"))
  })

  // UI Integrity test
  it("should have submit button click", () => {
    wrapper
      .find("button")
      .at(0)
      .simulate("click")
  })
})
// resolves useHistory error hangup
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}))
