/* eslint-disable quotes */
import React from "react"
import { shallow, configure } from "enzyme"
import { createMount } from "@material-ui/core/test-utils"
import Adapter from "enzyme-adapter-react-16"
import { format } from "date-fns"
import ParticipantForm from "../src/components/ParticipantForm"

configure({ adapter: new Adapter() })

describe("<ParticipantForm />", () => {
  let wrapper
  let mount

  // Create initial props that get passed into the component
  const initialProps = {
    participantInfo: {
      id: null,
      first_name: "foobar",
      last_name: "",
      last_four_ssn: 0,
      date_of_birth: "",
      start_date: format(new Date(), "yyyy-MM-dd"),
      pp_id: "",
      race: "",
      gender: "",
      is_insured: false,
      insuranceType: "",
      insurer: "",
    },
    insurers: [{ id: 1, name: "insurer" }],
    setRace: () => {},
    setPPId: () => {},
    setGender: () => {},
    setInsurer: () => {},
    setLastName: () => {},
    setIsInsured: () => {},
    setFirstName: () => {},
    setDateOfBirth: () => {},
  }

  // Unit testing
  describe("Unit tests", () => {
    // what to do before each test
    beforeEach(() => {
      // Render the login form component, pass in props. (Shallow method renders the component without its children, good for unit tests.)
      mount = createMount()
      wrapper = shallow(<ParticipantForm {...initialProps} />)
    })

    // what to do after each test
    afterEach(() => {
      jest.clearAllMocks()
    })

    it("should work", () => {
      wrapper = mount(<ParticipantForm {...initialProps} />)
    })
    // UI Integrity test
    it("should match the snapshot", () => {
      // snapshots are text references of the html of the rendered component.
      expect(wrapper.html()).toMatchSnapshot()
    })

    it("should have a firstname input", () => {
      let input = wrapper.find('[name="firstName"]')
      expect(input.length).toEqual(1)
    })

    it("should have a last name input", () => {
      let input = wrapper.find('[name="lastName"]')
      expect(input.length).toEqual(1)
    })

    it("should have a date of birth input", () => {
      let input = wrapper.find('[name="dob"]')
      expect(input.length).toEqual(1)
    })

    it("should have a has insurance input", () => {
      let input = wrapper.find('[name="hasInsurance"]')
      expect(input.length).toEqual(1)
    })

    it("should have a insurance input", () => {
      let input = wrapper.find('[name="insurance"]')
      expect(input.length).toEqual(1)
    })

    it("should have a gender input", () => {
      let input = wrapper.find('[name="gender"]')
      expect(input.length).toEqual(1)
    })

    it("should have a race input", () => {
      let input = wrapper.find('[name="race"]')
      expect(input.length).toEqual(1)
    })
  })
})
