/* eslint-disable quotes */
import React from "react"
import { configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
//import { render, fireEvent, cleanup } from "@testing-library/react"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { createMount } from "@material-ui/core/test-utils"
//import { createMuiTheme } from "@material-ui/core/styles"

import Button from "@material-ui/core/Button"
import AppBar from "@material-ui/core/AppBar"
import AllQueues from "../src/components/AllQueues"

configure({ adapter: new Adapter() })

const theme = createMuiTheme({})

describe("<AllQueues />", () => {
  let wrapper
  let buttons
  let bar
  let mount
  let button1
  let button2

  // Create initial props that get passed into the components, (none in this case)
  const initialProps = {}

  // Unit testing
  describe("Unit tests", () => {
    // what to do before each test
    beforeEach(() => {
      mount = createMount()
      wrapper = mount(
        <ThemeProvider theme={theme}>
          <AllQueues {...initialProps} />
        </ThemeProvider>
      )
      buttons = wrapper.find(Button)
      button1 = buttons.at(0)
      button2 = buttons.at(1)
      bar = wrapper.find(AppBar)
    })

    // what to do after each test
    afterEach(() => {
      //mount.cleanup()
      jest.clearAllMocks()
    })

    // UI Integrity test
    it("should have 9 buttons", () => {
      expect(buttons.length).toEqual(9)
    })

    // UI Integrity test
    it("should have 1 AppBar", () => {
      expect(bar.length).toEqual(1)
    })

    //Integration testing
    it("should be able to click button1", () => {
      button1.simulate("click")
      //expect(wrapper.state("value")).toEqual(1) access for atate in functional components work in progress
      //https://stackoverflow.com/questions/55325024/query-internal-state-of-component-using-usestate-with-enzyme
    })

    it("should be able to click button2", () => {
      button2.simulate("click")
      //expect(wrapper.state("value")).toEqual(2)
    })
  })
})
