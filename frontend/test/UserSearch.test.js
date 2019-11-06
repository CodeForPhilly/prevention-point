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
  let buttons

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
    buttons = wrapper.find("button")
  })

  // what to do after each test
  afterAll(() => {
    //mount.cleanup()
    jest.clearAllMocks()
  })

  it("should work", () => {
    wrapper = mount(<UserSearch />)
  })

  // UI Integrity test
  it("should have submit buttons", () => {
    expect(buttons.length).toEqual(1)
  })
})

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}))
