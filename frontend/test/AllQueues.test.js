/* eslint-disable quotes */
import React from "react"
import { shallow, configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
//import { render, fireEvent, cleanup } from "@testing-library/react"
import { ThemeProvider } from "@material-ui/core/styles"

import Button from "@material-ui/core/Button"
import AppBar from "@material-ui/core/AppBar"
import AllQueues from "../src/components/AllQueues"

configure({ adapter: new Adapter() })

const theme = {}

describe("<AllQueues />", () => {
  let wrapper
  let buttons
  let testing
  let bar

  // Create initial props that get passed into the componena, (none in this case)
  const initialProps = {}

  // Unit testing
  describe("Unit tests", () => {
    // what to do before each test
    beforeEach(() => {
      wrapper = shallow(
        <ThemeProvider theme={theme}>
          <AllQueues {...initialProps} />
        </ThemeProvider>
      )
      buttons = wrapper.find(Button)
      testing = wrapper.find("TESTING")
      bar = wrapper.find(AppBar)
    })

    // what to do after each test
    afterEach(() => {
      jest.clearAllMocks()
    })

    // UI Integrity test
    it("should have 9 buttons", () => {
      expect(buttons.length).toEqual(9)
    })

    // UI Integrity test
    it("should have 1 TESTING button", () => {
      expect(testing.length).toEqual(1)
    })

    // UI Integrity test
    it("should have 1 AppBar", () => {
      expect(bar.length).toEqual(1)
    })
  })
})
