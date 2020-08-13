/* eslint-disable quotes */
import React from "react"
import { shallow, configure } from "enzyme"
import { createMount } from "@material-ui/core/test-utils"
import Adapter from "enzyme-adapter-react-16"
import VisitForm from "../src/components/VisitRouter/VisitForm"

configure({ adapter: new Adapter() })

describe("<VisitForm />", () => {
  let wrapper
  let mount

  // Create initial props that get passed into the component
  const initialProps = {
    visitInfo: {
      id: null,
      program: "",
      service: "",
      urgency: "",
      notes: "",
    },
    programList: [{ id: 1, name: "program" }],
    serviceList: [{ id: 1, name: "service" }],
    setVisitProgram: () => {},
    setVisitService: () => {},
    setVisitUrgency: () => {},
    setVisitNotes: () => {},
  }

  // Unit testing
  describe("Unit tests", () => {
    beforeEach(() => {
      mount = createMount()
      wrapper = shallow(<VisitForm {...initialProps} />)
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it("should work", () => {
      wrapper = mount(<VisitForm {...initialProps} />)
    })
    // UI Integrity test
    it("should match the snapshot", () => {
      // snapshots are text references of the html of the rendered component.
      expect(wrapper.html()).toMatchSnapshot()
    })

    it("should have a program input", () => {
      let input = wrapper.find('[name="program"]')
      expect(input.length).toEqual(1)
    })

    it("should have not have a service input when there is no program", () => {
      let input = wrapper.find('[name="service"]')
      expect(input.length).toEqual(0)
    })

    it("should have a service input when there is a program", () => {
      const updatedProps = {
        ...initialProps,
      }

      updatedProps.visitInfo = { ...initialProps.visitInfo, program: "1" }
      wrapper = shallow(<VisitForm {...updatedProps} />)
      let input = wrapper.find('[name="service"]')
      expect(input.length).toEqual(1)
    })

    it("should have a urgency input", () => {
      let input = wrapper.find('[name="urgency"]')
      expect(input.length).toEqual(1)
    })

    it("should have a has notes input", () => {
      let input = wrapper.find('[name="notes"]')
      expect(input.length).toEqual(1)
    })
  })
})
