/* eslint-disable quotes */
import React from "react"
import { configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { createMount } from "@material-ui/core/test-utils"

import AppBar from "@material-ui/core/AppBar"
import AllQueues from "../src/components/AllQueues"

configure({ adapter: new Adapter() })

const theme = createMuiTheme({})

describe("<AllQueues />", () => {
  let wrapper
  let buttons
  let bar
  let mount
  let testingButton
  let cmButton
  let h6
  let h6Update

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
      bar = wrapper.find(AppBar)
      buttons = bar.find("button")
      testingButton = buttons.at(0)
      cmButton = buttons.at(1)
      h6 = wrapper.find("h6")
    })

    // what to do after each test
    afterEach(() => {
      //mount.cleanup()
      jest.clearAllMocks()
    })

    // UI Integrity test
    it("should have 1 AppBar", () => {
      expect(bar.length).toEqual(1)
    })

    // UI Integrity test
    it("should have 9 buttons", () => {
      expect(buttons.length).toEqual(9)
    })

    // UI Integrity test
    it("should have 1 h6", () => {
      expect(h6.length).toEqual(1)
      expect(h6.text()).toEqual("TESTING")
    })

    //Integration testing
    it("should be able to click testingButton", () => {
      testingButton.simulate("click")
      expect(testingButton.text()).toEqual("TESTING00")
      expect(h6.text()).toEqual("TESTING")
    })

    it("should be able to click cmButton and change title to CM", () => {
      cmButton.simulate("click")
      expect(cmButton.text()).toEqual("CM00")
      //Necessary to update the wrapper to see effect of click
      h6Update = wrapper.update().find("h6")
      expect(h6Update.text()).toEqual("CM")
    })
  })
})
