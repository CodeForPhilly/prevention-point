/* eslint-disable quotes */
import React from "react"
import { act } from "react-dom/test-utils"
import { configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { Button } from "@material-ui/core"
import { createMount } from "@material-ui/core/test-utils"
import { BrowserRouter } from "react-router-dom"
import api from "../src/api"

jest.mock("../src/api")
api.getProgram = jest
  .fn()
  .mockResolvedValue({ ok: true, data: { is_frozen: false } })
api.getQueue = jest.fn().mockResolvedValue({ ok: true, data: [] })
api.patchProgram = jest.fn().mockResolvedValue({ ok: true })

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
  let tables
  let table
  let tr

  // Create initial props that get passed into the components, (none in this case)
  const initialProps = {}

  // Unit testing
  describe("Unit tests", () => {
    // what to do before each test
    beforeEach(async () => {
      mount = createMount()
      await act(async () => {
        wrapper = mount(
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <AllQueues {...initialProps} />
            </BrowserRouter>
          </ThemeProvider>
        )
      })
      bar = wrapper.find(AppBar)
      buttons = bar.find("button")
      testingButton = buttons.at(0)
      cmButton = buttons.at(1)
      h6 = wrapper.find("h6")
      tables = wrapper.find("table")
      table = tables.at(0)
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
    it("should have 2 tables", () => {
      expect(tables.length).toEqual(2)
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

    it("should be able to click cmButton and change title to CM", async () => {
      await act(async () => {
        cmButton.simulate("click")
      })
      expect(cmButton.text()).toEqual("CM00")
      //Necessary to update the wrapper to see effect of click
      await act(async () => {
        h6Update = wrapper.update().find("h6")
      })
      expect(h6Update.text()).toEqual("CM")
    })

    it("should be have a shorter Testing queue if status is set to 'left'", () => {
      tr = table.find("tr")
      expect(tr.length).toEqual(2)
    })

    it("should be have a shorter CM queue if status is set to 'left'", async () => {
      await act(async () => {
        cmButton.simulate("click")
      })
      expect(cmButton.text()).toEqual("CM00")
      //Necessary to update the wrapper to see effect of click
      await act(async () => {
        table = wrapper.update().find("table")
      })
      tr = table.find("tr")
      expect(tr.length).toEqual(3)
    })

    it("should update freeze button when clicked", async () => {
      let freezeButton = wrapper.find(Button).at(9)
      api.patchProgram = jest.fn().mockResolvedValueOnce({ ok: true })
      await act(async () => {
        freezeButton.simulate("click")
      })
      expect(freezeButton.text()).toEqual("Unfreeze")
    })
  })
})
