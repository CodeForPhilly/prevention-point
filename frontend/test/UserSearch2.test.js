/* eslint-disable quotes */
import React from "react"
import { configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { createMount } from "@material-ui/core/test-utils"
import Button from "@material-ui/core/Button"
import UserSearch from "../src/components/UserSearch"
// var not used for now
/**
import { render, fireEvent, cleanup } from "@testing-library/react"
**/

configure({ adapter: new Adapter() })

const theme = createMuiTheme({})

describe("<UserSearch />", () => {
  let wrapper
  let buttons
  let mount
  let button

  // Create initial props that get passed into the components, (none in this case)
  const initialProps = {}

  // Unit testing
  describe("Unit tests", () => {
    // what to do before each test
    beforeEach(() => {
      mount = createMount()
      wrapper = mount(
        <ThemeProvider theme={theme}>
          <UserSearch {...initialProps} />
        </ThemeProvider>
      )
      buttons = wrapper.find(Button)
      button = buttons.at(0)
    })

    // what to do after each test
    afterEach(() => {
      //mount.cleanup()
      jest.clearAllMocks()
    })

    // UI Integrity test

    //Integration testing

    it("should be able to click button", () => {
      button.simulate("submit")
      //expect(wrapper.state("value")).toEqual(2)
    })
  })
})
