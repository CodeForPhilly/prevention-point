/* eslint-disable quotes */
import React from "react"
import { shallow, configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
//import { render, fireEvent, cleanup } from "@testing-library/react"
import { ThemeProvider } from "@material-ui/core/styles"

import Button from "@material-ui/core/Button"
import AllQueues from "../src/components/AllQueues"

configure({ adapter: new Adapter() })

const theme = {}

describe("<AllQueues />", () => {
  let wrapper
  let buttons

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
    })

    // what to do after each test
    afterEach(() => {
      jest.clearAllMocks()
    })

    // UI Integrity test
    it("should have 9 buttons", () => {
      expect(buttons.length).toEqual(9)
    })
  })
})
