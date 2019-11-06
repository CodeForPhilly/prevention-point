/* eslint-disable quotes */
import React from "react"
import { configure } from "enzyme"
import { createMount } from "@material-ui/core/test-utils"
import Adapter from "enzyme-adapter-react-16"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"

import UserSearch from "../src/components/UserSearch"

configure({ adapter: new Adapter() })

const theme = createMuiTheme({})

describe("<UserSearch />", () => {
  // eslint-disable-next-line no-unused-vars
  let wrapper
  //let shallow
  let mount
  //let buttons

  const initialProps = {}

  beforeAll(() => {
    // This is Mocha; in Jest, use beforeAll
    //shallow = createShallow()
    mount = createMount()
    wrapper = mount(
      <ThemeProvider theme={theme}>
        <UserSearch {...initialProps} />
      </ThemeProvider>
    )
    //buttons = wrapper.find("button")
  })

  // what to do after each test
  afterAll(() => {
    //mount.cleanup()
    jest.clearAllMocks()
  })

  it("should work", () => {
    wrapper = mount(<UserSearch />)
  })

  it("should match the snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should have a users id", () => {
    expect(wrapper.exists("#user_id")).toEqual(true)
  })

  it("should have a first name", () => {
    expect(wrapper.exists("#first_name")).toEqual(true)
  })

  it("should have a last name", () => {
    expect(wrapper.exists("#last_name")).toEqual(true)
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

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}))
